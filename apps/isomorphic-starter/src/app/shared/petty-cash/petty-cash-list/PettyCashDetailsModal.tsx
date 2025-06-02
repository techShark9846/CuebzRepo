"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import dayjs from "dayjs";

type PettyCashDetailsModalProps = {
  pettyCash: any;
  closeModal?: () => void;
};

export default function PettyCashDetailsModal({
  pettyCash,
  closeModal,
}: PettyCashDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Petty Cash Details</h2>
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
        {/* Transaction Type */}
        <div>
          <p className="text-sm text-gray-500">Transaction Type</p>
          <p className="text-lg font-medium text-gray-900">
            {pettyCash.transaction_type || "N/A"}
          </p>
        </div>

        {/* Transaction Date */}
        <div>
          <p className="text-sm text-gray-500">Transaction Date</p>
          <p className="text-lg font-medium text-gray-900">
            {dayjs(pettyCash.transaction_date).isValid()
              ? dayjs(pettyCash.transaction_date).format("DD-MMM-YYYY")
              : "N/A"}
          </p>
        </div>

        {/* Amount */}
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="text-lg font-medium text-gray-900">
            {pettyCash.amount ? `₹${pettyCash.amount}` : "N/A"}
          </p>
        </div>

        {/* Purpose */}
        <div>
          <p className="text-sm text-gray-500">Purpose</p>
          <p className="text-lg font-medium text-gray-900">
            {pettyCash.purpose || "N/A"}
          </p>
        </div>

        {/* Remarks */}
        <div>
          <p className="text-sm text-gray-500">Remarks</p>
          <p className="text-lg font-medium text-gray-900">
            {pettyCash.remarks || "N/A"}
          </p>
        </div>

        {/* Attachment */}
        {pettyCash.attachment && (
          <div>
            <p className="text-sm text-gray-500">Attachment</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="h-32 w-32 overflow-hidden rounded-lg border bg-gray-50">
                <img
                  src={pettyCash.attachment}
                  alt="Attachment"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <a
                  href={pettyCash.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View
                </a>
                <a
                  href={pettyCash.attachment}
                  download
                  className="text-gray-600 text-sm font-medium hover:underline"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}
