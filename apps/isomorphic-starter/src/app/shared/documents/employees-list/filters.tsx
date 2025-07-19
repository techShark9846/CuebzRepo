// "use client";

// import React, { useState } from "react";
// import { Button, Flex, Input, Select } from "rizzui";
// import {
//   PiMagnifyingGlassBold,
//   PiFunnel,
//   PiTrashDuotone,
// } from "react-icons/pi";
// import FilterDrawerView from "@core/components/controlled-table/table-filter";
// import ToggleColumns from "@core/components/table-utils/toggle-columns";
// import { DatePicker } from "@core/ui/datepicker";

// interface IFilters {
//   filters: any;
//   setFilters: (arg: any) => void;
//   onApplyFilters: any;
//   table: any;
// }

// export default function Filters({
//   filters,
//   setFilters,
//   onApplyFilters,
//   table,
// }: IFilters) {
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [localFilters, setLocalFilters] = useState({ ...filters });

//   // Apply filters
//   const handleApplyFilters = () => {
//     setFilters(localFilters); // Update the parent state with new filters
//     onApplyFilters(); // Trigger API fetch with updated filters
//     setOpenDrawer(false); // Close the drawer
//   };

//   // Clear filters
//   const handleClearFilters = () => {
//     const clearedFilters = {
//       globalSearch: "",
//       visitorType: "",
//       organization: "",
//       status: "",
//       date: null,
//     };
//     setLocalFilters(clearedFilters); // Reset local filters
//     setFilters(clearedFilters); // Reset parent filters
//     onApplyFilters(); // Trigger API call to reset data
//   };

//   return (
//     <Flex align="center" justify="between" className="mb-4">
//       {/* Global Search */}
//       <Input
//         type="search"
//         placeholder="Search by visitor name..."
//         value={filters.globalSearch}
//         onClear={() =>
//           setFilters((prev: any) => ({ ...prev, globalSearch: "" }))
//         }
//         onChange={(e) =>
//           setFilters((prev: any) => ({ ...prev, globalSearch: e.target.value }))
//         }
//         inputClassName="h-9"
//         clearable={true}
//         prefix={<PiMagnifyingGlassBold className="size-4" />}
//       />

//       {/* Filters Drawer */}
//       <FilterDrawerView
//         isOpen={openDrawer}
//         drawerTitle="Table Filters"
//         setOpenDrawer={setOpenDrawer}
//         onApplyFilters={handleApplyFilters}
//       >
//         <div className="grid grid-cols-1 gap-6">
//           {/* Date Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Filter by Date
//             </label>
//             <DatePicker
//               selected={localFilters.date ? new Date(localFilters.date) : null}
//               onChange={(date: Date | null) => {
//                 setLocalFilters((prev: any) => ({
//                   ...prev,
//                   date: date ? date.toISOString().split("T")[0] : null, // Store only the date part
//                 }));
//               }}
//               placeholderText="Select date"
//               dateFormat="dd-MMM-yyyy"
//               className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>
//           {/* Visitor Type Filter */}
//           <Select
//             label="Filter by Visitor Type"
//             placeholder="Select Visitor Type"
//             value={
//               localFilters.visitorType
//                 ? {
//                     value: localFilters.visitorType,
//                     label: localFilters.visitorType,
//                   }
//                 : null
//             }
//             options={[
//               { value: "Customer", label: "Customer" },
//               { value: "Vendor", label: "Vendor" },
//               { value: "Interview", label: "Interview" },
//               { value: "Other", label: "Other" },
//             ]}
//             onChange={(option: any) =>
//               setLocalFilters((prev: any) => ({
//                 ...prev,
//                 visitorType: option?.value || "",
//               }))
//             }
//           />

//           {/* Status Filter */}
//           <Select
//             label="Filter by Status"
//             placeholder="Select Status"
//             value={
//               localFilters.status
//                 ? {
//                     value: localFilters.status,
//                     label: localFilters.status,
//                   }
//                 : null
//             }
//             options={[
//               { value: "Positive Intention", label: "Positive Intention" },
//               { value: "Neutral Intention", label: "Neutral Intention" },
//               { value: "Negative Intention", label: "Negative Intention" },
//             ]}
//             onChange={(option: any) =>
//               setLocalFilters((prev: any) => ({
//                 ...prev,
//                 status: option?.value || "",
//               }))
//             }
//           />
//         </div>
//       </FilterDrawerView>

//       {/* Action Buttons */}
//       <Flex align="center" gap="3" className="w-auto">
//         <Button
//           size="sm"
//           onClick={handleClearFilters}
//           variant="flat"
//           className="h-9 bg-gray-200/70"
//         >
//           <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
//         </Button>
//         <Button
//           variant="outline"
//           onClick={() => setOpenDrawer(!openDrawer)}
//           className="h-9 pe-3 ps-2.5"
//         >
//           <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
//           Filters
//         </Button>
//         <ToggleColumns table={table} />
//       </Flex>
//     </Flex>
//   );
// }

"use client";

import React, { useState } from "react";
import { Button, Flex, Input, Select } from "rizzui";
import {
  PiMagnifyingGlassBold,
  PiFunnel,
  PiTrashDuotone,
} from "react-icons/pi";
import FilterDrawerView from "@core/components/controlled-table/table-filter";
import ToggleColumns from "@core/components/table-utils/toggle-columns";
import { DatePicker } from "@core/ui/datepicker";
import FilterContainer from "../../filterContainer";

interface IFilters {
  filters: any;
  setFilters: (arg: any) => void;
  onApplyFilters: any;
  table: any;
}

export default function Filters({
  filters,
  setFilters,
  onApplyFilters,
  table,
}: IFilters) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [localFilters, setLocalFilters] = useState({ ...filters });

  // Apply filters
  const handleApplyFilters = () => {
    setFilters(localFilters); // Update the parent state with new filters
    onApplyFilters(); // Trigger API fetch with updated filters
    setOpenDrawer(false); // Close the drawer
  };

  // Clear filters
  const handleClearFilters = () => {
    const clearedFilters = {
      globalSearch: "",
      department: "",
      jobTitle: "",
      dateOfJoining: null,
      nationality: "",
      reportingManager: "",
    };
    setLocalFilters(clearedFilters); // Reset local filters
    setFilters(clearedFilters); // Reset parent filters
    onApplyFilters(); // Trigger API call to reset data
  };

  return (
    <FilterContainer>
      <Flex align="center" justify="between">
        {/* Global Search */}
        <Input
          type="search"
          placeholder="Search by employee name..."
          value={filters.globalSearch}
          onClear={() =>
            setFilters((prev: any) => ({ ...prev, globalSearch: "" }))
          }
          onChange={(e) =>
            setFilters((prev: any) => ({
              ...prev,
              globalSearch: e.target.value,
            }))
          }
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
        />

        {/* Filters Drawer */}
        <FilterDrawerView
          isOpen={openDrawer}
          drawerTitle="Table Filters"
          setOpenDrawer={setOpenDrawer}
          onApplyFilters={handleApplyFilters}
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Date of Joining Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Filter by Date of Joining
              </label>
              <DatePicker
                selected={
                  localFilters.dateOfJoining
                    ? new Date(localFilters.dateOfJoining)
                    : null
                }
                onChange={(date: Date | null) => {
                  setLocalFilters((prev: any) => ({
                    ...prev,
                    dateOfJoining: date
                      ? date.toISOString().split("T")[0]
                      : null, // Store only the date part
                  }));
                }}
                placeholderText="Select date"
                dateFormat="dd-MMM-yyyy"
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Department Filter */}
            <Select
              label="Filter by Department"
              placeholder="Select Department"
              value={
                localFilters.department
                  ? {
                      value: localFilters.department,
                      label: localFilters.department,
                    }
                  : null
              }
              options={[
                { value: "HR", label: "HR" },
                { value: "Finance", label: "Finance" },
                { value: "Development", label: "Development" },
                { value: "Operations", label: "Operations" },
              ]}
              onChange={(option: any) =>
                setLocalFilters((prev: any) => ({
                  ...prev,
                  department: option?.value || "",
                }))
              }
            />

            {/* Job Title Filter */}
            <Select
              label="Filter by Job Title"
              placeholder="Select Job Title"
              value={
                localFilters.jobTitle
                  ? {
                      value: localFilters.jobTitle,
                      label: localFilters.jobTitle,
                    }
                  : null
              }
              options={[
                { value: "Manager", label: "Manager" },
                { value: "Developer", label: "Developer" },
                { value: "Analyst", label: "Analyst" },
                { value: "Support", label: "Support" },
              ]}
              onChange={(option: any) =>
                setLocalFilters((prev: any) => ({
                  ...prev,
                  jobTitle: option?.value || "",
                }))
              }
            />

            {/* Nationality Filter */}
            <Select
              label="Filter by Nationality"
              placeholder="Select Nationality"
              value={
                localFilters.nationality
                  ? {
                      value: localFilters.nationality,
                      label: localFilters.nationality,
                    }
                  : null
              }
              options={[
                { value: "UAE", label: "UAE" },
                { value: "India", label: "India" },
                { value: "USA", label: "USA" },
                { value: "UK", label: "UK" },
              ]}
              onChange={(option: any) =>
                setLocalFilters((prev: any) => ({
                  ...prev,
                  nationality: option?.value || "",
                }))
              }
            />

            {/* Reporting Manager Filter */}
            <Input
              label="Filter by Reporting Manager"
              placeholder="Enter Reporting Manager"
              value={localFilters.reportingManager}
              onChange={(e) =>
                setLocalFilters((prev: any) => ({
                  ...prev,
                  reportingManager: e.target.value,
                }))
              }
            />
          </div>
        </FilterDrawerView>

        {/* Action Buttons */}
        <Flex align="center" gap="3" className="w-auto">
          <Button
            size="sm"
            onClick={handleClearFilters}
            variant="flat"
            className="h-9 bg-gray-200/70"
          >
            <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpenDrawer(!openDrawer)}
            className="h-9 pe-3 ps-2.5"
          >
            <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
            Filters
          </Button>
          <ToggleColumns table={table} />
        </Flex>
      </Flex>
    </FilterContainer>
  );
}
