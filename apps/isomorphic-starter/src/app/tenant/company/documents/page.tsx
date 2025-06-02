"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Tab, ActionIcon } from "rizzui";
import Upload from "@core/ui/upload";
import documentService from "@/services/documentService";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { PiTrashBold } from "react-icons/pi";
import FormFooter from "@core/components/form-footer";

export default function DocumentManagementPage() {
  const methods = useForm();
  const { handleSubmit, setValue, watch, reset } = methods;

  const [filePreviews, setFilePreviews] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    setLoading(true);
    try {
      const response = await documentService.getDocument();
      if (response?.data) {
        reset(response.data);
        setFilePreviews({
          ...response.data.section_1,
          ...response.data.section_2,
        });
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  const upsertDocument = async (data: any) => {
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
      await documentService.upsertDocument(formData);
      toast.success("Document saved successfully");
      fetchDocument();
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Failed to save document");
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

  const renderSingleFilePreview = (
    file: File | string | null,
    fieldName: string
  ) => {
    if (!file) return null;
    const isUrl = typeof file === "string";
    const fileUrl = isUrl ? file : URL.createObjectURL(file);

    return (
      <div className="flex items-center mt-2 border px-3 py-2 rounded-xl">
        <div
          className="relative flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden border bg-gray-50 cursor-pointer"
          onClick={() => window.open(fileUrl, "_blank")}
        >
          {isUrl || file.type.startsWith("image/") ? (
            <Image src={fileUrl} alt={fieldName} width={48} height={48} />
          ) : (
            <span className="text-gray-600">File</span>
          )}
        </div>
        <div
          className="ml-3 truncate cursor-pointer"
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
          className="flex items-center mt-2 border px-3 py-2 rounded-xl"
        >
          <div
            className="relative flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden border bg-gray-50 cursor-pointer"
            onClick={() => window.open(fileUrl, "_blank")}
          >
            {isUrl || file.type.startsWith("image/") ? (
              <Image
                src={fileUrl}
                alt={`${fieldName}-${index}`}
                width={48}
                height={48}
              />
            ) : (
              <span className="text-gray-600">File</span>
            )}
          </div>
          <div
            className="ml-3 truncate cursor-pointer"
            onClick={() => window.open(fileUrl, "_blank")}
          >
            {isUrl ? file.split("/").pop() : file.name}
          </div>
          <ActionIcon
            onClick={() => handleFileDelete(fieldName, index)}
            size="sm"
            variant="flat"
            color="danger"
            className="ml-auto"
          >
            <PiTrashBold />
          </ActionIcon>
        </div>
      );
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Document Management</h1>

      {loading && <p>Loading...</p>}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(upsertDocument)} className="space-y-6">
          <Tab>
            <Tab.List>
              <Tab.ListItem>Legal Documents</Tab.ListItem>
              <Tab.ListItem>Business Documents</Tab.ListItem>
            </Tab.List>
            <Tab.Panels>
              {/* Panel 1: Legal Documents */}
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "trade_license",
                    "moa",
                    "aoa",
                    "emigration_card",
                    "certificate_of_incorporation",
                    "shareholder_agreement",
                    "tenancy_contract_or_ejari",
                    "vat_registration_certificate",
                    "corporate_tax_certificate",
                  ].map((field) => (
                    <div key={field}>
                      <Upload
                        label={field.replace(/_/g, " ").toUpperCase()}
                        onChange={(e) => handleFileUpload(field, e)}
                        accept="imgAndPdf"
                      />
                      {renderSingleFilePreview(filePreviews[field], field)}
                    </div>
                  ))}
                  {["passport_copies", "visa_residence_permits"].map(
                    (field) => (
                      <div key={field}>
                        <Upload
                          label={field.replace(/_/g, " ").toUpperCase()}
                          onChange={(e) => handleFileUpload(field, e, true)}
                          accept="imgAndPdf"
                          multiple
                        />
                        {renderMultipleFilePreviews(filePreviews[field], field)}
                      </div>
                    )
                  )}
                </div>
              </Tab.Panel>

              {/* Panel 2: Business Documents */}
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "business_plan_document",
                    "bank_statement",
                    "power_of_attorney",
                    "insurance_policies",
                    "employee_handbook_or_hr_policies",
                    "intellectual_property_registrations",
                    "trade_mark_certificate",
                    "iso_certification",
                  ].map((field) => (
                    <div key={field}>
                      <Upload
                        label={field.replace(/_/g, " ").toUpperCase()}
                        onChange={(e) => handleFileUpload(field, e)}
                        accept="imgAndPdf"
                      />
                      {renderSingleFilePreview(filePreviews[field], field)}
                    </div>
                  ))}
                  {["company_policies", "contract_templates"].map((field) => (
                    <div key={field}>
                      <Upload
                        label={field.replace(/_/g, " ").toUpperCase()}
                        onChange={(e) => handleFileUpload(field, e, true)}
                        accept="imgAndPdf"
                        multiple
                      />
                      {renderMultipleFilePreviews(filePreviews[field], field)}
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab>

          {/* <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Document"}
          </Button> */}

          <FormFooter
            isLoading={loading}
            submitBtnText={loading ? "Saving..." : "Save Document"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
