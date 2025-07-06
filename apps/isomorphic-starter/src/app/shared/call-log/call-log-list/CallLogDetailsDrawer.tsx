// "use client";

// import { useState, useEffect } from "react";
// import { Drawer, Button, Text, Badge } from "rizzui";
// import { MdClose, MdEdit } from "react-icons/md";
// import toast from "react-hot-toast";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import dayjs from "dayjs";

// import callLogService from "@/services/callLogService";
// import WidgetCard from "@core/components/cards/widget-card";
// import FormFooter from "@core/components/form-footer";
// import { callLogSchema, CallLogSchema } from "@/validators/callLog.schema";
// import CallLogForm from "../create-edit/form";

// const statusColors: any = {
//   "Positive Intention": "bg-green-500 text-white",
//   "Neutral Intention": "bg-yellow-500 text-white",
//   "Negative Intention": "bg-red-500 text-white",
// };

// export default function CallLogDetailsDrawer({
//   callLog,
//   open,
//   onClose,
//   onUpdated,
//   refreshData,
// }: {
//   callLog: any;
//   open: boolean;
//   onClose: () => void;
//   onUpdated?: () => void;
//   refreshData?: () => void;
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const methods = useForm<CallLogSchema>({
//     resolver: zodResolver(callLogSchema),
//     defaultValues: callLog,
//   });

//   useEffect(() => {
//     if (callLog) {
//       methods.reset(callLog);
//     }
//   }, [callLog]);

//   const handleSubmit = async (data: CallLogSchema) => {
//     setIsLoading(true);
//     try {
//       await callLogService.edit(callLog._id, data);
//       toast.success("Call log updated successfully.");
//       refreshData?.();
//       onClose();
//       onUpdated?.();
//     } catch (error) {
//       toast.error("Failed to update call log.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCloseDrawer = () => {
//     setIsEditing(false);
//     onClose();
//   };

//   return (
//     <Drawer
//       isOpen={open}
//       onClose={handleCloseDrawer}
//       overlayClassName="backdrop-blur"
//       containerClassName="!max-w-[calc(100%-480px)] !shadow-2xl z-[999]"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//           Call Log Details
//         </h2>
//         <div className="flex items-center gap-2">
//           {isEditing ? (
//             <Button
//               size="sm"
//               variant="outline"
//               onClick={() => setIsEditing(false)}
//             >
//               ← Back to Details
//             </Button>
//           ) : (
//             <Button
//               size="sm"
//               variant="outline"
//               onClick={() => setIsEditing(true)}
//             >
//               <MdEdit className="me-1" /> Edit
//             </Button>
//           )}
//           <Button
//             size="sm"
//             color="danger"
//             variant="outline"
//             onClick={handleCloseDrawer}
//           >
//             <MdClose className="w-5 h-5" />
//           </Button>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
//         {isEditing ? (
//           <FormProvider {...methods}>
//             <form onSubmit={methods.handleSubmit(handleSubmit)}>
//               <CallLogForm />
//               <FormFooter
//                 submitBtnText="Update Call Log"
//                 isLoading={isLoading}
//               />
//             </form>
//           </FormProvider>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             <WidgetCard title="Call Info">
//               <br />
//               <InfoGrid
//                 items={[
//                   {
//                     label: "Date & Time",
//                     value: dayjs(callLog.date_time).format(
//                       "DD-MMM-YYYY hh:mm a"
//                     ),
//                   },
//                   { label: "Caller Name", value: callLog.caller_name },
//                   { label: "Caller Company", value: callLog.caller_company },
//                   { label: "Visitor Type", value: callLog.visitor_type },
//                   {
//                     label: "Contact Number",
//                     value: callLog.caller_contact_number,
//                   },
//                   { label: "Purpose", value: callLog.purpose_of_call },
//                   { label: "Call Handled By", value: callLog.call_handled_by },
//                   {
//                     label: "Reminder Action Date",
//                     value: callLog.reminder_action_date
//                       ? dayjs(callLog.reminder_action_date).format(
//                           "DD-MMM-YYYY"
//                         )
//                       : "N/A",
//                   },
//                   // {
//                   //   label: "Status",
//                   //   value: (
//                   //     <Badge
//                   //       className={`py-1 px-3 rounded-full text-sm font-medium ${
//                   //         statusColors[callLog.status] ||
//                   //         "bg-gray-500 text-white"
//                   //       }`}
//                   //     >
//                   //       {callLog.status}
//                   //     </Badge>
//                   //   ),
//                   // },
//                 ]}
//               />
//             </WidgetCard>

//             {/* {callLog.call_outcome && (
//               <WidgetCard title="Call Outcome / Action Taken">
//                 <Text className="text-sm text-gray-700 whitespace-pre-line">
//                   {callLog.call_outcome}
//                 </Text>
//               </WidgetCard>
//             )} */}
//           </div>
//         )}
//       </div>
//     </Drawer>
//   );
// }

// function InfoGrid({
//   items,
// }: {
//   items: { label: string; value?: string | number | JSX.Element }[];
// }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {items.map(({ label, value }) => (
//         <div key={label} className="text-sm">
//           <p className="text-gray-500 font-medium text-xs mb-1">{label}</p>
//           <p className="text-gray-900 font-semibold break-words">
//             {typeof value === "string" || typeof value === "number"
//               ? value || "N/A"
//               : value}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Drawer, Button, Text } from "rizzui";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

import callLogService from "@/services/callLogService";
import WidgetCard from "@core/components/cards/widget-card";
import FormFooter from "@core/components/form-footer";
import { callLogSchema, CallLogSchema } from "@/validators/callLog.schema";
import CallLogForm from "../create-edit/form";
import DeleteConfirmModal from "@core/components/DeleteConfirmModal";

export default function CallLogDetailsDrawer({
  callLog,
  open,
  onClose,
  onUpdated,
  refreshData,
}: {
  callLog: any;
  open: boolean;
  onClose: () => void;
  onUpdated?: () => void;
  refreshData?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const methods = useForm<CallLogSchema>({
    resolver: zodResolver(callLogSchema),
    defaultValues: callLog,
  });

  useEffect(() => {
    if (callLog) {
      methods.reset(callLog);
    }
  }, [callLog]);

  const handleSubmit = async (data: CallLogSchema) => {
    setIsLoading(true);
    try {
      await callLogService.edit(callLog._id, data);
      toast.success("Call log updated successfully.");
      refreshData?.();
      onClose();
      onUpdated?.();
    } catch (error) {
      toast.error("Failed to update call log.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDrawer = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <Drawer
      isOpen={open}
      onClose={handleCloseDrawer}
      overlayClassName="backdrop-blur"
      containerClassName="w-full sm:!max-w-[calc(100%-480px)] !shadow-2xl z-[999]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Call Log Details
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

          {/* Delete confirmation modal */}
          <DeleteConfirmModal
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={async () => {
              try {
                setDeleting(true);
                toast.loading("Deleting call log...");
                await callLogService.delete(callLog._id);
                toast.dismiss();
                toast.success(`Call log deleted successfully.`);
                setDeleteOpen(false);
                if (onUpdated) onUpdated();
                onClose();
                if (refreshData) refreshData();
              } catch {
                toast.dismiss();
                toast.error("Failed to delete call log.");
              } finally {
                setDeleting(false);
              }
            }}
            loading={deleting}
            title="Delete Call Log"
            description={`Are you sure you want to delete this call log?`}
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

      {/* Body */}
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        {isEditing ? (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <CallLogForm />
              <FormFooter
                submitBtnText="Update Call Log"
                isLoading={isLoading}
              />
            </form>
          </FormProvider>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <WidgetCard title="Call Info">
              <br />
              <InfoGrid
                items={[
                  {
                    label: "Date & Time",
                    value: dayjs(callLog.date_time).format(
                      "DD-MMM-YYYY hh:mm a"
                    ),
                  },
                  { label: "Caller Name", value: callLog.caller_name },
                  { label: "Caller Company", value: callLog.caller_company },
                  { label: "Visitor Type", value: callLog.visitor_type },
                  {
                    label: "Contact Number",
                    value: callLog.caller_contact_number,
                  },
                  { label: "Purpose", value: callLog.purpose_of_call },
                  { label: "Call Handled By", value: callLog.call_handled_by },
                  {
                    label: "Reminder Action Date",
                    value: callLog.reminder_action_date
                      ? dayjs(callLog.reminder_action_date).format(
                          "DD-MMM-YYYY"
                        )
                      : "N/A",
                  },
                ]}
              />
            </WidgetCard>
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
