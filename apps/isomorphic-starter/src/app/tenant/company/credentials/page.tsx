// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import credentialsService from "@/services/credientialsSevice";
// import {
//   Accordion,
//   ActionIcon,
//   Button,
//   Input,
//   Modal,
//   Password,
//   Tooltip,
// } from "rizzui";
// import { useForm, FormProvider, useFieldArray } from "react-hook-form";
// import toast from "react-hot-toast";
// import { FiEdit, FiTrash, FiArrowDown, FiPlus, FiMinus } from "react-icons/fi";
// import { debounce } from "lodash";
// import DeletePopover from "@core/components/delete-popover";

// export default function CredentialsManagementPage() {
//   const methods = useForm({
//     defaultValues: {
//       platform: "",
//       accounts: [{ name: "", email: "", password: "" }],
//     },
//   });
//   const { register, handleSubmit, reset, setValue, control } = methods;

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "accounts",
//   });

//   const [credentials, setCredentials] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [otpRequired, setOtpRequired] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpModalOpen, setOtpModalOpen] = useState(false);

//   // ✅ Fetch Credentials with OTP Verification Handling
//   const fetchCredentials = async () => {
//     setLoading(true);
//     try {
//       const response = await credentialsService.getCredentials();
//       setCredentials(response.data);
//     } catch (error) {
//       setOtpRequired(true);
//       setOtpModalOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedFetchCredentials = useCallback(
//     debounce(fetchCredentials, 300),
//     []
//   );

//   useEffect(() => {
//     debouncedFetchCredentials();
//     return () => debouncedFetchCredentials.cancel();
//   }, [debouncedFetchCredentials]);

//   const handleOtpSubmit = async () => {
//     try {
//       await credentialsService.verifyOTP(otp);
//       setOtpModalOpen(false);
//       setOtpRequired(false);
//       fetchCredentials();
//     } catch {
//       toast.error("Invalid OTP. Please try again.");
//     }
//   };

//   // ✅ Submit Form (Create / Update)
//   const onSubmit = async (data: any) => {
//     setLoading(true);
//     try {
//       await credentialsService.upsertCredential({
//         ...data,
//         _id: editingId, // Ensure correct credential is updated
//       });

//       toast.success(
//         editingId
//           ? "Credential updated successfully."
//           : "Credential added successfully."
//       );

//       handleClear();
//       fetchCredentials();
//     } catch {
//       setOtpRequired(true);
//       setOtpModalOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle clearing form & exiting edit mode
//   const handleClear = () => {
//     reset({
//       platform: "",
//       accounts: [{ name: "", email: "", password: "" }],
//     });
//     setEditingId(null);
//   };

//   // ✅ Handle Edit - Load selected credential into form
//   const handleEdit = (cred: any) => {
//     setEditingId(cred._id);
//     setValue("platform", cred.platform);
//     setValue("accounts", cred.accounts); // ✅ Loads all accounts correctly

//     // Reset the accounts field array so UI updates properly
//     reset({
//       platform: cred.platform,
//       accounts: cred.accounts.map((account: any) => ({
//         name: account.name,
//         email: account.email,
//         password: account.password,
//       })),
//     });

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // ✅ Handle Delete Credential
//   const handleDelete = async (platform: string) => {
//     setLoading(true);
//     try {
//       await credentialsService.deleteCredential(platform);
//       toast.success("Credential deleted successfully.");
//       fetchCredentials();
//     } catch {
//       toast.error("Failed to delete credential.");
//       setOtpRequired(true);
//       setOtpModalOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 max-w-screen-xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Credential Management
//       </h1>

//       {/* OTP Verification Modal */}
//       {otpRequired && (
//         <Modal isOpen={otpModalOpen} onClose={() => setOtpModalOpen(false)}>
//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4 text-center">
//               Enter OTP to Access
//             </h3>
//             <Input
//               label="One-Time Password"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               className="w-full"
//             />
//             <Button className="mt-4 w-full" onClick={handleOtpSubmit}>
//               Verify OTP
//             </Button>
//           </div>
//         </Modal>
//       )}

//       {/* Credential Form */}
//       <FormProvider {...methods}>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
//         >
//           <h3 className="text-lg font-semibold text-gray-800">
//             {editingId ? "Edit Credential" : "Add Credential"}
//           </h3>
//           <Input
//             label="Platform"
//             {...register("platform")}
//             required
//             className="w-full"
//             disabled={!!editingId}
//           />

//           {/* Accounts Section (Multiple Accounts Support) */}
//           {fields.map((field, index) => (
//             <div
//               key={field.id}
//               className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
//             >
//               <Input
//                 label="Account Name"
//                 {...register(`accounts.${index}.name`)}
//                 required
//                 className="w-full"
//               />
//               <Input
//                 label="Email"
//                 type="email"
//                 {...register(`accounts.${index}.email`)}
//                 required
//                 className="w-full"
//                 autoComplete="off"
//               />
//               <Password
//                 label="Password"
//                 placeholder="Enter your password"
//                 {...register(`accounts.${index}.password`)}
//                 required
//                 className="w-full"
//                 autoComplete="new-password"
//               />
//               {index > 0 && (
//                 <Button
//                   type="button"
//                   className="mt-6 bg-red-500 hover:bg-red-600 text-white"
//                   onClick={() => remove(index)}
//                 >
//                   <FiMinus />
//                 </Button>
//               )}
//             </div>
//           ))}

//           {/* Add More Accounts Button */}
//           <Button
//             type="button"
//             onClick={() => append({ name: "", email: "", password: "" })}
//             className="bg-green-500 hover:bg-green-600 text-white w-full"
//           >
//             <FiPlus className="mr-2" /> Add Another Account
//           </Button>

//           <div className="flex gap-4">
//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700"
//             >
//               {editingId ? "Update" : "Save"} Credential
//             </Button>
//             <Button
//               type="button"
//               onClick={handleClear}
//               className="w-full bg-gray-500 hover:bg-gray-600"
//             >
//               Clear
//             </Button>
//           </div>
//         </form>
//       </FormProvider>

//       {/* Credential Accordion List */}
//       <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800">
//           Stored Credentials
//         </h3>
//         {credentials.length === 0 ? (
//           <p className="text-center text-gray-500">No credentials found.</p>
//         ) : (
//           credentials.map((cred: any) => (
//             <Accordion
//               key={cred._id}
//               className="border-b last-of-type:border-b-0"
//             >
//               <Accordion.Header>
//                 {({ open }) => (
//                   <div className="flex w-full cursor-pointer items-center justify-between py-5 text-lg font-semibold text-gray-800">
//                     {cred.platform}
//                     <FiArrowDown
//                       className={`h-5 w-5 transform transition-transform duration-300 ${
//                         open ? "rotate-180" : "rotate-0"
//                       }`}
//                     />
//                   </div>
//                 )}
//               </Accordion.Header>
//               <Accordion.Body>
//                 {cred.accounts.map((account: any) => (
//                   <div key={account._id} className="p-4 rounded-lg bg-gray-50">
//                     <p>{account.name}</p>
//                     <p>{account.email}</p>
//                   </div>
//                 ))}
//                 <Button onClick={() => handleEdit(cred)}>Edit</Button>
//               </Accordion.Body>
//             </Accordion>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useCallback } from "react";
import credentialsService from "@/services/credientialsSevice";
import {
  Accordion,
  ActionIcon,
  Button,
  Input,
  Modal,
  Password,
  Tooltip,
} from "rizzui";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEdit, FiTrash, FiArrowDown, FiPlus, FiMinus } from "react-icons/fi";
import { debounce } from "lodash";
import DeletePopover from "@core/components/delete-popover";

export default function CredentialsManagementPage() {
  const methods = useForm({
    defaultValues: {
      platform: "",
      accounts: [{ name: "", email: "", password: "" }],
    },
  });
  const { register, handleSubmit, reset, setValue, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "accounts",
  });

  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [otpRequired, setOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  // ✅ Fetch Credentials with OTP Verification Handling
  const fetchCredentials = async () => {
    setLoading(true);
    try {
      const response = await credentialsService.getCredentials();
      setCredentials(response.data);
    } catch (error) {
      setOtpRequired(true);
      setOtpModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchCredentials = useCallback(
    debounce(fetchCredentials, 300),
    []
  );

  useEffect(() => {
    debouncedFetchCredentials();
    return () => debouncedFetchCredentials.cancel();
  }, [debouncedFetchCredentials]);

  const handleOtpSubmit = async () => {
    try {
      await credentialsService.verifyOTP(otp);
      setOtpModalOpen(false);
      setOtpRequired(false);
      fetchCredentials();
    } catch {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  // ✅ Submit Form (Create / Update)
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await credentialsService.upsertCredential({
        ...data,
        _id: editingId, // Ensure correct credential is updated
      });

      toast.success(
        editingId
          ? "Credential updated successfully."
          : "Credential added successfully."
      );

      handleClear();
      fetchCredentials();
    } catch {
      setOtpRequired(true);
      setOtpModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle clearing form & exiting edit mode
  const handleClear = () => {
    reset({
      platform: "",
      accounts: [{ name: "", email: "", password: "" }],
    });
    setEditingId(null);
  };

  // ✅ Handle Edit - Load selected credential into form
  const handleEdit = (cred: any) => {
    setEditingId(cred._id);
    setValue("platform", cred.platform);
    setValue("accounts", cred.accounts);

    reset({
      platform: cred.platform,
      accounts: cred.accounts.map((account: any) => ({
        name: account.name,
        email: account.email,
        password: account.password,
      })),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Handle Delete Credential
  const handleDelete = async (platform: string) => {
    setLoading(true);
    try {
      await credentialsService.deleteCredential(platform);
      toast.success("Credential deleted successfully.");
      fetchCredentials();
    } catch {
      toast.error("Failed to delete credential.");
      setOtpRequired(true);
      setOtpModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-screen-2xl mx-auto w-full">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Credential Management
      </h1>

      {/* OTP Verification Modal */}
      {otpRequired && (
        <Modal isOpen={otpModalOpen} onClose={() => setOtpModalOpen(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Enter OTP to Access
            </h3>
            <Input
              label="One-Time Password"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full"
            />
            <Button className="mt-4 w-full" onClick={handleOtpSubmit}>
              Verify OTP
            </Button>
          </div>
        </Modal>
      )}

      {/* Credential Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-10 rounded-xl shadow-lg w-full"
        >
          <h3 className="text-2xl font-semibold text-gray-800">
            {editingId ? "Edit Credential" : "Add Credential"}
          </h3>
          <Input
            label="Platform"
            {...register("platform")}
            required
            className="w-full"
            disabled={!!editingId}
          />

          {/* Accounts Section (Multiple Accounts Support) */}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-gray-100 p-4 rounded-lg"
            >
              <Input
                label="Account Name"
                {...register(`accounts.${index}.name`)}
                required
                className="w-full"
              />
              <Input
                label="Email"
                type="email"
                {...register(`accounts.${index}.email`)}
                required
                className="w-full"
                autoComplete="off"
              />
              <Password
                label="Password"
                placeholder="Enter your password"
                {...register(`accounts.${index}.password`)}
                required
                className="w-full"
                autoComplete="new-password"
              />
              {index > 0 && (
                <Button
                  type="button"
                  className="mt-6 bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => remove(index)}
                >
                  <FiMinus />
                </Button>
              )}
            </div>
          ))}

          {/* Add More Accounts Button */}
          <Button
            type="button"
            onClick={() => append({ name: "", email: "", password: "" })}
            className="bg-green-500 hover:bg-green-600 text-white w-full"
          >
            <FiPlus className="mr-2" /> Add Another Account
          </Button>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {editingId ? "Update" : "Save"} Credential
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              className="w-full bg-gray-500 hover:bg-gray-600"
            >
              Clear
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* Credential Accordion List */}
      <div className="mt-8 bg-white p-10 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Stored Credentials
        </h3>
        {credentials.length === 0 ? (
          <p className="text-center text-gray-500">No credentials found.</p>
        ) : (
          credentials.map((cred: any) => (
            <Accordion
              key={cred._id}
              className="border-b last-of-type:border-b-0"
            >
              <Accordion.Header>
                {({ open }) => (
                  <div className="flex justify-between py-5 text-xl font-semibold">
                    {cred.platform}
                    <FiArrowDown
                      className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </div>
                )}
              </Accordion.Header>
              <Accordion.Body>
                {cred.accounts.map((account: any) => (
                  <div key={account._id} className="p-4 rounded-lg bg-gray-50">
                    <p>{account.name}</p>
                    <p>{account.email}</p>
                  </div>
                ))}
                <Button className="mt-2 mb-2" onClick={() => handleEdit(cred)}>
                  View All Credientials
                </Button>
              </Accordion.Body>
            </Accordion>
          ))
        )}
      </div>
    </div>
  );
}
