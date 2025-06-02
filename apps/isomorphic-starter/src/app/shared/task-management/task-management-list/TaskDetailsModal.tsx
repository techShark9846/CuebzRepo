"use client";

import React from "react";
import { Box, Flex, Badge, ActionIcon } from "rizzui";
import { PiXBold } from "react-icons/pi";
import dayjs from "dayjs";
import { TaskType } from "@/types/taskTypes";

type TaskDetailsModalProps = {
  task: TaskType;
  closeModal?: () => void;
};

export default function TaskDetailsModal({
  task,
  closeModal,
}: TaskDetailsModalProps) {
  return (
    <Box className="p-6 space-y-6 rounded-lg bg-white shadow-md">
      {/* Header */}
      <Flex justify="between" align="center" className="border-b pb-4">
        <h2 className="text-xl font-semibold">Task Details</h2>
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
        {/* Task Title */}
        <div>
          <p className="text-sm text-gray-500">Task Title</p>
          <p className="text-lg font-medium text-gray-900">
            {task.title || "N/A"}
          </p>
        </div>

        {/* Assigned To */}
        <div>
          <p className="text-sm text-gray-500">Assigned To</p>
          <p className="text-lg font-medium text-gray-900">
            {task.assignedTo?.full_name || "N/A"}
          </p>
        </div>

        {/* Priority */}
        <div>
          <p className="text-sm text-gray-500">Priority</p>
          <Badge
            className={`capitalize ${
              task.priority === "High"
                ? "bg-red-100 text-red-800"
                : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
            }`}
          >
            {task.priority || "N/A"}
          </Badge>
        </div>

        {/* Due Date */}
        <div>
          <p className="text-sm text-gray-500">Due Date</p>
          <p className="text-lg font-medium text-gray-900">
            {dayjs(task.dueDate).isValid()
              ? dayjs(task.dueDate).format("DD-MMM-YYYY")
              : "N/A"}
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge
            className={`capitalize ${
              task.status === "Completed"
                ? "bg-green-100 text-green-800"
                : task.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {task.status || "N/A"}
          </Badge>
        </div>

        {/* Task Created By */}
        <div>
          <p className="text-sm text-gray-500">Created By</p>
          <p className="text-lg font-medium text-gray-900">
            {task.createdBy?.full_name || "N/A"}
          </p>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-lg font-medium text-gray-900">
            {task.description || "N/A"}
          </p>
        </div>

        {/* Comments/Notes */}
        {task.comments && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Comments/Notes</p>
            <p className="text-lg font-medium text-gray-900">
              {task.comments || "N/A"}
            </p>
          </div>
        )}

        {/* Attachments */}
        {(task?.attachments as [])?.length > 0 && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500 mb-4">Attachments</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(task.attachments as []).map(
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
