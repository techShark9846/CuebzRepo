// "use client";

// import React from "react";
// import { Box, Flex, Badge, ActionIcon } from "rizzui";
// import { PiXBold } from "react-icons/pi";
// import dayjs from "dayjs";
// import { QuotationType } from "@/types/quotationTypes";

// type QuotationDetailsModalProps = {
//   quotation: QuotationType;
//   closeModal?: () => void;
// };

// export default function QuotationDetailsModal({
//   quotation,
//   closeModal,
// }: QuotationDetailsModalProps) {
//   return (
//     <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
//       {/* Header */}
//       <Flex justify="between" align="center" className="border-b pb-4">
//         <h2 className="text-xl font-semibold">Quotation Details</h2>
//         <ActionIcon
//           size="sm"
//           variant="text"
//           onClick={closeModal}
//           className="text-gray-500 hover:!text-gray-900"
//         >
//           <PiXBold className="h-5 w-5" />
//         </ActionIcon>
//       </Flex>

//       {/* Content */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
//         {/* Proposal Number */}
//         <div>
//           <p className="text-sm text-gray-500">Proposal Number</p>
//           <p className="text-lg font-medium text-gray-900">
//             {quotation.proposal_number || "N/A"}
//           </p>
//         </div>

//         {/* Proposal Date */}
//         <div>
//           <p className="text-sm text-gray-500">Proposal Date</p>
//           <p className="text-lg font-medium text-gray-900">
//             {quotation.proposal_date
//               ? dayjs(quotation.proposal_date).format("DD-MMM-YYYY")
//               : "N/A"}
//           </p>
//         </div>

//         {/* Expiry Date */}
//         {quotation.proposal_expiry_date && (
//           <div>
//             <p className="text-sm text-gray-500">Expiry Date</p>
//             <p className="text-lg font-medium text-gray-900">
//               {dayjs(quotation.proposal_expiry_date).format("DD-MMM-YYYY")}
//             </p>
//           </div>
//         )}

//         {/* Lead Identifier */}
//         <div>
//           <p className="text-sm text-gray-500">Linked Lead</p>
//           <p className="text-lg font-medium text-gray-900">
//             {(quotation.lead_id as any)?.lead_identifier_name || "N/A"}
//           </p>
//         </div>

//         {/* Quotation Status */}
//         <div>
//           <p className="text-sm text-gray-500">Status</p>
//           <Badge
//             className={`capitalize px-2 py-1 rounded ${
//               quotation.status === "Draft"
//                 ? "bg-gray-300 text-gray-700"
//                 : quotation.status === "Sent"
//                   ? "bg-blue-100 text-blue-800"
//                   : quotation.status === "Accepted"
//                     ? "bg-green-100 text-green-800"
//                     : "bg-red-100 text-red-800"
//             }`}
//           >
//             {quotation.status || "N/A"}
//           </Badge>
//         </div>

//         {/* Proposal Title */}
//         <div className="col-span-2">
//           <p className="text-sm text-gray-500">Proposal Title</p>
//           <p className="text-lg font-medium text-gray-900">
//             {quotation.proposal_title || "N/A"}
//           </p>
//         </div>

//         {/* Proposal Details */}
//         <div className="col-span-2">
//           <p className="text-sm text-gray-500">Proposal Details</p>
//           <p className="text-lg font-medium text-gray-900">
//             {quotation.proposal_details || "N/A"}
//           </p>
//         </div>

//         {/* Items List */}
//         <div className="col-span-2">
//           <p className="text-sm text-gray-500 mb-2">Items</p>
//           <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
//             <table className="w-full text-sm text-gray-700">
//               <thead>
//                 <tr className="text-left font-medium border-b">
//                   <th className="py-2">Item Name</th>
//                   <th className="py-2">Description</th>
//                   <th className="py-2">Quantity</th>
//                   <th className="py-2">Unit Price</th>
//                   <th className="py-2">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {quotation.items.map((item, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="py-2">{item.item_name}</td>
//                     <td className="py-2">{item.description || "N/A"}</td>
//                     <td className="py-2">{item.quantity}</td>
//                     <td className="py-2">${item.unit_price.toFixed(2)}</td>
//                     <td className="py-2 font-semibold">
//                       ${item.total_price.toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Financial Summary */}
//         <div className="col-span-2">
//           <p className="text-sm text-gray-500">Financial Summary</p>
//           <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//             <div className="flex justify-between">
//               <span>Subtotal:</span>
//               <span className="font-medium">
//                 ${quotation.subtotal.toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>VAT:</span>
//               <span className="font-medium">${quotation.vat.toFixed(2)}</span>
//             </div>
//             <hr className="my-2" />
//             <div className="flex justify-between text-lg font-semibold">
//               <span>Total Amount:</span>
//               <span>${quotation.total_amount.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Payment Terms */}
//         <div className="col-span-2">
//           <p className="text-sm text-gray-500">Payment Terms</p>
//           <p className="text-lg font-medium text-gray-900">
//             {quotation.payment_terms || "N/A"}
//           </p>
//         </div>

//         {/* Terms & Conditions */}
//         <div className="col-span-2">
//           <p className="text-sm text-gray-500">Terms & Conditions</p>
//           <p className="text-lg font-medium text-gray-900">
//             {quotation.termsCondition || "N/A"}
//           </p>
//         </div>

//         {/* Comments */}
//         {quotation.comments && (
//           <div className="col-span-2">
//             <p className="text-sm text-gray-500">Comments</p>
//             <p className="text-lg font-medium text-gray-900">
//               {quotation.comments}
//             </p>
//           </div>
//         )}

//         {/* Attachments */}
//         {(quotation.attachments as any)?.length > 0 && (
//           <div className="col-span-2">
//             <p className="text-sm text-gray-500 mb-4">Attachments</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {(quotation.attachments as any).map(
//                 (attachment: any, index: number) => (
//                   <div key={index} className="p-4 bg-gray-50 border rounded-lg">
//                     <p className="text-sm font-medium text-gray-700 truncate">
//                       {attachment.file_name}
//                     </p>
//                     <a
//                       href={attachment.file_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 text-sm font-medium hover:underline"
//                     >
//                       View
//                     </a>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </Box>
//   );
// }

"use client";

import { useState } from "react";
// import dynamic from "next/dynamic";
import { Box, Flex, Badge, ActionIcon, Button } from "rizzui";
import { PiXBold, PiEyeBold } from "react-icons/pi";
import dayjs from "dayjs";
import { QuotationType } from "@/types/quotationTypes";

// Dynamically load the PDF Preview Modal
import PDFPreviewModal from "../create-edit/preview.tsx";

type QuotationDetailsModalProps = {
  quotation: QuotationType;
  closeModal?: () => void;
};

export default function QuotationDetailsModal({
  quotation,
  closeModal,
}: QuotationDetailsModalProps) {
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Quotation Details</h2>
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
          <PiEyeBold className="mr-2" /> View Quotation PDF
        </Button>
      </div> */}

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {/* Proposal Number */}
        <div>
          <p className="text-sm text-gray-500">Proposal Number</p>
          <p className="text-lg font-medium text-gray-900">
            {quotation.proposal_number || "N/A"}
          </p>
        </div>

        {/* Proposal Date */}
        <div>
          <p className="text-sm text-gray-500">Proposal Date</p>
          <p className="text-lg font-medium text-gray-900">
            {quotation.proposal_date
              ? dayjs(quotation.proposal_date).format("DD-MMM-YYYY")
              : "N/A"}
          </p>
        </div>

        {/* Expiry Date */}
        {quotation.proposal_expiry_date && (
          <div>
            <p className="text-sm text-gray-500">Expiry Date</p>
            <p className="text-lg font-medium text-gray-900">
              {dayjs(quotation.proposal_expiry_date).format("DD-MMM-YYYY")}
            </p>
          </div>
        )}

        {/* Linked Customer */}
        <div>
          <p className="text-sm text-gray-500">Customer</p>
          <p className="text-lg font-medium text-gray-900">
            {(quotation.customer_id as any)?.full_name || "N/A"}
          </p>
        </div>

        {/* Quotation Status */}
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge
            className={`capitalize px-2 py-1 rounded ${
              quotation.status === "Draft"
                ? "bg-gray-300 text-gray-700"
                : quotation.status === "Sent"
                  ? "bg-blue-100 text-blue-800"
                  : quotation.status === "Accepted"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
            }`}
          >
            {quotation.status || "N/A"}
          </Badge>
        </div>

        {/* Proposal Title */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Proposal Title</p>
          <p className="text-lg font-medium text-gray-900">
            {quotation.proposal_title || "N/A"}
          </p>
        </div>

        {/* Proposal Details */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Proposal Details</p>
          <p className="text-lg font-medium text-gray-900">
            {quotation.proposal_details || "N/A"}
          </p>
        </div>

        {/* Items List */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500 mb-2">Items</p>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="text-left font-medium border-b">
                  <th className="py-2">Item Name</th>
                  <th className="py-2">Description</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Unit Price</th>
                  <th className="py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {quotation.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.item_name}</td>
                    <td className="py-2">{item.description || "N/A"}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">AED {item.unit_price.toFixed(2)}</td>
                    <td className="py-2 font-semibold">
                      AED {item.total_price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Financial Summary</p>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">
                AED {quotation.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>VAT:</span>
              <span className="font-medium">
                AED {quotation.vat.toFixed(2)}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>AED {quotation.total_amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Payment Terms</p>
          <p className="text-lg font-medium text-gray-900">
            {quotation.payment_terms || "N/A"}
          </p>
        </div>

        {/* Terms & Conditions */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Terms & Conditions</p>
          <p className="text-lg font-medium text-gray-900">
            {quotation.termsCondition || "N/A"}
          </p>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPDFPreview && (
        <PDFPreviewModal
          data={{
            ...quotation,
            customer_id:
              typeof quotation.customer_id === "object"
                ? (quotation.customer_id as any).full_name
                : quotation.customer_id || "N/A", // Ensure customer_id is a string
          }}
          onClose={() => setShowPDFPreview(false)}
        />
      )}
    </Box>
  );
}
