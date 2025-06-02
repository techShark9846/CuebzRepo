"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import dayjs from "dayjs";
import { category } from "@/types/assetTypes";

type AssetDetailsModalProps = {
  asset: category;
  closeModal?: () => void;
};

const statusColors: any = {
  "In Use": "bg-green-500 text-white",
  "In Storage": "bg-yellow-500 text-white",
  "Under Maintenance": "bg-orange-500 text-white",
  Retired: "bg-red-500 text-white",
};

export default function AssetDetailsModal({
  asset,
  closeModal,
}: AssetDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Asset Details</h2>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={closeModal}
          className="text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </Flex>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {/* Asset Name */}
        <div>
          <p className="text-sm text-gray-500">Asset Name</p>
          <p className="text-lg font-medium text-gray-900">
            {asset.name || "N/A"}
          </p>
        </div>

        {/* Asset Type */}
        <div>
          <p className="text-sm text-gray-500">Asset Type</p>
          <p className="text-lg font-medium text-gray-900">
            {asset.category || "N/A"}
          </p>
        </div>

        {/* Serial Number */}
        {asset.serial_number && (
          <div>
            <p className="text-sm text-gray-500">Serial Number</p>
            <p className="text-lg font-medium text-gray-900">
              {asset.serial_number || "N/A"}
            </p>
          </div>
        )}

        {/* Purchase Date */}
        {asset.purchase_date && (
          <div>
            <p className="text-sm text-gray-500">Purchase Date</p>
            <p className="text-lg font-medium text-gray-900">
              {dayjs(asset.purchase_date).format("DD-MMM-YYYY")}
            </p>
          </div>
        )}

        {/* Warranty Expiry Date */}
        {asset.warranty_expiry && (
          <div>
            <p className="text-sm text-gray-500">Warranty Expiry</p>
            <p className="text-lg font-medium text-gray-900">
              {dayjs(asset.warranty_expiry).format("DD-MMM-YYYY")}
            </p>
          </div>
        )}

        {/* Assigned To */}
        {asset.assigned_to && (
          <div>
            <p className="text-sm text-gray-500">Assigned To</p>
            <p className="text-lg font-medium text-gray-900">
              {asset.assigned_to.full_name || "N/A"}
            </p>
          </div>
        )}

        {/* Location */}
        {asset.location && (
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-lg font-medium text-gray-900">
              {asset.location || "N/A"}
            </p>
          </div>
        )}

        {/* Status */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <Badge
            className={`py-1 px-3 rounded-full text-sm font-medium ${
              statusColors[asset.status] || "bg-gray-500 text-white"
            }`}
          >
            {asset.status || "N/A"}
          </Badge>
        </div>

        {/* Additional Notes */}
        {asset.notes && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Additional Notes</p>
            <p className="text-lg font-medium text-gray-900">
              {asset.notes || "N/A"}
            </p>
          </div>
        )}
      </div>
    </Box>
  );
}
