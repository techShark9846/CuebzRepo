// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import employeeService from "@/services/employeeService";
// import Table from "@core/components/table";
// import TablePagination from "@core/components/table/pagination";
// import Filters from "./filters";
// import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
// import { ActionIcon, Badge, Flex, Tooltip } from "rizzui";
// import toast from "react-hot-toast";
// import dayjs from "dayjs";
// import { debounce } from "lodash";
// import DeletePopover from "@core/components/delete-popover";
// import { EmployeeType } from "@/types/employeeTypes";
// import { useModal } from "../../modal-views/use-modal";
// import EmployeeDetailsModal from "./TaskDetailsModal";
// import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import { routesTenant } from "@/config/routes";

// export default function EmployeesTable({
//   pageSize = 20,
//   hideFilters = false,
//   hidePagination = false,
// }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: pageSize,
//     totalCount: 0,
//   });
//   const [filters, setFilters] = useState({
//     globalSearch: "",
//     department: "",
//     jobTitle: "",
//     nationality: "",
//     dateOfJoining: null,
//   });

//   const { openModal, closeModal } = useModal();
//   const router = useRouter();

//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const response = await employeeService.getList({
//         page: pagination.pageIndex + 1,
//         limit: pagination.pageSize,
//         department: filters.department || undefined,
//         job_title: filters.jobTitle || undefined,
//         nationality: filters.nationality || undefined,
//         date_of_joining: filters.dateOfJoining,
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
//       console.error("Error fetching employees:", error.message);
//       toast.error("Failed to fetch employees.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedFetchEmployees = useCallback(debounce(fetchEmployees, 300), [
//     filters,
//     pagination.pageIndex,
//     pagination.pageSize,
//   ]);

//   useEffect(() => {
//     debouncedFetchEmployees();
//     return () => debouncedFetchEmployees.cancel();
//   }, [debouncedFetchEmployees]);

//   const handleApplyFilters = () => {
//     setPagination((prev) => ({
//       ...prev,
//       pageIndex: 0,
//     }));
//     fetchEmployees();
//   };

//   const { table } = useTanStackTable<EmployeeType>({
//     tableData: data,
//     columnConfig: [
//       { accessorKey: "full_name", header: "Full Name" },
//       { accessorKey: "department", header: "Department" },
//       { accessorKey: "job_title", header: "Job Title" },
//       {
//         accessorKey: "date_of_joining",
//         header: "Date of Joining",
//         cell: ({ row }: any) =>
//           dayjs(row.original.date_of_joining).isValid()
//             ? dayjs(row.original.date_of_joining).format("DD-MMM-YYYY")
//             : "N/A",
//       },
//       {
//         accessorKey: "nationality",
//         header: "Nationality",
//         cell: ({ row }: any) => row.original.nationality || "N/A",
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
//                       <EmployeeDetailsModal
//                         employee={row.original}
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

//             {/* Edit Employee Action */}
//             <Tooltip
//               size="sm"
//               content="Edit Employee"
//               placement="top"
//               color="invert"
//             >
//               <ActionIcon
//                 as="span"
//                 size="sm"
//                 variant="outline"
//                 aria-label="Edit Employee"
//                 onClick={() => {
//                   router.push(
//                     routesTenant.employees.editEmployeeRecord(row.original._id)
//                   );
//                 }}
//               >
//                 <FiEdit />
//               </ActionIcon>
//             </Tooltip>

//             {/* Delete Employee Action */}
//             <DeletePopover
//               title={`Delete Employee`}
//               description={`Are you sure you want to delete ${row.original.full_name}?`}
//               onDelete={async () => {
//                 try {
//                   toast.loading("Deleting employee...");
//                   await employeeService.delete(row.original._id);
//                   toast.dismiss();
//                   toast.success(
//                     `${row.original.full_name} deleted successfully.`
//                   );
//                   await fetchEmployees();
//                 } catch (error) {
//                   toast.dismiss();
//                   toast.error("Failed to delete employee. Please try again.");
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
import chequeTrackerService from "@/services/chequeTrackerService";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import Filters from "./filters";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import { ActionIcon, Badge, Flex, Tooltip } from "rizzui";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { debounce } from "lodash";
import DeletePopover from "@core/components/delete-popover";
import ChequeTrackerDetailsModal from "./ChequeTrackerDetailsModal";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useModal } from "../../modal-views/use-modal";
import { useRouter } from "next/navigation";
import { routesTenant } from "@/config/routes";
import { ChequeTrackerType } from "@/types/chequeTrackerTypes";

export default function ChequeTrackerTable({
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
    cheque_status: "",
    // reminder_date: null,
    cheque_date: null,
  });

  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const fetchCheques = async () => {
    setLoading(true);
    try {
      const response = await chequeTrackerService.getList({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        cheque_status: filters.cheque_status || undefined,
        cheque_date: filters.cheque_date || undefined,
        // reminder_date: filters.reminder_date || undefined,
        search: filters.globalSearch || undefined,
      });
      const responseData = response?.data || [];
      const totalCount = response?.pagination?.total || 0;

      setData(responseData);
      setPagination((prev) => ({
        ...prev,
        totalCount,
      }));
    } catch (error: any) {
      console.error("Error fetching cheque tracker data:", error.message);
      toast.error("Failed to fetch cheque tracker data.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchCheques = useCallback(debounce(fetchCheques, 300), [
    filters,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  useEffect(() => {
    debouncedFetchCheques();
    return () => debouncedFetchCheques.cancel();
  }, [debouncedFetchCheques]);

  const handleApplyFilters = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
    fetchCheques();
  };

  const { table } = useTanStackTable<ChequeTrackerType>({
    tableData: data,
    columnConfig: [
      { accessorKey: "cheque_number", header: "Cheque Number" },
      {
        accessorKey: "cheque_date",
        header: "Cheque Date",
        cell: ({ row }: any) =>
          dayjs(row.original.cheque_date).isValid()
            ? dayjs(row.original.cheque_date).format("DD-MMM-YYYY")
            : "N/A",
      },
      { accessorKey: "bank_name", header: "Bank Name" },
      { accessorKey: "payee_name", header: "Payee Name" },
      { accessorKey: "payeer_name", header: "Payer Name" },
      {
        accessorKey: "cheque_status",
        header: "Cheque Status",
        cell: ({ row }: any) => {
          const status = row.original.cheque_status;

          const statusColors: Record<string, string> = {
            Cleared: "success",
            Bounced: "danger",
            Issued: "primary",
            Received: "info",
          };

          return (
            <Badge
              color={
                statusColors[status] as
                  | "primary"
                  | "danger"
                  | "primary"
                  | "info"
              }
              variant="flat"
            >
              {status}
            </Badge>
          );
        },
      },
      // {
      //   accessorKey: "cheque_date",
      //   header: "Cheque Date",
      //   cell: ({ row }: any) =>
      //     dayjs(row.original.cheque_date).isValid()
      //       ? dayjs(row.original.cheque_date).format("DD-MMM-YYYY")
      //       : "N/A",
      // },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }: any) => `₹${row.original.amount || "N/A"}`,
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
                      <ChequeTrackerDetailsModal
                        cheque={row.original}
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

            {/* Edit Cheque Action */}
            <Tooltip
              size="sm"
              content="Edit Cheque"
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                aria-label="Edit Cheque"
                onClick={() => {
                  router.push(
                    routesTenant.financials.editChequeTracker(row.original._id)
                  );
                }}
              >
                <FiEdit />
              </ActionIcon>
            </Tooltip>

            {/* Delete Cheque Action */}
            <DeletePopover
              title={`Delete Cheque`}
              description={`Are you sure you want to delete cheque ${row.original.cheque_number}?`}
              onDelete={async () => {
                try {
                  toast.loading("Deleting cheque...");
                  await chequeTrackerService.delete(row.original._id);
                  toast.dismiss();
                  toast.success(
                    `Cheque ${row.original.cheque_number} deleted successfully.`
                  );
                  await fetchCheques();
                } catch (error) {
                  toast.dismiss();
                  toast.error("Failed to delete cheque. Please try again.");
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
