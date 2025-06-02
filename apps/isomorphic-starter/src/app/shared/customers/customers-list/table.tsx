"use client";

import React, { useState, useEffect, useCallback } from "react";
import customerService from "@/services/customerService";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import Filters from "./filters";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import { ActionIcon, Badge, Flex, Tooltip } from "rizzui";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { debounce } from "lodash";
import DeletePopover from "@core/components/delete-popover";
import { CustomerType } from "@/types/customerTypes";
import { useModal } from "../../modal-views/use-modal";
import CustomerDetailsModal from "./CustomerDetailsModal";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomersTable({
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
    customerType: "",
    assignedTo: "",
    dateOfBirth: "",
  });

  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await customerService.getList({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        dateOfBirth: filters.dateOfBirth || undefined,
        search: filters.globalSearch || undefined,
        customerType: filters.customerType || undefined,
        assignedTo: filters.assignedTo || undefined,
      });

      const responseData = response?.data || [];
      const totalCount = response?.pagination?.total || 0;

      setData(responseData);
      setPagination((prev) => ({
        ...prev,
        totalCount,
      }));
    } catch (error: any) {
      console.error("Error fetching customers:", error.message);
      toast.error("Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchCustomers = useCallback(debounce(fetchCustomers, 300), [
    filters,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  useEffect(() => {
    debouncedFetchCustomers();
    return () => debouncedFetchCustomers.cancel();
  }, [debouncedFetchCustomers]);

  const handleApplyFilters = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
    fetchCustomers();
  };

  const { table } = useTanStackTable<CustomerType>({
    tableData: data,
    columnConfig: [
      {
        accessorKey: "full_name",
        header: "Full Name",
        cell: ({ row }: any) => (
          <Link
            href={`/tenant/customers-vendors/customer/${row.original._id}`}
            className="text-blue-900 underline"
          >
            {row.original.full_name}
          </Link>
        ),
      },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "phone_number",
        header: "Phone Number",
        cell: ({ row }: any) => row.original.phone_number || "N/A",
      },
      {
        accessorKey: "customer_type",
        header: "Customer Type",
        cell: ({ row }: any) => (
          <Badge className="px-2 py-1 rounded bg-blue-500 text-white">
            {row.original.customer_type}
          </Badge>
        ),
      },
      {
        accessorKey: "date_of_birth",
        header: "Date of Birth",
        cell: ({ row }: any) =>
          dayjs(row.original.date_of_birth).isValid()
            ? dayjs(row.original.date_of_birth).format("DD-MMM-YYYY")
            : "N/A",
      },
      {
        accessorKey: "assigned_to",
        header: "Assigned To",
        cell: ({ row }: any) => row.original.assigned_to?.full_name || "N/A",
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
                      <CustomerDetailsModal
                        customer={row.original}
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

            {/* Edit Customer Action */}
            <Tooltip
              size="sm"
              content="Edit Customer"
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label="Edit Customer"
                onClick={() => {
                  router.push(
                    `/tenant/customers-vendors/customer/${row.original._id}/edit`
                  );
                }}
              >
                <FiEdit />
              </ActionIcon>
            </Tooltip>

            {/* Delete Customer Action */}
            <DeletePopover
              title={`Delete Customer`}
              description={`Are you sure you want to delete ${row.original.full_name}?`}
              onDelete={async () => {
                try {
                  toast.loading("Deleting customer...");
                  await customerService.delete(row.original._id);
                  toast.dismiss();
                  toast.success(
                    `Customer ${row.original.full_name} deleted successfully.`
                  );
                  await fetchCustomers();
                } catch (error) {
                  toast.dismiss();
                  toast.error("Failed to delete customer. Please try again.");
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
