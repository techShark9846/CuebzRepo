"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import dayjs from "dayjs";
import { LeadType } from "@/types/leadTypes";

type LeadDetailsModalProps = {
  lead: LeadType;
  closeModal?: () => void;
};

const leadStatusColors: any = {
  New: "bg-blue-500 text-white",
  Contacted: "bg-yellow-500 text-white",
  Qualified: "bg-green-500 text-white",
  "Proposal Sent": "bg-indigo-500 text-white",
  Won: "bg-teal-500 text-white",
  Lost: "bg-red-500 text-white",
};

export default function LeadDetailsModal({
  lead,
  closeModal,
}: LeadDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Lead Details</h2>
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
        {/* Lead Source */}
        <div>
          <p className="text-sm text-gray-500">Lead Identifier Name</p>
          <p className="text-lg font-medium text-gray-900">
            {lead.lead_identifier_name || "N/A"}
          </p>
        </div>
        {/* Lead Source */}
        <div>
          <p className="text-sm text-gray-500">Lead Source</p>
          <p className="text-lg font-medium text-gray-900">
            {lead.lead_source || "N/A"}
          </p>
        </div>

        {/* Company Name */}
        {lead.company_name && (
          <div>
            <p className="text-sm text-gray-500">Company Name</p>
            <p className="text-lg font-medium text-gray-900">
              {lead.company_name || "N/A"}
            </p>
          </div>
        )}

        {/* Contact Person */}
        <div>
          <p className="text-sm text-gray-500">Contact Person</p>
          <p className="text-lg font-medium text-gray-900">
            {lead.contact_person || "N/A"}
          </p>
        </div>

        {/* Contact Number */}
        <div>
          <p className="text-sm text-gray-500">Contact Number</p>
          <p className="text-lg font-medium text-gray-900">
            {lead.contact_number || "N/A"}
          </p>
        </div>

        {/* Email Address */}
        <div>
          <p className="text-sm text-gray-500">Email Address</p>
          <p className="text-lg font-medium text-gray-900">
            {lead.email || "N/A"}
          </p>
        </div>

        {/* Address */}
        {lead.address && (
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-lg font-medium text-gray-900">
              {`${lead.address.street || ""}, ${lead.address.city || ""}, ${
                lead.address.state || ""
              }, ${lead.address.postal_code || ""}, ${lead.address.country || ""}`.trim() ||
                "N/A"}
            </p>
          </div>
        )}

        {/* Lead Status */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Lead Status</p>
          <Badge
            className={`py-1 px-3 rounded-full text-sm font-medium ${
              leadStatusColors[lead.lead_status] || "bg-gray-500 text-white"
            }`}
          >
            {lead.lead_status || "N/A"}
          </Badge>
        </div>

        {/* Lead Score */}
        {lead.lead_score !== null && (
          <div>
            <p className="text-sm text-gray-500">Lead Score</p>
            <p className="text-lg font-medium text-gray-900">
              {lead.lead_score || "N/A"}
            </p>
          </div>
        )}

        {/* Assigned To */}
        <div>
          <p className="text-sm text-gray-500">Assigned To</p>
          <p className="text-lg font-medium text-gray-900">
            {(lead?.assigned_to as any)?.full_name || "N/A"}
          </p>
        </div>

        {/* Next Steps */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Next Steps</p>
          <p className="text-lg font-medium text-gray-900">
            {lead.next_steps || "N/A"}
          </p>
        </div>

        {/* Comments */}
        {lead.comments && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Comments/Notes</p>
            <p className="text-lg font-medium text-gray-900">
              {lead.comments || "N/A"}
            </p>
          </div>
        )}

        {/* Customer Reference */}
        {lead.customer_reference && (
          <div>
            <p className="text-sm text-gray-500">Customer Reference</p>
            <p className="text-lg font-medium text-gray-900">
              {(lead.customer_reference as any)?.full_name || "N/A"}
            </p>
          </div>
        )}

        {/* Creation Date */}
        <div>
          <p className="text-sm text-gray-500">Created At</p>
          <p className="text-lg font-medium text-gray-900">
            {dayjs(lead.createdAt).format("DD-MMM-YYYY") || "N/A"}
          </p>
        </div>
      </div>
    </Box>
  );
}
