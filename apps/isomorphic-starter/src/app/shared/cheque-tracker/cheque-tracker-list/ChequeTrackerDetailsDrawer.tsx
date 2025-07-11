// "use client";

// import React from "react";
// import { Box, Flex, Badge, ActionIcon } from "rizzui";
// import { PiXBold } from "react-icons/pi";
// import dayjs from "dayjs";

// type ChequeTrackerDetailsModalProps = {
//   cheque: any;
//   closeModal?: () => void;
// };

// export default function ChequeTrackerDetailsModal({
//   cheque,
//   closeModal,
// }: ChequeTrackerDetailsModalProps) {
//   return (
//     <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
//       {/* Header */}
//       <Flex justify="between" align="center" className="border-b pb-4">
//         <h2 className="text-xl font-semibold">Cheque Details</h2>
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
//         {/* Cheque Number */}
//         <div>
//           <p className="text-sm text-gray-500">Cheque Number</p>
//           <p className="text-lg font-medium text-gray-900">
//             {cheque.cheque_number || "N/A"}
//           </p>
//         </div>

//         {/* Cheque Date */}
//         <div>
//           <p className="text-sm text-gray-500">Cheque Date</p>
//           <p className="text-lg font-medium text-gray-900">
//             {dayjs(cheque.cheque_date).isValid()
//               ? dayjs(cheque.cheque_date).format("DD-MMM-YYYY")
//               : "N/A"}
//           </p>
//         </div>

//         {/* Amount */}
//         <div>
//           <p className="text-sm text-gray-500">Amount</p>
//           <p className="text-lg font-medium text-gray-900">
//             {cheque.amount ? `₹${cheque.amount}` : "N/A"}
//           </p>
//         </div>

//         {/* Bank Name */}
//         <div>
//           <p className="text-sm text-gray-500">Bank Name</p>
//           <p className="text-lg font-medium text-gray-900">
//             {cheque.bank_name || "N/A"}
//           </p>
//         </div>

//         {/* Payee/Payer Names */}
//         <div>
//           <p className="text-sm text-gray-500">Payee/Payer Name</p>
//           <p className="text-lg font-medium text-gray-900">
//             {cheque.payee_payeer_name || "N/A"}
//           </p>
//         </div>

//         {/* Purpose */}
//         <div>
//           <p className="text-sm text-gray-500">Purpose</p>
//           <p className="text-lg font-medium text-gray-900">
//             {cheque.purpose || "N/A"}
//           </p>
//         </div>

//         {/* Cheque Status */}
//         <div>
//           <p className="text-sm text-gray-500">Cheque Status</p>
//           <Badge
//             className={`capitalize ${
//               cheque.cheque_status === "Cleared"
//                 ? "bg-green-100 text-green-800"
//                 : cheque.cheque_status === "Bounced"
//                   ? "bg-red-100 text-red-800"
//                   : "bg-blue-100 text-blue-800"
//             }`}
//           >
//             {cheque.cheque_status || "N/A"}
//           </Badge>
//         </div>

//         {/* Reminder Date */}
//         <div>
//           <p className="text-sm text-gray-500">Reminder Date</p>
//           <p className="text-lg font-medium text-gray-900">
//             {dayjs(cheque.reminder_date).isValid()
//               ? dayjs(cheque.reminder_date).format("DD-MMM-YYYY")
//               : "N/A"}
//           </p>
//         </div>

//         {/* Attachments */}
//         {(cheque?.attachments as [])?.length > 0 && (
//           <div className="col-span-2">
//             <p className="text-sm text-gray-500 mb-4">Attachments</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {(cheque.attachments as []).map(
//                 (attachment: string, index: number) => {
//                   const isImage = /\.(jpg|jpeg|png|gif)$/i.test(attachment);
//                   return (
//                     <div
//                       key={index}
//                       className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
//                     >
//                       {/* File Preview */}
//                       <div className="flex items-center justify-center h-32 w-32 bg-white border border-gray-300 rounded-lg overflow-hidden">
//                         {isImage ? (
//                           <img
//                             src={attachment}
//                             alt={`Attachment ${index + 1}`}
//                             className="object-cover h-full w-full"
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-500">
//                             <span className="text-sm font-medium">File</span>
//                           </div>
//                         )}
//                       </div>

//                       {/* File Name */}
//                       <p className="mt-3 text-sm font-medium text-gray-700 truncate">
//                         {`Attachment ${index + 1}`}
//                       </p>

//                       {/* Actions */}
//                       <div className="mt-2 flex items-center space-x-2">
//                         <a
//                           href={attachment}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 text-sm font-medium hover:underline"
//                         >
//                           View
//                         </a>
//                         <a
//                           href={attachment}
//                           download
//                           className="text-gray-600 text-sm font-medium hover:underline"
//                         >
//                           Download
//                         </a>
//                       </div>
//                     </div>
//                   );
//                 }
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </Box>
//   );
// }

// chequeTrackerDetailsDrawer.tsx
// chequeTrackerDetailsDrawer.tsx
"use client";

import { useEffect, useState } from "react";
import { Drawer, Button, Text, Badge } from "rizzui";
import { MdClose, MdEdit, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import WidgetCard from "@core/components/cards/widget-card";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFooter from "@core/components/form-footer";
import {
  chequeTrackerSchema,
  ChequeTrackerSchema,
} from "@/validators/chequeTracker.schema";
import ChequeTrackerForm from "../create-edit/form";
import chequeService from "@/services/chequeTrackerService";
import DeleteConfirmModal from "@core/components/DeleteConfirmModal";

export default function ChequeTrackerDetailsDrawer({
  cheque,
  open,
  onClose,
  onUpdated,
}: {
  cheque: any;
  open: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [filePreviews, setFilePreviews] = useState<Record<string, string[]>>({
    attachments: cheque.attachments || [],
  });

  const methods = useForm<ChequeTrackerSchema>({
    resolver: zodResolver(chequeTrackerSchema),
    defaultValues: cheque,
  });

  useEffect(() => {
    if (cheque) {
      methods.reset(cheque);
      setFilePreviews({ attachments: cheque.attachments || [] });
    }
  }, [cheque]);

  const handleSubmit = async (data: ChequeTrackerSchema) => {
    setIsLoading(true);
    try {
      await chequeService.edit(cheque._id, data);
      toast.success("Cheque updated successfully.");
      setIsEditing(false);
      onClose();
      onUpdated?.();
    } catch (err) {
      toast.error("Failed to update cheque.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      overlayClassName="backdrop-blur"
      containerClassName="!max-w-[calc(100%-480px)] !shadow-2xl z-[999]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Cheque Details
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {isEditing ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              ← Back to Details
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              <MdEdit className="me-1" /> Edit
            </Button>
          )}

          <DeleteConfirmModal
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={async () => {
              try {
                setDeleting(true);
                toast.loading("Deleting cheque...");
                await chequeService.delete(cheque._id);
                toast.dismiss();
                toast.success(
                  `Cheque ${cheque.cheque_number} deleted successfully.`
                );
                setDeleteOpen(false);
                if (onUpdated) onUpdated();
                onClose();
              } catch {
                toast.dismiss();
                toast.error("Failed to delete cheque.");
              } finally {
                setDeleting(false);
              }
            }}
            loading={deleting}
            title="Delete Cheque"
            description={`Are you sure you want to delete cheque ${cheque.cheque_number}?`}
          />

          <Button
            size="sm"
            variant="outline"
            onClick={() => setDeleteOpen(true)}
          >
            <MdDelete className="me-1" /> Delete
          </Button>

          <Button size="sm" variant="outline" onClick={onClose}>
            <MdClose className="w-5 h-5" /> Close
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        {isEditing ? (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <ChequeTrackerForm
                filePreviews={filePreviews}
                setFilePreviews={setFilePreviews}
              />
              <FormFooter submitBtnText="Update Cheque" isLoading={isLoading} />
            </form>
          </FormProvider>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <WidgetCard title="Cheque Info">
              <br />
              <InfoGrid
                items={[
                  { label: "Cheque Number", value: cheque.cheque_number },
                  {
                    label: "Cheque Date",
                    value: formatDate(cheque.cheque_date),
                  },
                  {
                    label: "Type",
                    value: cheque.cheque_type || "N/A",
                  },
                  {
                    label: "Amount",
                    value: cheque.amount ? `AED ${cheque.amount}` : "N/A",
                  },
                  { label: "Bank Name", value: cheque.bank_name },
                  {
                    label: "Payer Name",
                    value: cheque.payeer_name,
                  },
                  {
                    label: "Payee Name",
                    value: cheque.payee_name,
                  },
                  { label: "Purpose", value: cheque.purpose },
                  {
                    label: "Status",
                    value: (
                      <Badge
                        className={`capitalize ${
                          cheque.cheque_status === "Cleared"
                            ? "bg-green-500 text-white"
                            : cheque.cheque_status === "Bounced"
                              ? "bg-red-500 text-white"
                              : "bg-blue-500 text-white"
                        }`}
                      >
                        {cheque.cheque_status || "N/A"}
                      </Badge>
                    ),
                  },
                  {
                    label: "Reminder Date",
                    value: formatDate(cheque.reminder_date),
                  },
                ]}
              />
            </WidgetCard>

            {cheque.attachments?.length > 0 && (
              <WidgetCard title="Attachments">
                <br />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cheque.attachments.map(
                    (attachment: string, index: number) => {
                      const isImage = /\.(jpg|jpeg|png|gif)$/i.test(attachment);
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                        >
                          <div className="flex items-center justify-center h-32 w-32 bg-white border border-gray-300 rounded-lg overflow-hidden">
                            {isImage ? (
                              <img
                                src={attachment}
                                alt={`Attachment ${index + 1}`}
                                className="object-cover h-full w-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-500">
                                <span className="text-sm font-medium">
                                  File
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="mt-3 text-sm font-medium text-gray-700 truncate">
                            {`Attachment ${index + 1}`}
                          </p>
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
              </WidgetCard>
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
}

function InfoGrid({
  items,
}: {
  items: { label: string; value?: string | number | JSX.Element }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map(({ label, value }) => (
        <div key={label} className="text-sm">
          <p className="text-gray-500 font-medium text-xs mb-1">{label}</p>
          <p className="text-gray-900 font-semibold break-words">
            {typeof value === "string" || typeof value === "number"
              ? value || "N/A"
              : value}
          </p>
        </div>
      ))}
    </div>
  );
}

function formatDate(date: string | Date) {
  return date ? dayjs(date).format("DD-MMM-YYYY") : "N/A";
}
