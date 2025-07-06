// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import vendorService from "@/services/vendorService";
// import Table from "@core/components/table";
// import TablePagination from "@core/components/table/pagination";
// import Filters from "./filters";
// import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
// import { ActionIcon, Badge, Flex, Tooltip } from "rizzui";
// import toast from "react-hot-toast";
// import dayjs from "dayjs";
// import { debounce } from "lodash";
// import DeletePopover from "@core/components/delete-popover";
// import { VendorType } from "@/types/vendorTypes";
// import { useModal } from "../../modal-views/use-modal";
// import VendorDetailsModal from "./VendorDetailsModal";
// import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import { routesTenant } from "@/config/routes";
// import Link from "next/link";

// export default function VendorTable({
//   pageSize = 20,
//   hideFilters = false,
//   hidePagination = false,
// }) {
//   const [data, setData] = useState<VendorType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: pageSize,
//     totalCount: 0,
//   });
//   const [filters, setFilters] = useState({
//     globalSearch: "",
//     vendorType: "",
//     assignedTo: "",
//     country: "",
//   });

//   const { openModal, closeModal } = useModal();
//   const router = useRouter();

//   const fetchVendors = async () => {
//     setLoading(true);
//     try {
//       const response = await vendorService.getList({
//         page: pagination.pageIndex + 1,
//         limit: pagination.pageSize,
//         vendorType: filters.vendorType || undefined,
//         assignedTo: filters.assignedTo || undefined,
//         country: filters.country || undefined,
//         search: filters.globalSearch || undefined,
//       });
//       const responseData = response?.data || [];
//       const totalCount = response?.pagination?.total || 0;

//       setData(responseData);
//       setPagination((prev) => ({
//         ...prev,
//         totalCount,
//       }));
//     } catch (error: any) {
//       console.error("Error fetching vendors:", error.message);
//       toast.error("Failed to fetch vendors.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedFetchVendors = useCallback(debounce(fetchVendors, 300), [
//     filters,
//     pagination.pageIndex,
//     pagination.pageSize,
//   ]);

//   useEffect(() => {
//     debouncedFetchVendors();
//     return () => debouncedFetchVendors.cancel();
//   }, [debouncedFetchVendors]);

//   const handleApplyFilters = () => {
//     setPagination((prev) => ({
//       ...prev,
//       pageIndex: 0,
//     }));
//     fetchVendors();
//   };

//   const { table } = useTanStackTable<VendorType>({
//     tableData: data,
//     columnConfig: [
//       {
//         accessorKey: "vendor_name",
//         header: "Vendor Name",
//         cell: ({ row }: any) => (
//           <Link
//             href={`/tenant/customers-vendors/vendor/${row.original._id}`}
//             className="text-blue-900 underline"
//           >
//             {row.original.vendor_name}
//           </Link>
//         ),
//       },
//       {
//         accessorKey: "contact_person",
//         header: "Contact Person",
//         cell: ({ row }: any) => row.original.contact_person || "N/A",
//       },
//       {
//         accessorKey: "email",
//         header: "Email",
//         cell: ({ row }: any) => row.original.email || "N/A",
//       },
//       {
//         accessorKey: "phone_number",
//         header: "Phone Number",
//         cell: ({ row }: any) => row.original.phone_number || "N/A",
//       },
//       {
//         accessorKey: "vendor_type",
//         header: "Vendor Type",
//         cell: ({ row }: any) => (
//           <Badge color="primary">{row.original.vendor_type || "N/A"}</Badge>
//         ),
//       },
//       {
//         accessorKey: "createdAt",
//         header: "Created Date",
//         cell: ({ row }: any) =>
//           dayjs(row.original.createdAt).isValid()
//             ? dayjs(row.original.createdAt).format("DD-MMM-YYYY")
//             : "N/A",
//       },
//       {
//         accessorKey: "action",
//         header: "Actions",
//         cell: ({ row }) => (
//           <Flex align="center" justify="end" className="pe-4">
//             {/* View Details Action */}
//             <Tooltip
//               size="sm"
//               content="View Details"
//               placement="top"
//               color="invert"
//             >
//               <ActionIcon
//                 as="span"
//                 size="sm"
//                 variant="outline"
//                 aria-label="View Details"
//                 onClick={() => {
//                   openModal({
//                     view: (
//                       <VendorDetailsModal
//                         vendor={row.original}
//                         closeModal={closeModal}
//                       />
//                     ),
//                     size: "lg",
//                   });
//                 }}
//               >
//                 <FiEye />
//               </ActionIcon>
//             </Tooltip>

//             {/* Edit Vendor Action */}
//             <Tooltip
//               size="sm"
//               content="Edit Vendor"
//               placement="top"
//               color="invert"
//             >
//               <ActionIcon
//                 as="span"
//                 size="sm"
//                 variant="outline"
//                 aria-label="Edit Vendor"
//                 onClick={() => {
//                   router.push(routesTenant.sales.editVendor(row.original._id));
//                 }}
//               >
//                 <FiEdit />
//               </ActionIcon>
//             </Tooltip>

//             {/* Delete Vendor Action */}
//             <DeletePopover
//               title={`Delete Vendor`}
//               description={`Are you sure you want to delete ${row.original.vendor_name}?`}
//               onDelete={async () => {
//                 try {
//                   toast.loading("Deleting vendor...");
//                   await vendorService.delete(row.original._id);
//                   toast.dismiss();
//                   toast.success(
//                     `${row.original.vendor_name} deleted successfully.`
//                   );
//                   await fetchVendors();
//                 } catch (error) {
//                   toast.dismiss();
//                   toast.error("Failed to delete vendor. Please try again.");
//                 }
//               }}
//             />
//           </Flex>
//         ),
//       },
//     ],
//   });

//   const handlePageChange = (pageIndex: number) => {
//     setPagination((prev) => ({ ...prev, pageIndex }));
//   };

//   const handlePageSizeChange = (pageSize: number) => {
//     setPagination((prev) => ({ ...prev, pageSize, pageIndex: 0 }));
//   };

//   return (
//     <div>
//       {!hideFilters && (
//         <Filters
//           filters={filters}
//           setFilters={setFilters}
//           onApplyFilters={handleApplyFilters}
//           table={table}
//         />
//       )}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <Table table={table} variant="modern" />
//           {!hidePagination && (
//             <TablePagination
//               pageIndex={pagination.pageIndex}
//               pageSize={pagination.pageSize}
//               totalCount={pagination.totalCount}
//               onPageChange={handlePageChange}
//               onPageSizeChange={handlePageSizeChange}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import Filters from "./filters";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { VendorType } from "@/types/vendorTypes";
import vendorService from "@/services/vendorService";
import VendorDetailsDrawer from "./VendorDetailsDrawer";
import { Badge } from "rizzui";

export default function VendorsTable({
  pageSize = 20,
  hideFilters = false,
  hidePagination = false,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
    totalCount: 0,
  });
  const [filters, setFilters] = useState({ globalSearch: "" });

  const [selectedVendor, setSelectedVendor] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerEditOpen, setDrawerEditOpen] = useState(false);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await vendorService.getList({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: filters.globalSearch || undefined,
      });
      setData(response?.data || []);
      setPagination((prev) => ({
        ...prev,
        totalCount: response?.pagination?.total || 0,
      }));
    } catch (error: any) {
      toast.error("Failed to fetch vendors.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchVendors, 300), [
    filters,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  useEffect(() => {
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);

  const handleApplyFilters = () => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    fetchVendors();
  };

  const { table } = useTanStackTable<VendorType>({
    tableData: data,
    columnConfig: [
      {
        accessorKey: "vendor_name",
        header: "Company Name",
        cell: ({ row }: any) => (
          <button
            onClick={() => {
              setSelectedVendor(row.original);
              setDrawerOpen(true);
            }}
            className="text-blue-900 underline"
          >
            {row.original.vendor_name}
          </button>
        ),
      },
      {
        accessorKey: "contact_person",
        header: "Contact Person",
        cell: ({ row }: any) => row.original.contact_person || "N/A",
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }: any) => row.original.email || "N/A",
      },
      {
        accessorKey: "phone_number",
        header: "Phone Number",
        cell: ({ row }: any) => row.original.phone_number || "N/A",
      },
      {
        accessorKey: "vendor_type",
        header: "Vendor Type",
        cell: ({ row }: any) => (
          <Badge color="primary">{row.original.vendor_type || "N/A"}</Badge>
        ),
      },
    ],
  });

  return (
    <div>
      <VendorDetailsDrawer
        vendor={selectedVendor}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
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
              onPageChange={(index) =>
                setPagination({ ...pagination, pageIndex: index })
              }
              onPageSizeChange={(size) =>
                setPagination({
                  pageSize: size,
                  pageIndex: 0,
                  totalCount: pagination.totalCount,
                })
              }
            />
          )}
        </>
      )}
    </div>
  );
}
