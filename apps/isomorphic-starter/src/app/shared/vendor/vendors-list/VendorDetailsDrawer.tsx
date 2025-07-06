// "use client";

// import { useState } from "react";
// import { Button, Drawer, Text, Badge } from "rizzui";
// import { MdClose, MdDelete, MdEdit } from "react-icons/md";
// import dayjs from "dayjs";
// import toast from "react-hot-toast";
// import DeleteConfirmModal from "@core/components/DeleteConfirmModal";
// import vendorService from "@/services/vendorService";
// import WidgetCard from "@core/components/cards/widget-card";

// export default function VendorDetailsDrawer({
//   vendor,
//   open,
//   onClose,
//   onDeleted,
//   setEditOpen,
// }: {
//   vendor: any;
//   open: boolean;
//   onClose: () => void;
//   onDeleted?: () => void;
//   setEditOpen: (arg: boolean) => void;
// }) {
//   const [deleting, setDeleting] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);

//   const handleDelete = async () => {
//     try {
//       setDeleting(true);
//       toast.loading("Deleting vendor...");
//       await vendorService.delete(vendor._id);
//       toast.dismiss();
//       toast.success("Vendor deleted successfully.");
//       onClose();
//       if (onDeleted) onDeleted();
//     } catch {
//       toast.dismiss();
//       toast.error("Failed to delete vendor.");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <Drawer
//       isOpen={open}
//       onClose={onClose}
//       overlayClassName="backdrop-blur"
//       containerClassName="!max-w-[calc(100%-480px)] !shadow-2xl z-[999]"
//     >
//       <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//           Vendor Details
//         </h2>
//         <div className="flex items-center gap-2">
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={() => {
//               setEditOpen(true);
//               onClose();
//             }}
//           >
//             <MdEdit className="me-1" /> Edit
//           </Button>
//           <DeleteConfirmModal
//             isOpen={deleteOpen}
//             onClose={() => setDeleteOpen(false)}
//             onConfirm={handleDelete}
//             loading={deleting}
//             title="Delete Vendor"
//             description={`Are you sure you want to delete ${vendor.vendor_name}?`}
//           />
//           <Button
//             size="sm"
//             color="danger"
//             variant="outline"
//             onClick={() => setDeleteOpen(true)}
//           >
//             <MdDelete className="me-1" /> Delete
//           </Button>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <MdClose className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <div className="p-4 overflow-y-auto overflow-x-auto max-w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <WidgetCard title="General Info">
//             <InfoGrid
//               items={[
//                 { label: "Vendor Name", value: vendor.vendor_name },
//                 { label: "Contact Person", value: vendor.contact_person },
//                 { label: "Phone Number", value: vendor.phone_number },
//                 { label: "Email", value: vendor.email },
//                 {
//                   label: "Vendor Type",
//                   value: (
//                     <Badge className="capitalize bg-blue-100 text-blue-800">
//                       {vendor.vendor_type}
//                     </Badge>
//                   ),
//                 },
//                 {
//                   label: "Assigned To",
//                   value: vendor.assigned_to?.full_name || "N/A",
//                 },
//               ]}
//             />
//           </WidgetCard>

//           <WidgetCard title="Address">
//             <InfoGrid
//               items={[
//                 { label: "Street", value: vendor.address?.street },
//                 { label: "City", value: vendor.address?.city },
//                 { label: "State", value: vendor.address?.state },
//                 { label: "Postal Code", value: vendor.address?.postal_code },
//                 { label: "Country", value: vendor.address?.country },
//               ]}
//             />
//           </WidgetCard>

//           {vendor.services_offered?.length > 0 && (
//             <WidgetCard title="Services Offered">
//               <ul className="list-disc list-inside text-sm text-gray-700">
//                 {vendor.services_offered.map((service: string, i: number) => (
//                   <li key={i}>{service}</li>
//                 ))}
//               </ul>
//             </WidgetCard>
//           )}

//           {vendor.notes && (
//             <WidgetCard title="Notes">
//               <Text className="text-sm text-gray-700 whitespace-pre-line">
//                 {vendor.notes}
//               </Text>
//             </WidgetCard>
//           )}

//           {vendor.attachments?.length > 0 && (
//             <WidgetCard title="Attachments">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {vendor.attachments.map((attachment: any, index: number) => {
//                   const isImage = /\.(jpg|jpeg|png|gif)$/i.test(
//                     attachment.file_url
//                   );
//                   return (
//                     <div
//                       key={index}
//                       className="p-4 bg-gray-50 border rounded-lg shadow-sm"
//                     >
//                       <div className="flex items-center justify-center h-32 w-full border rounded">
//                         {isImage ? (
//                           <img
//                             src={attachment.file_url}
//                             alt=""
//                             className="object-cover w-full h-full"
//                           />
//                         ) : (
//                           <span className="text-gray-500">File</span>
//                         )}
//                       </div>
//                       <p className="mt-2 text-sm truncate">
//                         {attachment.file_name}
//                       </p>
//                       <div className="mt-1 flex gap-2 text-sm">
//                         <a
//                           href={attachment.file_url}
//                           target="_blank"
//                           className="text-blue-600"
//                         >
//                           View
//                         </a>
//                         <a
//                           href={attachment.file_url}
//                           download
//                           className="text-gray-600"
//                         >
//                           Download
//                         </a>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </WidgetCard>
//           )}
//         </div>
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
//             {value || "N/A"}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button, Drawer, Text, Badge } from "rizzui";
import { MdClose, MdEdit } from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import DeleteConfirmModal from "@core/components/DeleteConfirmModal";
import vendorService from "@/services/vendorService";
import WidgetCard from "@core/components/cards/widget-card";
import VendorForm from "../create-edit/form";
import FormFooter from "@core/components/form-footer";
import { VendorSchema, vendorSchema } from "@/validators/vendor.schema";

export default function VendorDetailsDrawer({
  vendor,
  open,
  onClose,
  onDeleted,
  onUpdated,
}: {
  vendor: any;
  open: boolean;
  onClose: () => void;
  onDeleted?: () => void;
  onUpdated?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [filePreviews, setFilePreviews] = useState<
    Record<string, File[] | string[]>
  >({
    attachments: vendor?.attachments || [],
  });

  const methods = useForm<VendorSchema>({
    resolver: zodResolver(vendorSchema),
    defaultValues: vendor,
  });

  useEffect(() => {
    if (vendor) {
      methods.reset(vendor);
      setFilePreviews({ attachments: vendor.attachments || [] });
    }
  }, [vendor]);

  const handleSubmit = async (data: VendorSchema) => {
    setIsLoading(true);
    try {
      await vendorService.edit(vendor._id, data);
      toast.success("Vendor updated successfully.");
      onUpdated?.();
      onClose();
    } catch (error) {
      toast.error("Failed to update vendor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      toast.loading("Deleting vendor...");
      await vendorService.delete(vendor._id);
      toast.dismiss();
      toast.success("Vendor deleted successfully.");
      onClose();
      onDeleted?.();
    } catch {
      toast.dismiss();
      toast.error("Failed to delete vendor.");
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
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Vendor Details
        </h2>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              ← Back to Details
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <MdEdit className="me-1" /> Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                variant="outline"
                onClick={() => setDeleteOpen(true)}
              >
                Delete
              </Button>
            </>
          )}
          <DeleteConfirmModal
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={handleDelete}
            loading={isLoading}
            title="Delete Vendor"
            description={`Are you sure you want to delete ${vendor.vendor_name}?`}
          />
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        {isEditing ? (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <VendorForm
                filePreviews={filePreviews}
                setFilePreviews={setFilePreviews}
              />
              <FormFooter submitBtnText="Update Vendor" isLoading={isLoading} />
            </form>
          </FormProvider>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <WidgetCard title="General Info">
              <br />
              <InfoGrid
                items={[
                  { label: "Vendor Name", value: vendor.vendor_name },
                  { label: "Contact Person", value: vendor.contact_person },
                  { label: "Phone Number", value: vendor.phone_number },
                  { label: "Email", value: vendor.email },
                  {
                    label: "Vendor Type",
                    value: (
                      <Badge className="capitalize bg-blue-100 text-blue-800">
                        {vendor.vendor_type}
                      </Badge>
                    ),
                  },
                  {
                    label: "Assigned To",
                    value: vendor.assigned_to?.full_name || "N/A",
                  },
                ]}
              />
            </WidgetCard>

            <WidgetCard title="Address">
              <br />
              <InfoGrid
                items={[
                  { label: "Street", value: vendor.address?.street },
                  { label: "City", value: vendor.address?.city },
                  { label: "State", value: vendor.address?.state },
                  { label: "Postal Code", value: vendor.address?.postal_code },
                  { label: "Country", value: vendor.address?.country },
                ]}
              />
            </WidgetCard>

            {vendor.services_offered?.length > 0 && (
              <WidgetCard title="Services Offered">
                <br />
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {vendor.services_offered.map((service: string, i: number) => (
                    <li key={i}>{service}</li>
                  ))}
                </ul>
              </WidgetCard>
            )}

            {vendor.notes && (
              <WidgetCard title="Notes">
                <br />
                <Text className="text-sm text-gray-700 whitespace-pre-line">
                  {vendor.notes}
                </Text>
              </WidgetCard>
            )}

            {vendor.attachments?.length > 0 && (
              <WidgetCard title="Attachments">
                <br />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendor.attachments.map((attachment: any, index: number) => {
                    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(
                      attachment.file_url
                    );
                    return (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 border rounded-lg shadow-sm"
                      >
                        <div className="flex items-center justify-center h-32 w-full border rounded">
                          {isImage ? (
                            <img
                              src={attachment.file_url}
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="text-gray-500">File</span>
                          )}
                        </div>
                        <p className="mt-2 text-sm truncate">
                          {attachment.file_name}
                        </p>
                        <div className="mt-1 flex gap-2 text-sm">
                          <a
                            href={attachment.file_url}
                            target="_blank"
                            className="text-blue-600"
                          >
                            View
                          </a>
                          <a
                            href={attachment.file_url}
                            download
                            className="text-gray-600"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    );
                  })}
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
