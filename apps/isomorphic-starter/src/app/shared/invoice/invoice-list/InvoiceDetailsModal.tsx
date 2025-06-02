"use client";

import { useState } from "react";
import { Box, Flex, Badge, ActionIcon, Button } from "rizzui";
import { PiXBold, PiEyeBold } from "react-icons/pi";
import dayjs from "dayjs";
import { InvoiceType } from "@/types/invoiceTypes";

type InvoiceDetailsModalProps = {
  invoice: InvoiceType;
  closeModal?: () => void;
};

export default function InvoiceDetailsModal({
  invoice,
  closeModal,
}: InvoiceDetailsModalProps) {
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Invoice Details</h2>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={closeModal}
          className="text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </Flex>

      {/* View PDF Button */}
      {/* <div className="flex justify-end">
        <Button
          variant="outline"
          className="flex items-center"
          onClick={() => setShowPDFPreview(true)}
        >
          <PiEyeBold className="mr-2" /> View Invoice PDF
        </Button>
      </div> */}

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {/* Invoice Number */}
        <div>
          <p className="text-sm text-gray-500">Invoice Number</p>
          <p className="text-lg font-medium text-gray-900">
            {invoice.invoice_number || "N/A"}
          </p>
        </div>

        {/* Invoice Date */}
        <div>
          <p className="text-sm text-gray-500">Invoice Date</p>
          <p className="text-lg font-medium text-gray-900">
            {invoice.invoice_date
              ? dayjs(invoice.invoice_date).format("DD-MMM-YYYY")
              : "N/A"}
          </p>
        </div>

        {/* Due Date */}
        <div>
          <p className="text-sm text-gray-500">Due Date</p>
          <p className="text-lg font-medium text-gray-900">
            {invoice.due_date
              ? dayjs(invoice.due_date).format("DD-MMM-YYYY")
              : "N/A"}
          </p>
        </div>

        {/* Linked Quotation */}
        <div>
          <p className="text-sm text-gray-500">Linked Quotation</p>
          <p className="text-lg font-medium text-gray-900">
            {(invoice.quotation_id as any)?.proposal_number || "N/A"}
          </p>
        </div>

        {/* Invoice Status */}
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge
            className={`capitalize px-2 py-1 rounded ${
              invoice.status === "Unpaid"
                ? "bg-red-100 text-red-800"
                : invoice.status === "Paid"
                  ? "bg-green-100 text-green-800"
                  : invoice.status === "Cancelled"
                    ? "bg-gray-300 text-gray-700"
                    : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {invoice.status || "N/A"}
          </Badge>
        </div>

        {/* Financial Summary */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Financial Summary</p>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">
                AED{" "}
                {(invoice.quotation_id as any)?.subtotal.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>VAT:</span>
              <span className="font-medium">
                AED {(invoice.quotation_id as any)?.vat.toFixed(2) || "0.00"}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>
                AED{" "}
                {(invoice.quotation_id as any)?.total_amount.toFixed(2) ||
                  "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Receipt */}
        {invoice.payment_receipt?.file_url && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Payment Receipt</p>
            <a
              href={invoice.payment_receipt.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Payment Receipt
            </a>
          </div>
        )}

        {/* Attachments */}
        {(invoice.attachments as any)?.length > 0 && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Attachments</p>
            <div className="flex flex-wrap gap-2">
              {(invoice.attachments as any).map(
                (attachment: any, index: number) => (
                  <a
                    key={index}
                    href={attachment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {attachment.file_name}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}
