"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import dayjs from "dayjs";
import { CallLogType } from "@/types/callLogTypes";

type CallLogDetailsModalProps = {
  callLog: CallLogType;
  closeModal?: () => void;
};

const statusColors: any = {
  "Positive Intention": "bg-green-500 text-white",
  "Neutral Intention": "bg-yellow-500 text-white",
  "Negative Intention": "bg-red-500 text-white",
};

export default function CallLogDetailsModal({
  callLog,
  closeModal,
}: CallLogDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Call Log Details</h2>
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
        {/* Date and Time of Call */}
        <div>
          <p className="text-sm text-gray-500">Date and Time of Call</p>
          <p className="text-lg font-medium text-gray-900">
            {dayjs(callLog.date_time).format("DD-MMM-YYYY hh:mm a") || "N/A"}
          </p>
        </div>

        {/* Caller Name */}
        <div>
          <p className="text-sm text-gray-500">Caller Name</p>
          <p className="text-lg font-medium text-gray-900">
            {callLog.caller_name || "N/A"}
          </p>
        </div>

        {/* Caller Company */}
        {callLog.caller_company && (
          <div>
            <p className="text-sm text-gray-500">Caller Company</p>
            <p className="text-lg font-medium text-gray-900">
              {callLog.caller_company || "N/A"}
            </p>
          </div>
        )}

        {/* Visitor Type */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Visitor Type</p>
          <Badge className="text-white bg-blue-500 py-1 px-3 rounded-full text-sm font-medium">
            {callLog.visitor_type || "N/A"}
          </Badge>
        </div>

        {/* Caller Contact Number */}
        <div>
          <p className="text-sm text-gray-500">Contact Number</p>
          <p className="text-lg font-medium text-gray-900">
            {callLog.caller_contact_number || "N/A"}
          </p>
        </div>

        {/* Purpose of Call */}
        <div>
          <p className="text-sm text-gray-500">Purpose of Call</p>
          <p className="text-lg font-medium text-gray-900">
            {callLog.purpose_of_call || "N/A"}
          </p>
        </div>

        {/* Call Handled By */}
        {callLog.call_handled_by && (
          <div>
            <p className="text-sm text-gray-500">Call Handled By</p>
            <p className="text-lg font-medium text-gray-900">
              {callLog.call_handled_by || "N/A"}
            </p>
          </div>
        )}

        {/* Reminder Action Date */}
        {callLog.reminder_action_date && (
          <div>
            <p className="text-sm text-gray-500">Reminder Action Date</p>
            <p className="text-lg font-medium text-gray-900">
              {dayjs(callLog.reminder_action_date).format("DD-MMM-YYYY")}
            </p>
          </div>
        )}

        {/* Call Outcome/Action Taken */}
        {callLog.call_outcome && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Call Outcome/Action Taken</p>
            <p className="text-lg font-medium text-gray-900">
              {callLog.call_outcome || "N/A"}
            </p>
          </div>
        )}

        {/* Status */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <Badge
            className={`py-1 px-3 rounded-full text-sm font-medium ${
              statusColors[callLog.status] || "bg-gray-500 text-white"
            }`}
          >
            {callLog.status || "N/A"}
          </Badge>
        </div>
      </div>
    </Box>
  );
}
