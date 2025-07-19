// "use client";

// import React from "react";
// import { Box, Flex, Badge, ActionIcon } from "rizzui";
// import { PiXBold } from "react-icons/pi";
// import dayjs from "dayjs";
// import { TaskType } from "@/types/taskTypes";

// type TaskDetailsModalProps = {
//   task: TaskType;
//   closeModal?: () => void;
// };

// export default function TaskDetailsModal({
//   task,
//   closeModal,
// }: TaskDetailsModalProps) {
//   return (
//     <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
//       {/* Header */}
//       <Flex justify="between" align="center" className="border-b pb-4">
//         <h2 className="text-xl font-semibold">Task Details</h2>
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
//         {/* Task Title */}
//         <div>
//           <p className="text-sm text-gray-500">Task Title</p>
//           <p className="text-lg font-medium text-gray-900">
//             {task.title || "N/A"}
//           </p>
//         </div>

//         {/* Assigned To */}
//         <div>
//           <p className="text-sm text-gray-500">Assigned To</p>
//           <p className="text-lg font-medium text-gray-900">
//             {task.assignedTo?.full_name || "N/A"}
//           </p>
//         </div>

//         {/* Priority */}
//         <div>
//           <p className="text-sm text-gray-500">Priority</p>
//           <Badge
//             className={`capitalize ${
//               task.priority === "High"
//                 ? "bg-red-100 text-red-800"
//                 : task.priority === "Medium"
//                   ? "bg-yellow-100 text-yellow-800"
//                   : "bg-green-100 text-green-800"
//             }`}
//           >
//             {task.priority || "N/A"}
//           </Badge>
//         </div>

//         {/* Due Date */}
//         <div>
//           <p className="text-sm text-gray-500">Due Date</p>
//           <p className="text-lg font-medium text-gray-900">
//             {dayjs(task.dueDate).isValid()
//               ? dayjs(task.dueDate).format("DD-MMM-YYYY")
//               : "N/A"}
//           </p>
//         </div>

//         {/* Status */}
//         <div>
//           <p className="text-sm text-gray-500">Status</p>
//           <Badge
//             className={`capitalize ${
//               task.status === "Completed"
//                 ? "bg-green-100 text-green-800"
//                 : task.status === "In Progress"
//                   ? "bg-blue-100 text-blue-800"
//                   : "bg-gray-100 text-gray-800"
//             }`}
//           >
//             {task.status || "N/A"}
//           </Badge>
//         </div>

//         {/* Task Created By */}
//         <div>
//           <p className="text-sm text-gray-500">Created By</p>
//           <p className="text-lg font-medium text-gray-900">
//             {task.createdBy?.full_name || "N/A"}
//           </p>
//         </div>

//         {/* Description */}
//         <div className="col-span-2">
//           <p className="text-sm text-gray-500">Description</p>
//           <p className="text-lg font-medium text-gray-900">
//             {task.description || "N/A"}
//           </p>
//         </div>

//         {/* Comments/Notes */}
//         {task.comments && (
//           <div className="col-span-2">
//             <p className="text-sm text-gray-500">Comments/Notes</p>
//             <p className="text-lg font-medium text-gray-900">
//               {task.comments || "N/A"}
//             </p>
//           </div>
//         )}

//         {/* Attachments */}
//         {(task?.attachments as [])?.length > 0 && (
//           <div className="col-span-2">
//             <p className="text-sm text-gray-500 mb-4">Attachments</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {(task.attachments as []).map(
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
"use client";

import { useState, useEffect } from "react";
import { Drawer, Button, Text } from "rizzui";
import { MdClose, MdEdit, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import TaskForm from "../create-edit/form";
import { FormProvider, useForm } from "react-hook-form";
import {
  TaskManagementSchema,
  taskManagementSchema,
} from "@/validators/taskmanagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import taskService from "@/services/taskManagementService";
import FormFooter from "@core/components/form-footer";
import dayjs from "dayjs";
import WidgetCard from "@core/components/cards/widget-card";
import DeleteConfirmModal from "@core/components/DeleteConfirmModal";

export default function TaskDetailsDrawer({
  task,
  open,
  onClose,
  onUpdated,
}: {
  task: any;
  open: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [filePreviews, setFilePreviews] = useState<
    Record<string, File[] | string[]>
  >({
    attachments: task.attachments || [],
  });

  const methods = useForm<TaskManagementSchema>({
    resolver: zodResolver(taskManagementSchema),
    defaultValues: task,
  });

  useEffect(() => {
    if (task) {
      methods.reset({ ...task, assignedTo: task?.assignedTo?._id });
      setFilePreviews({
        attachments: task.attachments || [],
      });
    }
  }, [task]);

  const handleSubmit = async (data: TaskManagementSchema) => {
    setIsLoading(true);
    try {
      await taskService.edit(task._id, data);
      toast.success("Task updated successfully.");
      onClose();
      onUpdated?.();
    } catch (error) {
      toast.error("Failed to update task.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDrawer = () => {
    setIsEditing(false);
    onClose();
  };

  const handleDelete = async () => {
    try {
      toast.loading("Deleting task...");
      await taskService.delete(task._id);
      toast.dismiss();
      toast.success(`Task ${task.title} deleted successfully.`);
      setDeleteOpen(false);
      onClose();
      onUpdated?.();
    } catch {
      toast.dismiss();
      toast.error("Failed to delete task.");
    }
  };

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      overlayClassName="backdrop-blur"
      containerClassName="w-full sm:!max-w-[calc(100%-480px)] !shadow-2xl z-[999]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Task Details
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
            onConfirm={handleDelete}
            loading={isLoading}
            title="Delete Task"
            description={`Are you sure you want to delete ${task.title}?`}
          />

          <Button
            size="sm"
            variant="outline"
            onClick={() => setDeleteOpen(true)}
          >
            <MdDelete className="me-1" /> Delete
          </Button>

          <Button size="sm" variant="outline" onClick={handleCloseDrawer}>
            <MdClose className="w-5 h-5" /> Close
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        {isEditing ? (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <TaskForm
                filePreviews={filePreviews}
                setFilePreviews={setFilePreviews}
              />
              <FormFooter submitBtnText="Update Task" isLoading={isLoading} />
            </form>
          </FormProvider>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <WidgetCard title="Task Info">
              <br />
              <InfoGrid
                items={[
                  { label: "Task Title", value: task.title },
                  {
                    label: "Assigned To",
                    value: task.assignedTo?.full_name || "N/A",
                  },
                  { label: "Priority", value: task.priority },
                  {
                    label: "Due Date",
                    value: formatDate(task.dueDate),
                  },
                  { label: "Status", value: task.status },
                  {
                    label: "Created By",
                    value: task.createdBy?.full_name || "N/A",
                  },
                ]}
              />
            </WidgetCard>

            <WidgetCard title="Description">
              <br />
              <Text className="text-sm text-gray-700 whitespace-pre-line">
                {task.description || "No description provided."}
              </Text>
            </WidgetCard>

            {task.comments && (
              <WidgetCard title="Comments">
                <br />
                <Text className="text-sm text-gray-700 whitespace-pre-line">
                  {task.comments}
                </Text>
              </WidgetCard>
            )}

            {/* {Array.isArray(task.attachments) && task.attachments.length > 0 && (
              <WidgetCard title="Attachments">
                <br />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {task.attachments.map((attachment: string, index: number) => {
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
                              <span className="text-sm font-medium">File</span>
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
                  })}
                </div>
              </WidgetCard>
            )} */}
          </div>
        )}
      </div>
    </Drawer>
  );
}

function InfoGrid({
  items,
}: {
  items: { label: string; value?: string | number }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map(({ label, value }) => (
        <div key={label} className="text-sm">
          <p className="text-gray-500 font-medium text-xs mb-1">{label}</p>
          <p className="text-gray-900 font-semibold break-words">
            {value || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}

function formatDate(dateString: string) {
  return dateString ? dayjs(dateString).format("DD-MMM-YYYY") : "N/A";
}
