// import { type Table as ReactTableType } from "@tanstack/react-table";
// import {
//   ActionIcon,
//   Box,
//   Flex,
//   Grid,
//   Select,
//   SelectOption,
//   Text,
// } from "rizzui";
// import {
//   PiCaretLeftBold,
//   PiCaretRightBold,
//   PiCaretDoubleLeftBold,
//   PiCaretDoubleRightBold,
// } from "react-icons/pi";
// import cn from "@core/utils/class-names";

// const options = [
//   { value: 5, label: "5" },
//   { value: 10, label: "10" },
//   { value: 15, label: "15" },
//   { value: 20, label: "20" },
//   { value: 25, label: "25" },
// ];

// export default function TablePagination<TData extends Record<string, any>>({
//   table,
//   showSelectedCount = false,
//   className,
// }: {
//   table: ReactTableType<TData>;
//   showSelectedCount?: boolean;
//   className?: string;
// }) {
//   return (
//     <Flex
//       gap="6"
//       align="center"
//       justify="between"
//       className={cn("@container", className)}
//     >
//       <Flex align="center" className="w-auto shrink-0">
//         <Text className="hidden font-normal text-gray-600 @md:block">
//           Rows per page
//         </Text>
//         <Select
//           size="sm"
//           variant="flat"
//           options={options}
//           className="w-12"
//           value={table.getState().pagination.pageSize}
//           onChange={(v: SelectOption) => {
//             table.setPageSize(Number(v.value));
//           }}
//           suffixClassName="[&>svg]:size-3"
//           selectClassName="font-semibold text-xs ring-0 shadow-sm h-7"
//           optionClassName="font-medium text-xs px-2 justify-center"
//         />
//       </Flex>
//       {showSelectedCount && (
//         <Box className="hidden @2xl:block w-full">
//           <Text>
//             {table.getFilteredSelectedRowModel().rows.length} of{" "}
//             {table.getFilteredRowModel().rows.length} row(s) selected.
//           </Text>
//         </Box>
//       )}
//       <Flex justify="end" align="center">
//         <Text className="hidden font-normal text-gray-600 @3xl:block">
//           Page {table.getState().pagination.pageIndex + 1} of{" "}
//           {table.getPageCount().toLocaleString()}
//         </Text>
//         <Grid gap="2" columns="4">
//           <ActionIcon
//             size="sm"
//             rounded="lg"
//             variant="outline"
//             aria-label="Go to first page"
//             onClick={() => table.firstPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
//           >
//             <PiCaretDoubleLeftBold className="size-3.5" />
//           </ActionIcon>
//           <ActionIcon
//             size="sm"
//             rounded="lg"
//             variant="outline"
//             aria-label="Go to previous page"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
//           >
//             <PiCaretLeftBold className="size-3.5" />
//           </ActionIcon>
//           <ActionIcon
//             size="sm"
//             rounded="lg"
//             variant="outline"
//             aria-label="Go to next page"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
//           >
//             <PiCaretRightBold className="size-3.5" />
//           </ActionIcon>
//           <ActionIcon
//             size="sm"
//             rounded="lg"
//             variant="outline"
//             aria-label="Go to last page"
//             onClick={() => table.lastPage()}
//             disabled={!table.getCanNextPage()}
//             className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
//           >
//             <PiCaretDoubleRightBold className="size-3.5" />
//           </ActionIcon>
//         </Grid>
//       </Flex>
//     </Flex>
//   );
// }

import { Table as ReactTableType } from "@tanstack/react-table";
import { ActionIcon, Flex, Grid, Select, SelectOption, Text } from "rizzui";
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
} from "react-icons/pi";

const rowsPerPageOptions = [5, 10, 15, 20, 25].map((value) => ({
  value,
  label: value.toString(),
}));

type TablePaginationProps<TData> = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export default function TablePagination<TData>({
  pageIndex,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps<TData>) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    // <Flex gap="6" align="center" justify="between">
    //   {/* Rows Per Page */}
    //   <Flex align="center">
    //     <Text>Rows per page:</Text>
    //     <Select
    //       size="sm"
    //       variant="flat"
    //       options={rowsPerPageOptions}
    //       className="w-12 ml-2"
    //       value={pageSize}
    //       onChange={(option: SelectOption) =>
    //         onPageSizeChange(Number(option.value))
    //       }
    //     />
    //   </Flex>

    //   {/* Pagination Controls */}
    //   <Flex align="center">
    //     <Text>
    //       Page {pageIndex + 1} of {totalPages}
    //     </Text>
    //     <Grid gap="2" columns="4" className="ml-4">
    //       <ActionIcon
    //         size="sm"
    //         rounded="lg"
    //         variant="outline"
    //         aria-label="Go to first page"
    //         onClick={() => onPageChange(0)}
    //         disabled={pageIndex === 0}
    //       >
    //         <PiCaretDoubleLeftBold />
    //       </ActionIcon>
    //       <ActionIcon
    //         size="sm"
    //         rounded="lg"
    //         variant="outline"
    //         aria-label="Go to previous page"
    //         onClick={() => onPageChange(pageIndex - 1)}
    //         disabled={pageIndex === 0}
    //       >
    //         <PiCaretLeftBold />
    //       </ActionIcon>
    //       <ActionIcon
    //         size="sm"
    //         rounded="lg"
    //         variant="outline"
    //         aria-label="Go to next page"
    //         onClick={() => onPageChange(pageIndex + 1)}
    //         disabled={pageIndex + 1 >= totalPages}
    //       >
    //         <PiCaretRightBold />
    //       </ActionIcon>
    //       <ActionIcon
    //         size="sm"
    //         rounded="lg"
    //         variant="outline"
    //         aria-label="Go to last page"
    //         onClick={() => onPageChange(totalPages - 1)}
    //         disabled={pageIndex + 1 >= totalPages}
    //       >
    //         <PiCaretDoubleRightBold />
    //       </ActionIcon>
    //     </Grid>
    //   </Flex>
    // </Flex>

    <Flex
      gap="8"
      align="center"
      justify="between"
      className="py-4 px-6 bg-gray-50 border-t border-gray-200 rounded-b-lg"
    >
      {/* Rows Per Page */}
      <Flex align="center" className="gap-4">
        <Text className="font-medium text-gray-700">Rows per page:</Text>
        <Select
          size="sm"
          variant="flat"
          options={rowsPerPageOptions}
          className="w-16"
          value={pageSize}
          onChange={(option: SelectOption) =>
            onPageSizeChange(Number(option.value))
          }
        />
      </Flex>

      {/* Pagination Controls */}
      <Flex align="center" className="gap-6">
        <Text className="font-medium text-gray-700">
          Page <span className="font-semibold">{pageIndex + 1}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </Text>
        <Grid gap="2" columns="4">
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to first page"
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
            className="disabled:text-gray-400"
          >
            <PiCaretDoubleLeftBold />
          </ActionIcon>
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to previous page"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="disabled:text-gray-400"
          >
            <PiCaretLeftBold />
          </ActionIcon>
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to next page"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex + 1 >= totalPages}
            className="disabled:text-gray-400"
          >
            <PiCaretRightBold />
          </ActionIcon>
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to last page"
            onClick={() => onPageChange(totalPages - 1)}
            disabled={pageIndex + 1 >= totalPages}
            className="disabled:text-gray-400"
          >
            <PiCaretDoubleRightBold />
          </ActionIcon>
        </Grid>
      </Flex>
    </Flex>
  );
}
