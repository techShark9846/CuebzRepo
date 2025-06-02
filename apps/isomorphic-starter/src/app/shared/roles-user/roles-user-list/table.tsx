"use client";

import React, { useState, useEffect, useCallback } from "react";
import rolesUserService from "@/services/rolesUserService";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import Filters from "./filters";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import { ActionIcon, Badge, Flex, Tooltip } from "rizzui";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import DeletePopover from "@core/components/delete-popover";
import { RolesUserType } from "@/types/rolesUserTypes";
import { useModal } from "../../modal-views/use-modal";
import RolesUserDetailsModal from "./RolesUserDetailsModal";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function RolesUserTable({
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
    role: "",
    status: "",
    tenant: "",
    createdAt: "",
  });

  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const fetchRolesUsers = async () => {
    setLoading(true);
    try {
      const response = await rolesUserService.getList({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: filters.globalSearch || undefined,
        role: filters.role || undefined,
        status: filters.status || undefined,
        tenant: filters.tenant || undefined,
        createdAt: filters.createdAt || undefined,
      });
      const responseData = response?.data || [];
      const totalCount = response?.pagination?.total || 0;

      setData(responseData);
      setPagination((prev) => ({
        ...prev,
        totalCount,
      }));
    } catch (error: any) {
      console.error("Error fetching roles users:", error.message);
      toast.error("Failed to fetch roles users.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchRolesUsers = useCallback(debounce(fetchRolesUsers, 300), [
    filters,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  useEffect(() => {
    debouncedFetchRolesUsers();
    return () => debouncedFetchRolesUsers.cancel();
  }, [debouncedFetchRolesUsers]);

  const handleApplyFilters = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0, // Reset to first page when filters are applied
    }));
    fetchRolesUsers();
  };

  const { table } = useTanStackTable<RolesUserType>({
    tableData: data,
    columnConfig: [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "isVerified",
        header: "Is Verified",
        cell: ({ row }: any) => {
          const isVerified = row.original.isVerified;
          const badgeColor =
            isVerified === true
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white";
          return (
            <Badge className={`px-2 py-1 rounded ${badgeColor}`}>
              {isVerified ? "Verified" : "Not Verified"}
            </Badge>
          );
        },
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
                      <RolesUserDetailsModal
                        user={row.original}
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

            {/* Edit Roles User Action */}
            <Tooltip
              size="sm"
              content="Edit User"
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label="Edit User"
                onClick={() => {
                  router.push(`/tenant/roles-user/${row.original._id}/edit`);
                }}
              >
                <FiEdit />
              </ActionIcon>
            </Tooltip>

            {/* Delete Roles User Action */}
            <DeletePopover
              title={`Delete User`}
              description={`Are you sure you want to delete user ${row.original.name}?`}
              onDelete={async () => {
                try {
                  toast.loading("Deleting user...");
                  await rolesUserService.delete(row.original._id);
                  toast.dismiss();
                  toast.success(
                    `User ${row.original.name} deleted successfully.`
                  );
                  await fetchRolesUsers();
                } catch (error) {
                  toast.dismiss();
                  toast.error("Failed to delete user. Please try again.");
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
