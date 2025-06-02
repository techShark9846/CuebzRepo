"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import dayjs from "dayjs";
import { CustomerType } from "@/types/customerTypes";

type CustomerDetailsModalProps = {
  customer: CustomerType;
  closeModal?: () => void;
};

export default function CustomerDetailsModal({
  customer,
  closeModal,
}: CustomerDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Customer Details</h2>
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
        {/* Full Name */}
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-lg font-medium text-gray-900">
            {customer.full_name || "N/A"}
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium text-gray-900">
            {customer.email || "N/A"}
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <p className="text-sm text-gray-500">Phone Number</p>
          <p className="text-lg font-medium text-gray-900">
            {customer.phone_number || "N/A"}
          </p>
        </div>

        {/* Date of Birth */}
        {customer.date_of_birth && (
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="text-lg font-medium text-gray-900">
              {dayjs(customer.date_of_birth).format("DD-MMM-YYYY")}
            </p>
          </div>
        )}

        {/* Customer Type */}
        <div>
          <p className="text-sm text-gray-500">Customer Type</p>
          <Badge className="text-white bg-blue-500 py-1 px-3 rounded-full text-sm font-medium">
            {customer.customer_type}
          </Badge>
        </div>

        {/* Organization Name */}
        {customer.organization_name && (
          <div>
            <p className="text-sm text-gray-500">Organization Name</p>
            <p className="text-lg font-medium text-gray-900">
              {customer.organization_name || "N/A"}
            </p>
          </div>
        )}

        {/* Assigned To */}
        {customer.assigned_to && (
          <div>
            <p className="text-sm text-gray-500">Assigned To</p>
            <p className="text-lg font-medium text-gray-900">
              {(customer as any)?.assigned_to?.full_name || "N/A"}
            </p>
          </div>
        )}

        {/* Address */}
        {customer.address && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-lg font-medium text-gray-900">
              {[
                customer.address.street,
                customer.address.city,
                customer.address.state,
                customer.address.country,
              ]
                .filter(Boolean)
                .join(", ") || "N/A"}
            </p>
          </div>
        )}

        {/* Notes */}
        {customer.notes && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Notes</p>
            <p className="text-lg font-medium text-gray-900">
              {customer.notes || "N/A"}
            </p>
          </div>
        )}

        {/* Status */}
        {/* <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge className="py-1 px-3 rounded-full text-sm font-medium bg-gray-500 text-white">
            {customer.status || "N/A"}
          </Badge>
        </div> */}
      </div>
    </Box>
  );
}
