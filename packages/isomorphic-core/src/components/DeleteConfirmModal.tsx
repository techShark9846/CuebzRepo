"use client";

import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "rizzui";
import { MdWarning } from "react-icons/md";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item?",
  loading = false,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 bg-black/30 z-[1000] flex items-center justify-center px-4">
        <Dialog.Panel className="w-full max-w-sm bg-white rounded-lg shadow-xl dark:bg-gray-900 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="text-red-500 text-2xl">
              <MdWarning />
            </div>
            <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </Dialog.Title>
          </div>
          <Dialog.Description className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </Dialog.Description>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={onConfirm}
              isLoading={loading}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
