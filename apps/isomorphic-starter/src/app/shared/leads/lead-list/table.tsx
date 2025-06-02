"use client";

import React, { useState, useEffect, useCallback } from "react";
import leadService from "@/services/leadService";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import Filters from "./filters";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import { ActionIcon, Badge, Flex, Tooltip } from "rizzui";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { debounce } from "lodash";
import DeletePopover from "@core/components/delete-popover";
import { LeadType } from "@/types/leadTypes";
import { useModal } from "../../modal-views/use-modal";
import LeadDetailsModal from "./LeadDetailsModal";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { routesTenant } from "@/config/routes";

export default function LeadTable({
  pageSize = 20,
  hideFilters = false,
  hidePagination = false,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
    totalCount: 0,
  });
  const [filters, setFilters] = useState({
    globalSearch: "",
    leadStatus: "",
    assignedTo: "",
    leadSource: "",
    date: "",
  });

  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const leadStatusColors: any = {
    New: "bg-blue-500 text-white",
    Contacted: "bg-yellow-500 text-white",
    Qualified: "bg-green-500 text-white",
    "Proposal Sent": "bg-indigo-500 text-white",
    Won: "bg-teal-500 text-white",
    Lost: "bg-red-500 text-white",
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await leadService.getList({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        date: filters.date || undefined,
        search: filters.globalSearch || undefined,
        lead_status: filters.leadStatus || undefined,
        assigned_to: filters.assignedTo || undefined,
        lead_source: filters.leadSource || undefined,
      });
      const responseData = response?.data || [];
      const totalCount = response?.pagination?.total || 0;

      setData(responseData);
      setPagination((prev) => ({
        ...prev,
        totalCount,
      }));
    } catch (error: any) {
      console.error("Error fetching leads:", error.message);
      toast.error("Failed to fetch leads.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchLeads = useCallback(debounce(fetchLeads, 300), [
    filters,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  useEffect(() => {
    debouncedFetchLeads();
    return () => debouncedFetchLeads.cancel();
  }, [debouncedFetchLeads]);

  const handleApplyFilters = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0, // Reset to first page when filters are applied
    }));
    fetchLeads();
  };

  const { table } = useTanStackTable<LeadType>({
    tableData: data,
    columnConfig: [
      { accessorKey: "lead_identifier_name", header: "Indentifier Name" },
      { accessorKey: "lead_source", header: "Lead Source" },
      { accessorKey: "company_name", header: "Company Name" },
      { accessorKey: "contact_person", header: "Contact Person" },
      { accessorKey: "contact_number", header: "Contact Number" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "lead_status",
        header: "Lead Status",
        cell: ({ row }: any) => {
          const status = row.original.lead_status;
          const badgeColor =
            leadStatusColors[status] || "bg-gray-500 text-white";
          return (
            <Badge className={`px-2 py-1 rounded ${badgeColor}`}>
              {status || "N/A"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "date_created",
        header: "Date Created",
        cell: ({ row }: any) =>
          dayjs(row.original.createdAt).isValid()
            ? dayjs(row.original.createdAt).format("DD-MMM-YYYY")
            : "N/A",
      },
      {
        accessorKey: "action",
        header: "Actions",
        cell: ({ row }) => (
          <Flex align="center" justify="end" className="pe-4">
            {/* View Details Action */}
            <Tooltip
              size="sm"
              content="View Details"
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label="View Details"
                onClick={() => {
                  openModal({
                    view: (
                      <LeadDetailsModal
                        lead={row.original}
                        closeModal={closeModal}
                      />
                    ),
                    size: "lg",
                  });
                }}
              >
                <FiEye />
              </ActionIcon>
            </Tooltip>

            {/* Edit Lead Action */}
            <Tooltip
              size="sm"
              content="Edit Lead"
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label="Edit Lead"
                onClick={() => {
                  router.push(
                    routesTenant.salesManagement.editLead(row.original._id)
                  );
                }}
              >
                <FiEdit />
              </ActionIcon>
            </Tooltip>

            {/* Delete Lead Action */}
            <DeletePopover
              title={`Delete Lead`}
              description={`Are you sure you want to delete the lead for ${row.original.lead_identifier_name}?`}
              onDelete={async () => {
                try {
                  toast.loading("Deleting lead...");
                  await leadService.delete(row.original._id);
                  toast.dismiss();
                  toast.success(
                    `Lead for ${row.original.contact_person} deleted successfully.`
                  );
                  await fetchLeads();
                } catch (error) {
                  toast.dismiss();
                  toast.error("Failed to delete lead. Please try again.");
                }
              }}
            />
          </Flex>
        ),
      },
    ],
  });

  const handlePageChange = (pageIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, pageIndex: 0 }));
  };

  return (
    <div>
      {!hideFilters && (
        <Filters
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={handleApplyFilters}
          table={table}
        />
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table table={table} variant="modern" />
          {!hidePagination && (
            <TablePagination
              pageIndex={pagination.pageIndex}
              pageSize={pagination.pageSize}
              totalCount={pagination.totalCount}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </>
      )}
    </div>
  );
}
