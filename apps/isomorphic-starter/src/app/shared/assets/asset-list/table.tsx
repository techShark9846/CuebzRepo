"use client";

import React, { useState, useEffect, useCallback } from "react";
import assetService from "@/services/assetManagementService";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import Filters from "./filters";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import { ActionIcon, Badge, Flex, Tooltip } from "rizzui";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { debounce } from "lodash";
import DeletePopover from "@core/components/delete-popover";
import { category } from "@/types/assetTypes";
import { useModal } from "../../modal-views/use-modal";
import AssetDetailsModal from "./assetDetailsModal";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AssetTable({
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
    category: "",
    status: "",
    purchaseDate: "",
    warrantyExpiry: "",
  });

  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const statusColors: any = {
    "In Use": "bg-green-500 text-white",
    "In Storage": "bg-yellow-500 text-white",
    "Under Maintenance": "bg-blue-500 text-white",
    Retired: "bg-red-500 text-white",
  };

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await assetService.getList({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        purchaseDate: filters.purchaseDate || undefined,
        search: filters.globalSearch || undefined,
        category: filters.category || undefined,
        status: filters.status,
        warrantyExpiry: filters.warrantyExpiry || undefined,
      });
      const responseData = response?.data || [];
      const totalCount = response?.pagination?.total || 0;

      setData(responseData);
      setPagination((prev) => ({
        ...prev,
        totalCount,
      }));
    } catch (error: any) {
      console.error("Error fetching assets:", error.message);
      toast.error("Failed to fetch assets.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchAssets = useCallback(debounce(fetchAssets, 300), [
    filters,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  useEffect(() => {
    debouncedFetchAssets();
    return () => debouncedFetchAssets.cancel();
  }, [debouncedFetchAssets]);

  const handleApplyFilters = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0, // Reset to first page when filters are applied
    }));
    fetchAssets();
  };

  const { table } = useTanStackTable<category>({
    tableData: data,
    columnConfig: [
      { accessorKey: "name", header: "Asset Name" },
      { accessorKey: "category", header: "Asset Type" },
      {
        accessorKey: "purchaseDate",
        header: "Purchase Date",
        cell: ({ row }: any) =>
          dayjs(row.original.purchaseDate).isValid()
            ? dayjs(row.original.purchaseDate).format("DD-MMM-YYYY")
            : "N/A",
      },
      {
        accessorKey: "warrantyExpiry",
        header: "Warranty Expiry",
        cell: ({ row }: any) =>
          dayjs(row.original.warrantyExpiry).isValid()
            ? dayjs(row.original.warrantyExpiry).format("DD-MMM-YYYY")
            : "N/A",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: any) => {
          const status = row.original.status;
          const badgeColor = statusColors[status] || "bg-gray-500 text-white";
          return (
            <Badge className={`px-2 py-1 rounded ${badgeColor}`}>
              {status || "N/A"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "action",
        header: "Actions",
        cell: ({ row }: any) => (
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
                      <AssetDetailsModal
                        asset={row.original}
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

            {/* Edit Asset Action */}
            <Tooltip
              size="sm"
              content="Edit Asset"
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label="Edit Asset"
                onClick={() => {
                  router.push(`/tenant/assets/${row.original._id}/edit`);
                }}
              >
                <FiEdit />
              </ActionIcon>
            </Tooltip>

            {/* Delete Asset Action */}
            <DeletePopover
              title={`Delete Asset`}
              description={`Are you sure you want to delete the asset: ${row.original.name}?`}
              onDelete={async () => {
                try {
                  toast.loading("Deleting asset...");
                  await assetService.delete(row.original._id);
                  toast.dismiss();
                  toast.success(
                    `Asset ${row.original.name} deleted successfully.`
                  );
                  await fetchAssets();
                } catch (error) {
                  toast.dismiss();
                  toast.error("Failed to delete asset. Please try again.");
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
