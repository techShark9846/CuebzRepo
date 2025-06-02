"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import dayjs from "dayjs";

type ChequeTrackerDetailsModalProps = {
  cheque: any;
  closeModal?: () => void;
};

export default function ChequeTrackerDetailsModal({
  cheque,
  closeModal,
}: ChequeTrackerDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Cheque Details</h2>
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
        {/* Cheque Number */}
        <div>
          <p className="text-sm text-gray-500">Cheque Number</p>
          <p className="text-lg font-medium text-gray-900">
            {cheque.cheque_number || "N/A"}
          </p>
        </div>

        {/* Cheque Date */}
        <div>
          <p className="text-sm text-gray-500">Cheque Date</p>
          <p className="text-lg font-medium text-gray-900">
            {dayjs(cheque.cheque_date).isValid()
              ? dayjs(cheque.cheque_date).format("DD-MMM-YYYY")
              : "N/A"}
          </p>
        </div>

        {/* Amount */}
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="text-lg font-medium text-gray-900">
            {cheque.amount ? `₹${cheque.amount}` : "N/A"}
          </p>
        </div>

        {/* Bank Name */}
        <div>
          <p className="text-sm text-gray-500">Bank Name</p>
          <p className="text-lg font-medium text-gray-900">
            {cheque.bank_name || "N/A"}
          </p>
        </div>

        {/* Payee/Payer Names */}
        <div>
          <p className="text-sm text-gray-500">Payee/Payer Name</p>
          <p className="text-lg font-medium text-gray-900">
            {cheque.payee_payeer_name || "N/A"}
          </p>
        </div>

        {/* Purpose */}
        <div>
          <p className="text-sm text-gray-500">Purpose</p>
          <p className="text-lg font-medium text-gray-900">
            {cheque.purpose || "N/A"}
          </p>
        </div>

        {/* Cheque Status */}
        <div>
          <p className="text-sm text-gray-500">Cheque Status</p>
          <Badge
            className={`capitalize ${
              cheque.cheque_status === "Cleared"
                ? "bg-green-100 text-green-800"
                : cheque.cheque_status === "Bounced"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
            }`}
          >
            {cheque.cheque_status || "N/A"}
          </Badge>
        </div>

        {/* Reminder Date */}
        <div>
          <p className="text-sm text-gray-500">Reminder Date</p>
          <p className="text-lg font-medium text-gray-900">
            {dayjs(cheque.reminder_date).isValid()
              ? dayjs(cheque.reminder_date).format("DD-MMM-YYYY")
              : "N/A"}
          </p>
        </div>

        {/* Attachments */}
        {(cheque?.attachments as [])?.length > 0 && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500 mb-4">Attachments</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(cheque.attachments as []).map(
                (attachment: string, index: number) => {
                  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(attachment);
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                    >
                      {/* File Preview */}
                      <div className="flex items-center justify-center h-32 w-32 bg-white border border-gray-300 rounded-lg overflow-hidden">
                        {isImage ? (
                          <img
                            src={attachment}
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
                        {`Attachment ${index + 1}`}
                      </p>

                      {/* Actions */}
                      <div className="mt-2 flex items-center space-x-2">
                        <a
                          href={attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm font-medium hover:underline"
                        >
                          View
                        </a>
                        <a
                          href={attachment}
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
