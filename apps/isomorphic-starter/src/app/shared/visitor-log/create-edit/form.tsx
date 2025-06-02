// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, Select, Textarea } from "rizzui";
// import { defaultValues } from "./form-utils";
// import visitorLogService from "@/services/visitorLogService";
// import toast from "react-hot-toast";

// // TODO: Date picker

// type VisitorLogFormProps = {
//   visitor?: any;
//   onSuccess?: () => void;
// };

// export default function VisitorLogForm({
//   visitor,
//   onSuccess,
// }: VisitorLogFormProps) {
//   const [loading, setLoading] = useState(false);
//   const { register, handleSubmit, setValue, watch, reset } = useForm({
//     defaultValues: defaultValues(visitor),
//   });

//   const onSubmit = async (data: any) => {
//     setLoading(true);
//     try {
//       if (visitor?._id) {
//         await visitorLogService.edit(visitor._id, data);
//         toast.success("Visitor log updated successfully!");
//       } else {
//         await visitorLogService.create(data);
//         toast.success("Visitor log created successfully!");
//       }
//       //   onSuccess();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Failed to save visitor log. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Visitor Name */}
//       <Input
//         label="Visitor Name"
//         placeholder="Enter Visitor Name"
//         {...register("visitor_name", { required: "Visitor name is required." })}
//       />

//       {/* Visitor Company */}
//       <Input
//         label="Visitor Company"
//         placeholder="Enter Visitor Company"
//         {...register("visitor_company", {
//           required: "Visitor company is required.",
//         })}
//       />

//       {/* Visitor Type */}
//       <Select
//         label="Visitor Type"
//         placeholder="Select Visitor Type"
//         value={watch("visitor_type") || null} // Set default value to null if undefined
//         onChange={(selectedOption) =>
//           setValue("visitor_type", selectedOption?.value)
//         } // Update form value
//         options={[
//           { value: "Customer", label: "Customer" },
//           { value: "Vendor", label: "Vendor" },
//           { value: "Interview", label: "Interview" },
//           { value: "Other", label: "Other" },
//         ]}
//         // error={errors.visitor_type?.message} // Display validation error
//       />

//       {/* Visitor Contact Number */}
//       <Input
//         label="Visitor Contact Number"
//         placeholder="Enter Contact Number"
//         type="tel"
//         {...register("visitor_contact_number", {
//           required: "Contact number is required.",
//         })}
//       />

//       {/* Purpose of Visit */}
//       <Textarea
//         label="Purpose of Visit"
//         placeholder="Enter Purpose of Visit"
//         {...register("purpose_of_visit", {
//           required: "Purpose of visit is required.",
//         })}
//       />

//       {/* Person Visiting */}
//       <Input
//         label="Person Visiting (Employee Name)"
//         placeholder="Enter Employee Name"
//         {...register("person_visiting")}
//       />

//       {/* Comments */}
//       <Textarea
//         label="Comments/Notes"
//         placeholder="Enter Comments (if any)"
//         {...register("comments")}
//       />
//     </form>
//   );
// }

// import { useFormContext } from "react-hook-form";
// import { Input, Select, Textarea } from "rizzui";

// export default function Form() {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="grid gap-6">
//       <Input
//         label="Visitor Name"
//         placeholder="Enter visitor name"
//         {...register("visitor_name")}
//         error={errors.visitor_name?.message}
//       />

//       <Input
//         label="Visitor Company"
//         placeholder="Enter visitor company"
//         {...register("visitor_company")}
//         error={errors.visitor_company?.message}
//       />

//       <Select
//         label="Visitor Type"
//         placeholder="Select visitor type"
//         options={[
//           { value: "Customer", label: "Customer" },
//           { value: "Vendor", label: "Vendor" },
//           { value: "Interview", label: "Interview" },
//           { value: "Other", label: "Other" },
//         ]}
//         value={watch("visitor_type")}
//         onChange={(option) => setValue("visitor_type", option?.value || "")}
//         error={errors.visitor_type?.message}
//       />

//       <Input
//         label="Visitor Contact Number"
//         placeholder="Enter contact number"
//         type="tel"
//         {...register("visitor_contact_number")}
//         error={errors.visitor_contact_number?.message}
//       />

//       <Textarea
//         label="Purpose of Visit"
//         placeholder="Enter purpose of visit"
//         {...register("purpose_of_visit")}
//         error={errors.purpose_of_visit?.message}
//       />

//       <Input
//         label="Person Visiting (Employee Name)"
//         placeholder="Enter employee name"
//         {...register("person_visiting")}
//         error={errors.person_visiting?.message}
//       />

//       <Select
//         label="Status"
//         placeholder="Select status"
//         options={[
//           { value: "Positive Intention", label: "Positive Intention" },
//           { value: "Neutral Intention", label: "Neutral Intention" },
//           { value: "Negative Intention", label: "Negative Intention" },
//         ]}
//         value={watch("status")}
//         onChange={(option: any) => setValue("status", option?.value || "")}
//         error={errors.status?.message}
//       />

//       <Input
//         label="Reminder for Action Date (Optional If you want to)"
//         placeholder="Enter reminder action date"
//         type="date"
//         {...register("reminder_action_date")}
//         error={errors.reminder_action_date?.message}
//       />

//       <Textarea
//         label="Comments"
//         placeholder="Enter comments (if any)"
//         {...register("comments")}
//         error={errors.comments?.message}
//       />
//     </div>
//   );
// }
"use client";

import { useFormContext } from "react-hook-form";
import { Input, Select, Textarea } from "rizzui";
import { DatePicker } from "@core/ui/datepicker";

export default function Form() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <DatePicker
          selected={watch("date") ? new Date(watch("date")) : null}
          onChange={(date: Date | null) => {
            setValue("date", date ? date.toISOString() : null);
          }}
          placeholderText="Select a Date"
          dateFormat="dd-MMM-yyyy"
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">
            {errors.date.message?.toString()}
          </p>
        )}
      </div>

      <Input
        label="Visitor Name"
        placeholder="Enter visitor name"
        {...register("visitor_name")}
        error={errors.visitor_name?.message?.toString()}
      />

      <Input
        label="Visitor Company"
        placeholder="Enter visitor company"
        {...register("visitor_company")}
        error={errors.visitor_company?.message?.toString()}
      />

      <Select
        label="Visitor Type"
        placeholder="Select visitor type"
        options={[
          { value: "Customer", label: "Customer" },
          { value: "Vendor", label: "Vendor" },
          { value: "Interview", label: "Interview" },
          { value: "Other", label: "Other" },
        ]}
        value={watch("visitor_type")}
        onChange={(option: any) =>
          setValue("visitor_type", option?.value || "")
        }
        error={errors.visitor_type?.message?.toString()}
      />

      <Input
        label="Visitor Contact Number"
        placeholder="Enter contact number"
        type="tel"
        {...register("visitor_contact_number")}
        error={errors.visitor_contact_number?.message?.toString()}
      />

      <Input
        label="Person Visiting (Employee Name)"
        placeholder="Enter employee name"
        {...register("person_visiting")}
        error={errors.person_visiting?.message?.toString()}
      />

      <Select
        label="Status"
        placeholder="Select status"
        options={[
          { value: "Positive Intention", label: "Positive Intention" },
          { value: "Neutral Intention", label: "Neutral Intention" },
          { value: "Negative Intention", label: "Negative Intention" },
        ]}
        value={watch("status")}
        onChange={(option: any) => setValue("status", option?.value || "")}
        error={errors.status?.message?.toString()}
      />
      <Input
        label="Purpose of Visit"
        placeholder="Enter purpose of visit"
        {...register("purpose_of_visit")}
        error={errors.purpose_of_visit?.message?.toString()}
      />

      {/* DatePicker for Reminder Action Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Reminder for Action Date (Optional If you want to)
        </label>
        <DatePicker
          selected={
            watch("reminder_action_date")
              ? new Date(watch("reminder_action_date"))
              : null
          }
          onChange={(date: Date | null) => {
            setValue("reminder_action_date", date ? date.toISOString() : null);
          }}
          placeholderText="Select a date"
          dateFormat="dd-MMM-yyyy"
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.reminder_action_date && (
          <p className="mt-1 text-sm text-red-600">
            {errors.reminder_action_date.message?.toString()}
          </p>
        )}
      </div>

      {/* Full Width Fields */}
      {/* <div className="col-span-1 md:col-span-2">
        <Textarea
          label="Purpose of Visit"
          placeholder="Enter purpose of visit"
          {...register("purpose_of_visit")}
          error={errors.purpose_of_visit?.message?.toString()}
        />
      </div> */}

      <div className="col-span-1 md:col-span-2">
        <Textarea
          label="Comments"
          placeholder="Enter comments (if any)"
          {...register("comments")}
          error={errors.comments?.message?.toString()}
        />
      </div>
    </div>
  );
}
