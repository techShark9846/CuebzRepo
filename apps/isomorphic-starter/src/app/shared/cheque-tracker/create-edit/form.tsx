// "use client";

// import { useFormContext } from "react-hook-form";
// import { ActionIcon, Input, Select, Textarea } from "rizzui";
// import { DatePicker } from "@core/ui/datepicker";
// import Upload from "@core/ui/upload";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { PiTrashBold } from "react-icons/pi";
// import employeeService from "@/services/employeeService";

// export default function TaskForm({ filePreviews, setFilePreviews }: any) {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const [employeeOptions, setEmployeeOptions] = useState([]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await employeeService.getList();
//         const options = response.data.map((employee: any) => ({
//           value: employee._id,
//           label: employee.full_name,
//         }));
//         setEmployeeOptions(options);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handlePreviewClick = (file: File | string | null) => {
//     if (!file) return;
//     const fileUrl = typeof file === "string" ? file : URL.createObjectURL(file);
//     window.open(fileUrl, "_blank");
//   };

//   const renderMultipleFilePreviews = (
//     files: (File | string)[] | null,
//     fieldName: string
//   ) => {
//     if (!files || files.length === 0) return null;

//     return files.map((file, index) => {
//       const isUrl = typeof file === "string";
//       const fileUrl = isUrl ? file : URL.createObjectURL(file);

//       return (
//         <div
//           key={`${fieldName}-${index}`}
//           className="flex items-center min-h-[58px] rounded-xl border px-3 border-muted dark:border-gray-300 mt-2"
//         >
//           <div
//             className="relative flex items-center justify-center h-10 w-10 overflow-hidden rounded-lg border bg-gray-50 dark:bg-transparent cursor-pointer"
//             onClick={() => window.open(fileUrl, "_blank")}
//           >
//             {isUrl ? (
//               <Image
//                 src={fileUrl}
//                 alt={`${fieldName}-${index}`}
//                 className="object-contain"
//                 fill
//               />
//             ) : (
//               <span className="text-gray-600 font-medium">
//                 {typeof file === "string" ? "File" : file.name}
//               </span>
//             )}
//           </div>
//           <div
//             className="truncate px-2.5 text-sm font-medium cursor-pointer"
//             onClick={() => window.open(fileUrl, "_blank")}
//           >
//             {typeof file === "string" ? file.split("/").pop() : file.name}
//           </div>
//           <div className="flex items-center ms-auto gap-2">
//             {/* Delete File */}
//             <ActionIcon
//               onClick={() => handleFileDelete(fieldName, index)}
//               size="sm"
//               variant="flat"
//               color="danger"
//             >
//               <PiTrashBold className="w-5 h-5" />
//             </ActionIcon>
//           </div>
//         </div>
//       );
//     });
//   };

//   const handleFileUpload = (
//     name: string,
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const fileList = event.target.files;
//     if (fileList && fileList.length > 0) {
//       setValue(name, [...(watch(name) || []), ...Array.from(fileList)]); // Add files to the form value
//       setFilePreviews((prev: any) => ({
//         ...prev,
//         [name]: [...(prev[name] || []), ...Array.from(fileList)], // Update preview with new files
//       }));
//     }
//   };

//   const handleFileDelete = (fieldName: string, index: number) => {
//     const updatedFiles = [...(watch(fieldName) || [])];
//     updatedFiles.splice(index, 1); // Remove the specific file
//     setValue(fieldName, updatedFiles); // Update the form value
//     setFilePreviews((prev: any) => ({
//       ...prev,
//       [fieldName]: updatedFiles, // Update preview
//     }));
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h3 className="text-lg font-semibold mb-4">Task Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Task Title */}
//           <Input
//             label="Task Title"
//             placeholder="Enter task title"
//             {...register("title")}
//             error={errors.title?.message?.toString()}
//           />

//           {/* Assigned To */}
//           <Select
//             label="Assigned To"
//             placeholder="Select employee"
//             options={employeeOptions}
//             value={
//               employeeOptions.find(
//                 (option: any) => option.value === watch("assignedTo")
//               ) || null
//             }
//             onChange={(selected: any) =>
//               setValue("assignedTo", selected?.value || "")
//             }
//             error={errors.assignedTo?.message?.toString()}
//             searchable
//           />

//           {/* Priority */}
//           <Select
//             label="Priority"
//             placeholder="Select priority"
//             options={[
//               { value: "High", label: "High" },
//               { value: "Medium", label: "Medium" },
//               { value: "Low", label: "Low" },
//             ]}
//             value={
//               watch("priority")
//                 ? { value: watch("priority"), label: watch("priority") }
//                 : null
//             }
//             onChange={(option: any) =>
//               setValue("priority", option?.value || "Medium")
//             }
//             error={errors.priority?.message?.toString()}
//           />

//           {/* Due Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Due Date
//             </label>
//             <DatePicker
//               selected={watch("dueDate") ? new Date(watch("dueDate")) : null}
//               onChange={(date: Date | null) =>
//                 setValue("dueDate", date ? date.toISOString() : null)
//               }
//               placeholderText="Select due date"
//               dateFormat="dd-MMM-yyyy"
//               className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//             {errors.dueDate && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.dueDate.message?.toString()}
//               </p>
//             )}
//           </div>

//           {/* Status */}
//           <Select
//             label="Status"
//             placeholder="Select status"
//             options={[
//               { value: "Pending", label: "Pending" },
//               { value: "In Progress", label: "In Progress" },
//               { value: "Completed", label: "Completed" },
//             ]}
//             value={
//               watch("status")
//                 ? { value: watch("status"), label: watch("status") }
//                 : null
//             }
//             onChange={(option: any) =>
//               setValue("status", option?.value || "Pending")
//             }
//             error={errors.status?.message?.toString()}
//           />
//         </div>
//       </div>

//       <hr className="my-8 border-gray-300" />

//       {/* Task Description */}
//       <Textarea
//         label="Task Description"
//         placeholder="Enter task description"
//         {...register("description")}
//         error={errors.description?.message?.toString()}
//       />

//       {/* Attachments */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Attachments
//         </label>
//         <Upload
//           accept="imgAndPdf"
//           placeholderText="Upload attachments"
//           onChange={(e) => handleFileUpload("attachments", e)}
//           className="mb-6 min-h-[280px] justify-center border-dashed bg-gray-50 dark:bg-transparent"
//           multiple
//         />
//         {errors.attachments && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.attachments.message?.toString()}
//           </p>
//         )}
//         {renderMultipleFilePreviews(filePreviews.attachments, "attachments")}
//       </div>
//     </div>
//   );
// }
"use client";

import { useFormContext } from "react-hook-form";
import { ActionIcon, Input, Select, Textarea } from "rizzui";
import { DatePicker } from "@core/ui/datepicker";
import Upload from "@core/ui/upload";
import { useState } from "react";
import Image from "next/image";
import { PiTrashBold } from "react-icons/pi";

export default function ChequeTrackerForm({
  filePreviews,
  setFilePreviews,
}: any) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const handleFileUpload = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setValue(name, [...(watch(name) || []), ...Array.from(fileList)]);
      setFilePreviews((prev: any) => ({
        ...prev,
        [name]: [...(prev[name] || []), ...Array.from(fileList)],
      }));
    }
  };

  const handleFileDelete = (fieldName: string, index: number) => {
    const updatedFiles = [...(watch(fieldName) || [])];
    updatedFiles.splice(index, 1);
    setValue(fieldName, updatedFiles);
    setFilePreviews((prev: any) => ({
      ...prev,
      [fieldName]: updatedFiles,
    }));
  };

  const renderMultipleFilePreviews = (
    files: (File | string)[] | null,
    fieldName: string
  ) => {
    if (!files || files.length === 0) return null;

    return files.map((file, index) => {
      const isUrl = typeof file === "string";
      const fileUrl = isUrl ? file : URL.createObjectURL(file);

      return (
        <div
          key={`${fieldName}-${index}`}
          className="flex items-center min-h-[58px] rounded-xl border px-3 border-muted dark:border-gray-300 mt-2"
        >
          <div
            className="relative flex items-center justify-center h-10 w-10 overflow-hidden rounded-lg border bg-gray-50 dark:bg-transparent cursor-pointer"
            onClick={() => window.open(fileUrl, "_blank")}
          >
            {isUrl ? (
              <Image
                src={fileUrl}
                alt={`${fieldName}-${index}`}
                className="object-contain"
                fill
              />
            ) : (
              <span className="text-gray-600 font-medium">
                {typeof file === "string" ? "File" : file.name}
              </span>
            )}
          </div>
          <div
            className="truncate px-2.5 text-sm font-medium cursor-pointer"
            onClick={() => window.open(fileUrl, "_blank")}
          >
            {typeof file === "string" ? file.split("/").pop() : file.name}
          </div>
          <div className="flex items-center ms-auto gap-2">
            <ActionIcon
              onClick={() => handleFileDelete(fieldName, index)}
              size="sm"
              variant="flat"
              color="danger"
            >
              <PiTrashBold className="w-5 h-5" />
            </ActionIcon>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Cheque Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cheque Number */}
          <Input
            label="Cheque Number"
            placeholder="Enter cheque number"
            {...register("cheque_number")}
            error={errors.cheque_number?.message?.toString()}
          />

          {/* Cheque Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cheque Date
            </label>
            <DatePicker
              selected={
                watch("cheque_date") ? new Date(watch("cheque_date")) : null
              }
              onChange={(date: Date | null) =>
                setValue("cheque_date", date ? date.toISOString() : null)
              }
              placeholderText="Select cheque date"
              dateFormat="dd-MMM-yyyy"
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.cheque_date && (
              <p className="mt-1 text-sm text-red-600">
                {errors.cheque_date.message?.toString()}
              </p>
            )}
          </div>

          <Select
            label="Cheque Type"
            placeholder="Select cheque type"
            options={[
              { value: "Incoming", label: "Incoming" },
              { value: "Outgoing", label: "Outgoing" },
            ]}
            value={
              watch("cheque_type")
                ? { value: watch("cheque_type"), label: watch("cheque_type") }
                : null
            }
            onChange={(option: any) =>
              setValue("cheque_type", option?.value || "Incoming")
            }
            error={errors.cheque_type?.message?.toString()}
          />

          {/* Amount */}
          <Input
            label="Amount (AED)"
            placeholder="Enter amount"
            type="number"
            {...register("amount", { valueAsNumber: true })}
            error={errors.amount?.message?.toString()}
          />

          {/* Bank Name */}
          <Input
            label="Bank Name"
            placeholder="Enter bank name"
            {...register("bank_name")}
            error={errors.bank_name?.message?.toString()}
          />

          {watch("cheque_type") === "Outgoing" && (
            <Input
              label="Payee Name"
              placeholder="Enter payee name"
              {...register("payee_name")}
              error={errors.payee_name?.message?.toString()}
            />
          )}

          {watch("cheque_type") === "Incoming" && (
            <Input
              label="Payer Name"
              placeholder="Enter payer name"
              {...register("payeer_name")}
              error={errors.payeer_name?.message?.toString()}
            />
          )}

          {/* Payee Name */}
          {/* <Input
            label="Payee Name"
            placeholder="Enter payee name"
            {...register("payee_name")}
            error={errors.payee_name?.message?.toString()}
          /> */}

          {/* Payer Name */}
          {/* <Input
            label="Payer Name"
            placeholder="Enter payer name"
            {...register("payeer_name")}
            error={errors.payeer_name?.message?.toString()}
          /> */}

          {/* Purpose */}
          <Input
            label="Purpose"
            placeholder="Enter purpose"
            {...register("purpose")}
            error={errors.purpose?.message?.toString()}
          />

          {/* Cheque Status */}
          <Select
            label="Cheque Status"
            placeholder="Select status"
            options={[
              { value: "Issued", label: "Issued" },
              { value: "Received", label: "Received" },
              { value: "Cleared", label: "Cleared" },
              { value: "Bounced", label: "Bounced" },
            ]}
            value={
              watch("cheque_status")
                ? {
                    value: watch("cheque_status"),
                    label: watch("cheque_status"),
                  }
                : null
            }
            onChange={(option: any) =>
              setValue("cheque_status", option?.value || "Issued")
            }
            error={errors.cheque_status?.message?.toString()}
          />

          {/* Reminder Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reminder Date
            </label>
            <DatePicker
              selected={
                watch("reminder_date") ? new Date(watch("reminder_date")) : null
              }
              onChange={(date: Date | null) =>
                setValue("reminder_date", date ? date.toISOString() : null)
              }
              placeholderText="Select reminder date"
              dateFormat="dd-MMM-yyyy"
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.reminder_date && (
              <p className="mt-1 text-sm text-red-600">
                {errors.reminder_date.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Additional Notes */}
      <Textarea
        label="Additional Notes"
        placeholder="Enter any additional notes"
        {...register("additional_notes")}
        error={errors.additional_notes?.message?.toString()}
      />
    </div>
  );
}

{
  /* Attachments */
}
{
  /* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachments
        </label>
        <Upload
          accept="imgAndPdf"
          placeholderText="Upload attachments"
          onChange={(e) => handleFileUpload("attachments", e)}
          className="mb-6 min-h-[280px] justify-center border-dashed bg-gray-50 dark:bg-transparent"
          multiple
        />
        {errors.attachments && (
          <p className="mt-1 text-sm text-red-600">
            {errors.attachments.message?.toString()}
          </p>
        )}
        {renderMultipleFilePreviews(filePreviews.attachments, "attachments")}
      </div> */
}
