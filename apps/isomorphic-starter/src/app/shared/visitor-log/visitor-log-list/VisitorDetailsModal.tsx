"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import dayjs from "dayjs";
import { VisitorLogType } from "@/types/visitorLogTypes";

type VisitorDetailsModalProps = {
  visitor: VisitorLogType;
  closeModal?: () => void;
};

const statusColors: any = {
  "Positive Intention": "bg-green-500 text-white",
  "Neutral Intention": "bg-yellow-500 text-white",
  "Negative Intention": "bg-red-500 text-white",
};

export default function VisitorDetailsModal({
  visitor,
  closeModal,
}: VisitorDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Visitor Details</h2>
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
        {/* Visitor Name */}
        <div>
          <p className="text-sm text-gray-500">Visitor Name</p>
          <p className="text-lg font-medium text-gray-900">
            {visitor.visitor_name || "N/A"}
          </p>
        </div>

        {/* Visitor Company */}
        <div>
          <p className="text-sm text-gray-500">Visitor Company</p>
          <p className="text-lg font-medium text-gray-900">
            {visitor.visitor_company || "N/A"}
          </p>
        </div>

        {/* Visitor Type */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Visitor Type</p>
          <Badge className="text-white bg-blue-500 py-1 px-3 rounded-full text-sm font-medium">
            {visitor.visitor_type || "N/A"}
          </Badge>
        </div>

        {/* Visitor Contact Number */}
        <div>
          <p className="text-sm text-gray-500">Contact Number</p>
          <p className="text-lg font-medium text-gray-900">
            {visitor.visitor_contact_number || "N/A"}
          </p>
        </div>

        {/* Purpose of Visit */}
        <div>
          <p className="text-sm text-gray-500">Purpose of Visit</p>
          <p className="text-lg font-medium text-gray-900">
            {visitor.purpose_of_visit || "N/A"}
          </p>
        </div>

        {/* Person Visiting */}
        {visitor.person_visiting && (
          <div>
            <p className="text-sm text-gray-500">Person Visiting</p>
            <p className="text-lg font-medium text-gray-900">
              {visitor.person_visiting || "N/A"}
            </p>
          </div>
        )}

        {/* Reminder Action Date */}
        {visitor.reminder_action_date && (
          <div>
            <p className="text-sm text-gray-500">Reminder Action Date</p>
            <p className="text-lg font-medium text-gray-900">
              {dayjs(visitor.reminder_action_date).format("DD-MMM-YYYY")}
            </p>
          </div>
        )}

        {/* Comments */}
        {visitor.comments && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Comments/Notes</p>
            <p className="text-lg font-medium text-gray-900">
              {visitor.comments || "N/A"}
            </p>
          </div>
        )}

        {/* Status */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <Badge
            className={`py-1 px-3 rounded-full text-sm font-medium ${
              statusColors[visitor.status] || "bg-gray-500 text-white"
            }`}
          >
            {visitor.status || "N/A"}
          </Badge>
        </div>
      </div>
    </Box>
  );
}
