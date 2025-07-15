// "use client";

// import { useEffect, useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { Button, Tab, ActionIcon } from "rizzui";
// import Upload from "@core/ui/upload";
// import documentService from "@/services/documentService";
// import { toast } from "react-hot-toast";
// import Image from "next/image";
// import { PiTrashBold } from "react-icons/pi";
// import FormFooter from "@core/components/form-footer";

// export default function DocumentManagementPage() {
//   const methods = useForm();
//   const { handleSubmit, setValue, watch, reset } = methods;

//   const [filePreviews, setFilePreviews] = useState<Record<string, any>>({});
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     fetchDocument();
//   }, []);

//   const fetchDocument = async () => {
//     setLoading(true);
//     try {
//       const response = await documentService.getDocument();
//       if (response?.data) {
//         reset(response.data);
//         setFilePreviews({
//           ...response.data.section_1,
//           ...response.data.section_2,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching document:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const upsertDocument = async (data: any) => {
//     setLoading(true);
//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       if (Array.isArray(data[key])) {
//         data[key].forEach((file) => formData.append(key, file));
//       } else if (data[key]) {
//         formData.append(key, data[key]);
//       }
//     });

//     try {
//       await documentService.upsertDocument(formData);
//       toast.success("Document saved successfully");
//       fetchDocument();
//     } catch (error) {
//       console.error("Error saving document:", error);
//       toast.error("Failed to save document");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = (
//     fieldName: string,
//     event: any,
//     isMultiple = false
//   ) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       if (isMultiple) {
//         const updatedFiles = [
//           ...(watch(fieldName) || []),
//           ...Array.from(files),
//         ];
//         setValue(fieldName, updatedFiles);
//         setFilePreviews((prev) => ({
//           ...prev,
//           [fieldName]: updatedFiles,
//         }));
//       } else {
//         setValue(fieldName, files[0]);
//         setFilePreviews((prev) => ({
//           ...prev,
//           [fieldName]: files[0],
//         }));
//       }
//     }
//   };

//   const handleFileDelete = (fieldName: string, index?: number) => {
//     if (index !== undefined) {
//       const updatedFiles = [...(watch(fieldName) || [])];
//       updatedFiles.splice(index, 1);
//       setValue(fieldName, updatedFiles);
//       setFilePreviews((prev) => ({
//         ...prev,
//         [fieldName]: updatedFiles,
//       }));
//     } else {
//       setValue(fieldName, null);
//       setFilePreviews((prev) => ({
//         ...prev,
//         [fieldName]: null,
//       }));
//     }
//   };

//   const renderSingleFilePreview = (
//     file: File | string | null,
//     fieldName: string
//   ) => {
//     if (!file) return null;
//     const isUrl = typeof file === "string";
//     const fileUrl = isUrl ? file : URL.createObjectURL(file);

//     return (
//       <div className="flex items-center mt-2 border px-3 py-2 rounded-xl">
//         <div
//           className="relative flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden border bg-gray-50 cursor-pointer"
//           onClick={() => window.open(fileUrl, "_blank")}
//         >
//           {isUrl || file.type.startsWith("image/") ? (
//             <Image src={fileUrl} alt={fieldName} width={48} height={48} />
//           ) : (
//             <span className="text-gray-600">File</span>
//           )}
//         </div>
//         <div
//           className="ml-3 truncate cursor-pointer"
//           onClick={() => window.open(fileUrl, "_blank")}
//         >
//           {isUrl ? file.split("/").pop() : file.name}
//         </div>
//         <ActionIcon
//           onClick={() => handleFileDelete(fieldName)}
//           size="sm"
//           variant="flat"
//           color="danger"
//           className="ml-auto"
//         >
//           <PiTrashBold />
//         </ActionIcon>
//       </div>
//     );
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
//           className="flex items-center mt-2 border px-3 py-2 rounded-xl"
//         >
//           <div
//             className="relative flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden border bg-gray-50 cursor-pointer"
//             onClick={() => window.open(fileUrl, "_blank")}
//           >
//             {isUrl || file.type.startsWith("image/") ? (
//               <Image
//                 src={fileUrl}
//                 alt={`${fieldName}-${index}`}
//                 width={48}
//                 height={48}
//               />
//             ) : (
//               <span className="text-gray-600">File</span>
//             )}
//           </div>
//           <div
//             className="ml-3 truncate cursor-pointer"
//             onClick={() => window.open(fileUrl, "_blank")}
//           >
//             {isUrl ? file.split("/").pop() : file.name}
//           </div>
//           <ActionIcon
//             onClick={() => handleFileDelete(fieldName, index)}
//             size="sm"
//             variant="flat"
//             color="danger"
//             className="ml-auto"
//           >
//             <PiTrashBold />
//           </ActionIcon>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Document Management</h1>

//       {loading && <p>Loading...</p>}

//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(upsertDocument)} className="space-y-6">
//           <Tab>
//             <Tab.List>
//               <Tab.ListItem>Legal Documents</Tab.ListItem>
//               <Tab.ListItem>Business Documents</Tab.ListItem>
//             </Tab.List>
//             <Tab.Panels>
//               {/* Panel 1: Legal Documents */}
//               <Tab.Panel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[
//                     "trade_license",
//                     "moa",
//                     "aoa",
//                     "emigration_card",
//                     "certificate_of_incorporation",
//                     "shareholder_agreement",
//                     "tenancy_contract_or_ejari",
//                     "vat_registration_certificate",
//                     "corporate_tax_certificate",
//                   ].map((field) => (
//                     <div key={field}>
//                       <Upload
//                         label={field.replace(/_/g, " ").toUpperCase()}
//                         onChange={(e) => handleFileUpload(field, e)}
//                         accept="imgAndPdf"
//                       />
//                       {renderSingleFilePreview(filePreviews[field], field)}
//                     </div>
//                   ))}
//                   {["passport_copies", "visa_residence_permits"].map(
//                     (field) => (
//                       <div key={field}>
//                         <Upload
//                           label={field.replace(/_/g, " ").toUpperCase()}
//                           onChange={(e) => handleFileUpload(field, e, true)}
//                           accept="imgAndPdf"
//                           multiple
//                         />
//                         {renderMultipleFilePreviews(filePreviews[field], field)}
//                       </div>
//                     )
//                   )}
//                 </div>
//               </Tab.Panel>

//               {/* Panel 2: Business Documents */}
//               <Tab.Panel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[
//                     "business_plan_document",
//                     "bank_statement",
//                     "power_of_attorney",
//                     "insurance_policies",
//                     "employee_handbook_or_hr_policies",
//                     "intellectual_property_registrations",
//                     "trade_mark_certificate",
//                     "iso_certification",
//                   ].map((field) => (
//                     <div key={field}>
//                       <Upload
//                         label={field.replace(/_/g, " ").toUpperCase()}
//                         onChange={(e) => handleFileUpload(field, e)}
//                         accept="imgAndPdf"
//                       />
//                       {renderSingleFilePreview(filePreviews[field], field)}
//                     </div>
//                   ))}
//                   {["company_policies", "contract_templates"].map((field) => (
//                     <div key={field}>
//                       <Upload
//                         label={field.replace(/_/g, " ").toUpperCase()}
//                         onChange={(e) => handleFileUpload(field, e, true)}
//                         accept="imgAndPdf"
//                         multiple
//                       />
//                       {renderMultipleFilePreviews(filePreviews[field], field)}
//                     </div>
//                   ))}
//                 </div>
//               </Tab.Panel>
//             </Tab.Panels>
//           </Tab>

//           {/* <Button type="submit" disabled={loading}>
//             {loading ? "Saving..." : "Save Document"}
//           </Button> */}

//           <FormFooter
//             isLoading={loading}
//             submitBtnText={loading ? "Saving..." : "Save Document"}
//           />
//         </form>
//       </FormProvider>
//     </div>
//   );
// }

// const upsertDocument = async (data: any) => {
//   setLoading(true);
//   const formData = new FormData();

//   const expiryDates: Record<string, any> = {};

//   Object.keys(data).forEach((key) => {
//     if (key.startsWith("expiry_dates.")) {
//       const field = key.split(".")[1];
//       expiryDates[field] = data[key];
//     } else if (Array.isArray(data[key])) {
//       data[key].forEach((file) => formData.append(key, file));
//     } else if (data[key]) {
//       formData.append(key, data[key]);
//     }
//   });

//   formData.append("expiry_dates", JSON.stringify(expiryDates));

//   try {
//     await documentService.upsertDocument(formData);
//     toast.success("Document saved successfully");
//     fetchDocument();
//   } catch (error) {
//     console.error("Error saving document:", error);
//     toast.error("Failed to save document");
//   } finally {
//     setLoading(false);
//   }
// };

// ----------------------------------------------------------------------------

// "use client";

// import { useEffect, useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { Button, Tab, ActionIcon, Input } from "rizzui";
// import Upload from "@core/ui/upload";
// import documentService from "@/services/documentService";
// import { toast } from "react-hot-toast";
// import Image from "next/image";
// import { PiTrashBold } from "react-icons/pi";
// import FormFooter from "@core/components/form-footer";

// export default function DocumentManagementPage() {
//   const methods = useForm();
//   const { handleSubmit, setValue, watch, reset, register } = methods;

//   const [filePreviews, setFilePreviews] = useState<Record<string, any>>({});
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     fetchDocument();
//   }, []);

//   const fetchDocument = async () => {
//     setLoading(true);
//     try {
//       const response = await documentService.getDocument();
//       if (response?.data) {
//         const document = response.data;

//         const expiry_dates: Record<string, any> = {};

//         const collectExpiry = (section: any) => {
//           for (const key in section) {
//             if (Array.isArray(section[key])) {
//               expiry_dates[key] = section[key].map((item: any) =>
//                 item?.expiry_date ? item.expiry_date.slice(0, 10) : ""
//               );
//             } else if (section[key]?.expiry_date) {
//               expiry_dates[key] = section[key].expiry_date.slice(0, 10);
//             }
//           }
//         };

//         collectExpiry(document.section_1);
//         collectExpiry(document.section_2);

//         reset({
//           ...document,
//           expiry_dates,
//         });

//         setFilePreviews({
//           ...document.section_1,
//           ...document.section_2,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching document:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const upsertDocument = async (data: any) => {
//     setLoading(true);
//     const formData = new FormData();

//     const expiryDates = data.expiry_dates || {};

//     Object.keys(data).forEach((key) => {
//       if (key === "expiry_dates") return; // already handled

//       if (Array.isArray(data[key])) {
//         data[key].forEach((file) => formData.append(key, file));
//       } else if (data[key]) {
//         formData.append(key, data[key]);
//       }
//     });

//     formData.append("expiry_dates", JSON.stringify(expiryDates));

//     try {
//       await documentService.upsertDocument(formData);
//       toast.success("Document saved successfully");
//       fetchDocument();
//     } catch (error) {
//       console.error("Error saving document:", error);
//       toast.error("Failed to save document");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = (
//     fieldName: string,
//     event: any,
//     isMultiple = false
//   ) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       if (isMultiple) {
//         const updatedFiles = [
//           ...(watch(fieldName) || []),
//           ...Array.from(files),
//         ];
//         setValue(fieldName, updatedFiles);
//         setFilePreviews((prev) => ({
//           ...prev,
//           [fieldName]: updatedFiles,
//         }));
//       } else {
//         setValue(fieldName, files[0]);
//         setFilePreviews((prev) => ({
//           ...prev,
//           [fieldName]: files[0],
//         }));
//       }
//     }
//   };

//   const handleFileDelete = (fieldName: string, index?: number) => {
//     if (index !== undefined) {
//       const updatedFiles = [...(watch(fieldName) || [])];
//       updatedFiles.splice(index, 1);
//       setValue(fieldName, updatedFiles);
//       setFilePreviews((prev) => ({
//         ...prev,
//         [fieldName]: updatedFiles,
//       }));
//     } else {
//       setValue(fieldName, null);
//       setFilePreviews((prev) => ({
//         ...prev,
//         [fieldName]: null,
//       }));
//     }
//   };

//   const renderExpiryInput = (fieldName: string, index?: number) => {
//     const name =
//       index !== undefined
//         ? `expiry_dates.${fieldName}.${index}`
//         : `expiry_dates.${fieldName}`;

//     return (
//       <Input
//         type="date"
//         {...register(name)}
//         className="ml-3 max-w-[160px]"
//         size="sm"
//       />
//     );
//   };

//   const renderSingleFilePreview = (
//     file: File | { file: string } | null,
//     fieldName: string
//   ) => {
//     if (!file) return null;

//     const isFileObject = file instanceof File;
//     const fileUrl = isFileObject
//       ? URL.createObjectURL(file)
//       : file.file || file;

//     return (
//       <div className="flex items-center mt-2 border px-3 py-2 rounded-xl">
//         <div
//           className="relative flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden border bg-gray-50 cursor-pointer"
//           onClick={() => window.open(fileUrl, "_blank")}
//         >
//           {fileUrl && fileUrl.match(/\.(jpg|jpeg|png|gif|pdf)$/i) ? (
//             <Image src={fileUrl} alt={fieldName} width={48} height={48} />
//           ) : (
//             <span className="text-gray-600">File</span>
//           )}
//         </div>
//         <div
//           className="ml-3 truncate cursor-pointer"
//           onClick={() => window.open(fileUrl, "_blank")}
//         >
//           {isFileObject ? file.name : fileUrl.split("/").pop()}
//         </div>
//         {renderExpiryInput(fieldName)}
//         <ActionIcon
//           onClick={() => handleFileDelete(fieldName)}
//           size="sm"
//           variant="flat"
//           color="danger"
//           className="ml-auto"
//         >
//           <PiTrashBold />
//         </ActionIcon>
//       </div>
//     );
//   };

//   const renderMultipleFilePreviews = (
//     files: (File | string | { file: string })[] | null,
//     fieldName: string
//   ) => {
//     if (!files || files.length === 0) return null;

//     return files.map((file, index) => {
//       let fileUrl = "";

//       if (file instanceof File) {
//         fileUrl = URL.createObjectURL(file);
//       } else if (typeof file === "string") {
//         fileUrl = file;
//       } else if (typeof file === "object" && file?.file) {
//         fileUrl = file.file;
//       }

//       return (
//         <div
//           key={`${fieldName}-${index}`}
//           className="flex items-center mt-2 border px-3 py-2 rounded-xl"
//         >
//           <div
//             className="relative flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden border bg-gray-50 cursor-pointer"
//             onClick={() => window.open(fileUrl, "_blank")}
//           >
//             {fileUrl && fileUrl.match(/\.(jpg|jpeg|png|gif|pdf)$/i) ? (
//               <Image
//                 src={fileUrl}
//                 alt={`${fieldName}-${index}`}
//                 width={48}
//                 height={48}
//               />
//             ) : (
//               <span className="text-gray-600">File</span>
//             )}
//           </div>
//           <div
//             className="ml-3 truncate cursor-pointer"
//             onClick={() => window.open(fileUrl, "_blank")}
//           >
//             {file instanceof File
//               ? file.name
//               : typeof file === "object"
//                 ? file.file?.split("/").pop()
//                 : file.split("/").pop()}
//           </div>
//           {renderExpiryInput(fieldName, index)}
//           <ActionIcon
//             onClick={() => handleFileDelete(fieldName, index)}
//             size="sm"
//             variant="flat"
//             color="danger"
//             className="ml-auto"
//           >
//             <PiTrashBold />
//           </ActionIcon>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Document Management</h1>

//       {loading && <p>Loading...</p>}

//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(upsertDocument)} className="space-y-6">
//           <Tab>
//             <Tab.List>
//               <Tab.ListItem>Legal Documents</Tab.ListItem>
//               <Tab.ListItem>Business Documents</Tab.ListItem>
//             </Tab.List>
//             <Tab.Panels>
//               <Tab.Panel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[
//                     "trade_license",
//                     "moa",
//                     "aoa",
//                     "emigration_card",
//                     "certificate_of_incorporation",
//                     "shareholder_agreement",
//                     "tenancy_contract_or_ejari",
//                     "vat_registration_certificate",
//                     "corporate_tax_certificate",
//                   ].map((field) => (
//                     <div key={field}>
//                       <Upload
//                         label={field.replace(/_/g, " ").toUpperCase()}
//                         onChange={(e) => handleFileUpload(field, e)}
//                         accept="imgAndPdf"
//                       />
//                       {renderSingleFilePreview(filePreviews[field], field)}
//                     </div>
//                   ))}
//                   {["passport_copies", "visa_residence_permits"].map(
//                     (field) => (
//                       <div key={field}>
//                         <Upload
//                           label={field.replace(/_/g, " ").toUpperCase()}
//                           onChange={(e) => handleFileUpload(field, e, true)}
//                           accept="imgAndPdf"
//                           multiple
//                         />
//                         {renderMultipleFilePreviews(filePreviews[field], field)}
//                       </div>
//                     )
//                   )}
//                 </div>
//               </Tab.Panel>
//               <Tab.Panel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[
//                     "business_plan_document",
//                     "bank_statement",
//                     "power_of_attorney",
//                     "insurance_policies",
//                     "employee_handbook_or_hr_policies",
//                     "intellectual_property_registrations",
//                     "trade_mark_certificate",
//                     "iso_certification",
//                   ].map((field) => (
//                     <div key={field}>
//                       <Upload
//                         label={field.replace(/_/g, " ").toUpperCase()}
//                         onChange={(e) => handleFileUpload(field, e)}
//                         accept="imgAndPdf"
//                       />
//                       {renderSingleFilePreview(filePreviews[field], field)}
//                     </div>
//                   ))}
//                   {["company_policies", "contract_templates"].map((field) => (
//                     <div key={field}>
//                       <Upload
//                         label={field.replace(/_/g, " ").toUpperCase()}
//                         onChange={(e) => handleFileUpload(field, e, true)}
//                         accept="imgAndPdf"
//                         multiple
//                       />
//                       {renderMultipleFilePreviews(filePreviews[field], field)}
//                     </div>
//                   ))}
//                 </div>
//               </Tab.Panel>
//             </Tab.Panels>
//           </Tab>

//           <FormFooter
//             isLoading={loading}
//             submitBtnText={loading ? "Saving..." : "Save Document"}
//           />
//         </form>
//       </FormProvider>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Tab } from "rizzui";
import documentService from "@/services/documentService";
import { HiDownload, HiOutlinePencil } from "react-icons/hi";
import dayjs from "dayjs";
import EditDocumentDrawer from "./EditDocumentDrawer"; // make sure this path is correct

function getExpiryText(dateString?: string | null) {
  if (!dateString) return null;

  const today = dayjs();
  const expiry = dayjs(dateString);
  const daysLeft = expiry.diff(today, "day");

  if (daysLeft < 0) return { text: "Expired", color: "text-red-500" };
  if (daysLeft <= 30)
    return { text: "Expiring soon", color: "text-purple-500" };
  return {
    text: `Valid till: ${expiry.format("DD-MMM-YYYY")}`,
    color: "text-gray-600",
  };
}

function DocumentCard({ label, file, expiry_date, onEdit }: any) {
  const fileName = typeof file === "object" && file?.file ? file.file : file;
  const displayName = fileName?.split("/").pop() || "No File";
  const expiry = getExpiryText(expiry_date);

  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">{label}</span>
        <div className="flex gap-2">
          <HiOutlinePencil
            className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={onEdit}
          />
          <HiDownload
            className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={() => window.open(fileName, "_blank")}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="text-red-500 font-semibold">PDF</span>
        <span className="truncate">{displayName}</span>
      </div>
      {expiry && (
        <span className={`text-sm font-medium mt-1 ${expiry.color}`}>
          {expiry.text}
        </span>
      )}
    </div>
  );
}

type DocumentSection = {
  [key: string]: {
    file: string | null;
    expiry_date: string | null;
  };
};

type DocumentData = {
  section_1: DocumentSection;
  section_2: DocumentSection;
};

export default function DocumentManagementViewOnly() {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    try {
      const response = await documentService.getDocument();
      setDocument(response?.data);
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field: any, section: any, sectionName: any) => {
    setSelectedDoc({
      key: field,
      section: sectionName,
      label: field
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l: string) => l.toUpperCase()),
      ...section[field],
    });
    setDrawerOpen(true);
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await documentService.upsertDocument(formData);
      await fetchDocument();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setDrawerOpen(false);
    }
  };

  const renderCards = (fields: any, section: any, sectionName: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fields.map((field: any) => (
        <DocumentCard
          key={field}
          label={field
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
          {...section?.[field]}
          onEdit={() => handleEdit(field, section, sectionName)}
        />
      ))}
    </div>
  );

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Document Management</h1>

      <Tab>
        <Tab.List>
          <Tab.ListItem>Legal Documents</Tab.ListItem>
          <Tab.ListItem>Business Documents</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {renderCards(
              [
                "trade_license",
                "moa",
                "aoa",
                "emigration_card",
                "certificate_of_incorporation",
                "shareholder_agreement",
                "tenancy_contract_or_ejari",
                "vat_registration_certificate",
                "corporate_tax_certificate",
                "passport_copies",
                "visa_residence_permits",
              ],
              document?.section_1,
              "section_1"
            )}
          </Tab.Panel>
          <Tab.Panel>
            {renderCards(
              [
                "business_plan_document",
                "bank_statement",
                "power_of_attorney",
                "insurance_policies",
                "employee_handbook_or_hr_policies",
                "intellectual_property_registrations",
                "trade_mark_certificate",
                "iso_certification",
                "company_policies",
                "contract_templates",
              ],
              document?.section_2,
              "section_2"
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab>

      <EditDocumentDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleUpdate}
        document={selectedDoc || { label: "", file: null, expiry_date: null }}
      />
    </div>
  );
}
