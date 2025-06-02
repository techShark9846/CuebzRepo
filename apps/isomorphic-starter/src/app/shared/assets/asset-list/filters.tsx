"use client";

import { useState } from "react";
import { Button, Flex, Input, Select } from "rizzui";
import {
  PiMagnifyingGlassBold,
  PiFunnel,
  PiTrashDuotone,
} from "react-icons/pi";
import FilterDrawerView from "@core/components/controlled-table/table-filter";
import ToggleColumns from "@core/components/table-utils/toggle-columns";
import { DatePicker } from "@core/ui/datepicker";

interface IFilters {
  filters: any;
  setFilters: (arg: any) => void;
  onApplyFilters: any;
  table: any;
}

export default function AssetFilters({
  filters,
  setFilters,
  onApplyFilters,
  table,
}: IFilters) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [localFilters, setLocalFilters] = useState({ ...filters });

  // Apply filters
  const handleApplyFilters = () => {
    setFilters(localFilters); // Update parent state with new filters
    onApplyFilters(); // Fetch data with updated filters
    setOpenDrawer(false); // Close the drawer
  };

  // Clear filters
  const handleClearFilters = () => {
    const clearedFilters = {
      globalSearch: "",
      category: "",
      status: "",
      purchaseDate: "",
      warrantyExpiry: "",
    };
    setLocalFilters(clearedFilters); // Reset local filters
    setFilters(clearedFilters); // Reset parent filters
    onApplyFilters(); // Trigger API call to reset data
  };

  return (
    <Flex align="center" justify="between" className="mb-4">
      {/* 🔍 Global Search */}
      <Input
        type="search"
        placeholder="Search assets..."
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

      {/* 🔽 Filters Drawer */}
      <FilterDrawerView
        isOpen={openDrawer}
        drawerTitle="Filter Assets"
        setOpenDrawer={setOpenDrawer}
        onApplyFilters={handleApplyFilters}
      >
        <div className="grid grid-cols-1 gap-6">
          {/* 📌 Asset Type Filter */}
          <Select
            label="Filter by Asset Type"
            placeholder="Select Asset Type"
            value={
              localFilters.category
                ? {
                    value: localFilters.category,
                    label: localFilters.category,
                  }
                : null
            }
            options={[
              { value: "Laptop", label: "Laptop" },
              { value: "Printer", label: "Printer" },
              { value: "Smart TV", label: "Smart TV" },
              { value: "Monitor", label: "Monitor" },
              { value: "Other", label: "Other" },
            ]}
            onChange={(option: any) =>
              setLocalFilters((prev: any) => ({
                ...prev,
                category: option?.value || "",
              }))
            }
          />

          {/* 🔄 Status Filter */}
          <Select
            label="Filter by Status"
            placeholder="Select Status"
            value={
              localFilters.status
                ? { value: localFilters.status, label: localFilters.status }
                : null
            }
            options={[
              { value: "In Use", label: "In Use" },
              { value: "In Storage", label: "In Storage" },
              { value: "Under Maintenance", label: "Under Maintenance" },
              { value: "Retired", label: "Retired" },
            ]}
            onChange={(option: any) =>
              setLocalFilters((prev: any) => ({
                ...prev,
                status: option?.value || "",
              }))
            }
          />

          {/* 🛒 Purchase Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Filter by Purchase Date
            </label>
            <DatePicker
              selected={
                localFilters.purchaseDate
                  ? new Date(localFilters.purchaseDate)
                  : null
              }
              onChange={(date: Date | null) => {
                setLocalFilters((prev: any) => ({
                  ...prev,
                  purchaseDate: date ? date.toISOString().split("T")[0] : null,
                }));
              }}
              placeholderText="Select date"
              dateFormat="dd-MMM-yyyy"
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* 📅 Warranty Expiry Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Filter by Warranty Expiry Date
            </label>
            <DatePicker
              selected={
                localFilters.warrantyExpiry
                  ? new Date(localFilters.warrantyExpiry)
                  : null
              }
              onChange={(date: Date | null) => {
                setLocalFilters((prev: any) => ({
                  ...prev,
                  warrantyExpiry: date
                    ? date.toISOString().split("T")[0]
                    : null,
                }));
              }}
              placeholderText="Select date"
              dateFormat="dd-MMM-yyyy"
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </FilterDrawerView>

      {/* 🛠 Action Buttons */}
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
  );
}
