"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import WidgetCard from "@core/components/cards/widget-card";
import { Button, Drawer, Text } from "rizzui";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@core/components/DeleteConfirmModal";
import customerService from "@/services/customerService";

export default function CustomerDetailsDrawer({
  customer,
  open,
  onClose,
  onDeleted,
  setEditOpen,
}: {
  customer: any;
  open: boolean;
  onClose: () => void;
  onDeleted?: () => void;
  setEditOpen: (arg: boolean) => void;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      toast.loading("Deleting customer...");
      await customerService.delete(customer._id);
      toast.dismiss();
      toast.success("Customer deleted successfully.");
      onClose();
      if (onDeleted) onDeleted();
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to delete customer.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      overlayClassName="backdrop-blur"
      containerClassName="!max-w-[calc(100%-480px)] !shadow-2xl z-[999]"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Customer Details
        </h2>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={
              () => {
                setEditOpen(true);
                onClose();
              }
              // router.push(
              //   `/tenant/customers-vendors/customer/${customer._id}/edit`
              // )
            }
          >
            <MdEdit className="me-1" />
            Edit
          </Button>

          <DeleteConfirmModal
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={async () => {
              try {
                setDeleting(true);
                toast.loading("Deleting customer...");
                await customerService.delete(customer._id);
                toast.dismiss();
                toast.success(
                  `Customer ${customer.full_name} deleted successfully.`
                );
                setDeleteOpen(false);
                onClose();
                if (onDeleted) onDeleted();
              } catch {
                toast.dismiss();
                toast.error("Failed to delete customer.");
              } finally {
                setDeleting(false);
              }
            }}
            loading={deleting}
            title="Delete Customer"
            description={`Are you sure you want to delete ${customer.full_name}?`}
          />
          <Button
            size="sm"
            color="danger"
            variant="outline"
            onClick={() => setDeleteOpen(true)}
          >
            <MdDelete className="me-1" />
            Delete
          </Button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 overflow-y-auto overflow-x-auto max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WidgetCard title="Personal Info">
            <br />
            <InfoGrid
              items={[
                { label: "Full Name", value: customer.full_name },
                { label: "Email", value: customer.email },
                { label: "Phone Number", value: customer.phone_number },
                {
                  label: "Date of Birth",
                  value: formatDate(customer.date_of_birth),
                },
                { label: "Customer Type", value: customer.customer_type },
                {
                  label: "Assigned To",
                  value: customer.assigned_to?.full_name || "N/A",
                },
              ]}
            />
          </WidgetCard>

          <WidgetCard title="Address">
            <br />
            <InfoGrid
              items={[
                { label: "Street", value: customer.address?.street },
                { label: "City", value: customer.address?.city },
                { label: "State", value: customer.address?.state },
                { label: "Postal Code", value: customer.address?.postal_code },
                { label: "Country", value: customer.address?.country },
              ]}
            />
          </WidgetCard>

          <WidgetCard title="Metadata">
            <br />
            <InfoGrid
              items={[
                { label: "Created By", value: customer.createdBy?.name },
                { label: "Created At", value: formatDate(customer.createdAt) },
                { label: "Updated At", value: formatDate(customer.updatedAt) },
              ]}
            />
          </WidgetCard>

          <WidgetCard title="Notes">
            <Text className="text-sm text-gray-700 whitespace-pre-line">
              {customer.notes || "No notes available."}
            </Text>
          </WidgetCard>
        </div>
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
