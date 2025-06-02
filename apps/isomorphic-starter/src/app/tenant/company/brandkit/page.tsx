// "use client";

// import { useEffect, useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { Tab, ActionIcon, Input, Textarea } from "rizzui";
// import Upload from "@core/ui/upload";
// import brandkitService from "@/services/brandKitService";
// import { toast } from "react-hot-toast";
// import Image from "next/image";
// import { PiTrashBold } from "react-icons/pi";
// import FormFooter from "@core/components/form-footer";

// export default function BrandKitManagementPage() {
//   const methods = useForm();
//   const { handleSubmit, setValue, watch, reset } = methods;

//   const [filePreviews, setFilePreviews] = useState<Record<string, any>>({});
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     fetchBrandKit();
//   }, []);

//   const fetchBrandKit = async () => {
//     setLoading(true);
//     try {
//       const response = await brandkitService.getBrandKit();
//       if (response?.data) {
//         reset(response.data);
//         setFilePreviews(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching brand kit:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const upsertBrandKit = async (data: any) => {
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
//       await brandkitService.upsertBrandKit(formData);
//       toast.success("Brand Kit saved successfully");
//       fetchBrandKit();
//     } catch (error) {
//       console.error("Error saving brand kit:", error);
//       toast.error("Failed to save brand kit");
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

//   const renderFilePreview = (file: File | string | null, fieldName: string) => {
//     if (!file) return null;
//     const isUrl = typeof file === "string";
//     const fileUrl = isUrl ? file : URL.createObjectURL(file);

//     return (
//       <div className="mt-2 flex items-center gap-3 border rounded-lg p-2 bg-gray-50">
//         <div
//           className="relative flex items-center justify-center w-14 h-14 rounded-lg overflow-hidden border bg-gray-200 cursor-pointer"
//           onClick={() => window.open(fileUrl, "_blank")}
//         >
//           {isUrl || (file as File).type.startsWith("image/") ? (
//             <Image src={fileUrl} alt={fieldName} width={56} height={56} />
//           ) : (
//             <span className="text-gray-600 text-sm">File</span>
//           )}
//         </div>
//         <div
//           className="truncate cursor-pointer text-sm"
//           onClick={() => window.open(fileUrl, "_blank")}
//         >
//           {isUrl ? file.split("/").pop() : (file as File).name}
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

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Brand Kit Management</h1>

//       {loading && <p>Loading...</p>}

//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(upsertBrandKit)} className="space-y-6">
//           <Tab>
//             <Tab.List>
//               <Tab.ListItem>Brand Identity</Tab.ListItem>
//               <Tab.ListItem>Assets</Tab.ListItem>
//               <Tab.ListItem>Guidelines & Story</Tab.ListItem>
//             </Tab.List>
//             <Tab.Panels>
//               {/* Panel 1: Brand Identity */}
//               <Tab.Panel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <Input
//                     label="Brand Kit Name"
//                     {...methods.register("name")}
//                     placeholder="Enter brand name"
//                   />
//                   <div>
//                     <Upload
//                       label="Logo"
//                       onChange={(e) => handleFileUpload("logo", e)}
//                       accept="image/*"
//                     />
//                     {renderFilePreview(filePreviews["logo"], "logo")}
//                   </div>
//                 </div>
//               </Tab.Panel>

//               {/* Panel 2: Assets */}
//               <Tab.Panel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[
//                     "business_card_files",
//                     "letterhead_file",
//                     "company_profile",
//                   ].map((field) => (
//                     <div key={field}>
//                       <Upload
//                         label={field.replace(/_/g, " ").toUpperCase()}
//                         onChange={(e) => handleFileUpload(field, e)}
//                         accept="imgAndPdf"
//                       />
//                       {renderFilePreview(filePreviews[field], field)}
//                     </div>
//                   ))}
//                 </div>
//               </Tab.Panel>

//               {/* Panel 3: Guidelines & Story */}
//               <Tab.Panel>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <div>
//                     <Upload
//                       label="Brand Guidelines"
//                       onChange={(e) => handleFileUpload("brand_guidelines", e)}
//                       accept="imgAndPdf"
//                     />
//                     {renderFilePreview(
//                       filePreviews["brand_guidelines"],
//                       "brand_guidelines"
//                     )}
//                   </div>
//                   <Textarea
//                     label="Brand Voice and Tone"
//                     {...methods.register("brand_voice_and_tone")}
//                     placeholder="Describe the brand voice and tone"
//                   />
//                   <Textarea
//                     label="Brand Story"
//                     {...methods.register("brand_story")}
//                     placeholder="Describe the brand story"
//                   />
//                 </div>
//               </Tab.Panel>
//             </Tab.Panels>
//           </Tab>

//           <FormFooter
//             isLoading={loading}
//             submitBtnText={loading ? "Saving..." : "Save Brand Kit"}
//           />
//         </form>
//       </FormProvider>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Tab, ActionIcon, Input, Textarea } from "rizzui";
import Upload from "@core/ui/upload";
import brandkitService from "@/services/brandKitService";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { PiTrashBold } from "react-icons/pi";
import FormFooter from "@core/components/form-footer";

export default function BrandKitManagementPage() {
  const methods = useForm();
  const { handleSubmit, setValue, watch, reset } = methods;

  const [filePreviews, setFilePreviews] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchBrandKit();
  }, []);

  const fetchBrandKit = async () => {
    setLoading(true);
    try {
      const response = await brandkitService.getBrandKit();
      if (response?.data) {
        reset(response.data);
        setFilePreviews(response.data);
      }
    } catch (error) {
      console.error("Error fetching brand kit:", error);
    } finally {
      setLoading(false);
    }
  };

  const upsertBrandKit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((file) => formData.append(key, file));
      } else if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    try {
      await brandkitService.upsertBrandKit(formData);
      toast.success("Brand Kit saved successfully");
      fetchBrandKit();
    } catch (error) {
      console.error("Error saving brand kit:", error);
      toast.error("Failed to save brand kit");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (
    fieldName: string,
    event: any,
    isMultiple = false
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (isMultiple) {
        const updatedFiles = [
          ...(watch(fieldName) || []),
          ...Array.from(files),
        ];
        setValue(fieldName, updatedFiles);
        setFilePreviews((prev) => ({
          ...prev,
          [fieldName]: updatedFiles,
        }));
      } else {
        setValue(fieldName, files[0]);
        setFilePreviews((prev) => ({
          ...prev,
          [fieldName]: files[0],
        }));
      }
    }
  };

  const handleFileDelete = (fieldName: string, index?: number) => {
    if (index !== undefined) {
      const updatedFiles = [...(watch(fieldName) || [])];
      updatedFiles.splice(index, 1);
      setValue(fieldName, updatedFiles);
      setFilePreviews((prev) => ({
        ...prev,
        [fieldName]: updatedFiles,
      }));
    } else {
      setValue(fieldName, null);
      setFilePreviews((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  const renderFilePreview = (file: File | string | null, fieldName: string) => {
    if (!file) return null;

    const isUrl = typeof file === "string";
    let fileUrl: string | undefined;

    if (isUrl) {
      fileUrl = file;
    } else if (file instanceof File || (file as any) instanceof Blob) {
      fileUrl = URL.createObjectURL(file);
    } else {
      return null; // Prevents trying to render an invalid file
    }

    return (
      <div className="mt-2 flex items-center gap-3 border rounded-lg p-2 bg-gray-50">
        <div
          className="relative flex items-center justify-center w-14 h-14 rounded-lg overflow-hidden border bg-gray-200 cursor-pointer"
          onClick={() => window.open(fileUrl, "_blank")}
        >
          {isUrl || file.type?.startsWith("image/") ? (
            <Image src={fileUrl} alt={fieldName} width={56} height={56} />
          ) : (
            <span className="text-gray-600 text-sm">File</span>
          )}
        </div>
        <div
          className="truncate cursor-pointer text-sm"
          onClick={() => window.open(fileUrl, "_blank")}
        >
          {isUrl ? file.split("/").pop() : file.name}
        </div>
        <ActionIcon
          onClick={() => handleFileDelete(fieldName)}
          size="sm"
          variant="flat"
          color="danger"
          className="ml-auto"
        >
          <PiTrashBold />
        </ActionIcon>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Brand Kit Management</h1>

      {loading && <p>Loading...</p>}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(upsertBrandKit)} className="space-y-6">
          <Tab>
            <Tab.List>
              <Tab.ListItem>Brand Identity</Tab.ListItem>
              <Tab.ListItem>Assets</Tab.ListItem>
              <Tab.ListItem>Guidelines & Story</Tab.ListItem>
            </Tab.List>
            <Tab.Panels>
              {/* Panel 1: Brand Identity */}
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Input
                    label="Brand Kit Name"
                    {...methods.register("name")}
                    placeholder="Enter brand name"
                  />
                  <div>
                    <Upload
                      label="Logo"
                      onChange={(e) => handleFileUpload("logo", e)}
                      accept="img"
                    />
                    {renderFilePreview(filePreviews["logo"], "logo")}
                  </div>
                </div>
              </Tab.Panel>

              {/* Panel 2: Assets */}
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "business_card_files",
                    "letterhead_file",
                    "company_profile",
                    "brand_guidelines",
                    "presentation_templates",
                    "icon_library",
                    "sound_effects",
                    "video_guidelines",
                  ].map((field) => (
                    <div key={field}>
                      <Upload
                        label={field.replace(/_/g, " ").toUpperCase()}
                        onChange={(e) => handleFileUpload(field, e)}
                        accept="imgAndPdf"
                      />
                      {renderFilePreview(filePreviews[field], field)}
                    </div>
                  ))}
                </div>
              </Tab.Panel>

              {/* Panel 3: Guidelines & Story */}
              {/* Panel 3: Guidelines & Story */}
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="col-span-1 w-full">
                    <Textarea
                      label="Brand Voice and Tone"
                      {...methods.register("brand_voice_and_tone")}
                      placeholder="Describe the brand voice and tone"
                      className="w-full"
                    />
                  </div>

                  <div className="col-span-1 w-full">
                    <Textarea
                      label="Brand Story"
                      {...methods.register("brand_story")}
                      placeholder="Describe the brand story"
                      className="w-full"
                    />
                  </div>

                  <div className="col-span-1 w-full">
                    <Textarea
                      label="Brand Mission"
                      {...methods.register("brand_mission")}
                      placeholder="Enter brand mission"
                      className="w-full"
                    />
                  </div>

                  <div className="col-span-1 w-full">
                    <Textarea
                      label="Brand Vision"
                      {...methods.register("brand_vision")}
                      placeholder="Enter brand vision"
                      className="w-full"
                    />
                  </div>

                  <div className="col-span-1 w-full">
                    <Textarea
                      label="Brand Values"
                      {...methods.register("brand_values")}
                      placeholder="Enter brand values"
                      className="w-full"
                    />
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab>

          <FormFooter
            isLoading={loading}
            submitBtnText={loading ? "Saving..." : "Save Brand Kit"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
