"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import dayjs from "dayjs";
import { VendorType } from "@/types/vendorTypes";

type VendorDetailsModalProps = {
  vendor: VendorType;
  closeModal?: () => void;
};

export default function VendorDetailsModal({
  vendor,
  closeModal,
}: VendorDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Vendor Details</h2>
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
        {/* Vendor Name */}
        <div>
          <p className="text-sm text-gray-500">Vendor Name</p>
          <p className="text-lg font-medium text-gray-900">
            {vendor.vendor_name || "N/A"}
          </p>
        </div>

        {/* Contact Person */}
        <div>
          <p className="text-sm text-gray-500">Contact Person</p>
          <p className="text-lg font-medium text-gray-900">
            {vendor.contact_person || "N/A"}
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <p className="text-sm text-gray-500">Phone Number</p>
          <p className="text-lg font-medium text-gray-900">
            {vendor.phone_number || "N/A"}
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium text-gray-900">
            {vendor.email || "N/A"}
          </p>
        </div>

        {/* Vendor Type */}
        <div>
          <p className="text-sm text-gray-500">Vendor Type</p>
          <Badge className="capitalize bg-blue-100 text-blue-800">
            {vendor.vendor_type || "N/A"}
          </Badge>
        </div>

        {/* Assigned To */}
        <div>
          <p className="text-sm text-gray-500">Assigned To</p>
          <p className="text-lg font-medium text-gray-900">
            {vendor.assigned_to?.full_name || "N/A"}
          </p>
        </div>

        {/* Address */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Address</p>
          <p className="text-lg font-medium text-gray-900">
            {`${vendor.address?.street || ""}, ${vendor.address?.city || ""}, ${
              vendor.address?.state || ""
            }, ${vendor.address?.country || "N/A"}`.replace(/^, |, $/, "N/A")}
          </p>
        </div>

        {/* Services Offered */}
        {(vendor.services_offered as any)?.length > 0 && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Services Offered</p>
            <ul className="list-disc list-inside text-lg font-medium text-gray-900">
              {(vendor.services_offered as any)?.map(
                (service: any, index: number) => <li key={index}>{service}</li>
              )}
            </ul>
          </div>
        )}

        {/* Notes */}
        {vendor.notes && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Notes</p>
            <p className="text-lg font-medium text-gray-900">{vendor.notes}</p>
          </div>
        )}

        {/* Attachments */}
        {(vendor?.attachments as [])?.length > 0 && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500 mb-4">Attachments</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(vendor.attachments as any)?.map(
                (attachment: any, index: number) => {
                  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(
                    attachment.file_url
                  );
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                    >
                      {/* File Preview */}
                      <div className="flex items-center justify-center h-32 w-32 bg-white border border-gray-300 rounded-lg overflow-hidden">
                        {isImage ? (
                          <img
                            src={attachment.file_url}
                            alt={`Attachment ${index + 1}`}
                            className="object-cover h-full w-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-500">
                            <span className="text-sm font-medium">File</span>
                          </div>
                        )}
                      </div>

                      {/* File Name */}
                      <p className="mt-3 text-sm font-medium text-gray-700 truncate">
                        {attachment.file_name || `Attachment ${index + 1}`}
                      </p>

                      {/* Actions */}
                      <div className="mt-2 flex items-center space-x-2">
                        <a
                          href={attachment.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm font-medium hover:underline"
                        >
                          View
                        </a>
                        <a
                          href={attachment.file_url}
                          download
                          className="text-gray-600 text-sm font-medium hover:underline"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}
