"use client";

import { Drawer, Input } from "rizzui";
import { HiOutlineTrash, HiOutlinePencil, HiDownload } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import clsx from "clsx";

type EditDocumentDrawerProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  document: {
    label: string;
    file: string | null;
    expiry_date: string | null;
  };
};

export default function EditDocumentDrawer({
  open,
  onClose,
  onSubmit,
  document,
}: EditDocumentDrawerProps) {
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  useEffect(() => {
    if (document) {
      reset({
        expiry_date: document.expiry_date?.slice(0, 10) || "",
        file: null,
      });
    }
  }, [document, reset]);

  const fileUrl = typeof document.file === "string" ? document.file : "";
  const fileName = fileUrl?.split("/")?.pop() || "No File";

  const handleSubmitData = (data: any) => {
    const formData = new FormData();
    formData.append("expiry_date", data.expiry_date);
    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }
    onSubmit(formData);
  };

  return (
    <Drawer isOpen={open} onClose={onClose} size="sm">
      <form onSubmit={handleSubmit(handleSubmitData)} className="space-y-6 p-5">
        {/* Upload Section */}
        <label
          htmlFor="file-upload"
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl py-10 flex flex-col items-center text-center text-gray-500"
        >
          <div className="text-xl">📤</div>
          <p className="font-medium">Drop or Select file</p>
          <p className="text-xs text-gray-400">
            Drop Files here or click browse thorough your machine
          </p>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            {...register("file")}
            className="hidden"
          />
        </label>

        {/* File Card */}
        <div className="bg-white border rounded-xl p-4">
          <div className="font-semibold mb-2">{document.label}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-red-600 font-semibold">📄 PDF</span>
            <span className="truncate">{fileName}</span>
            <div className="ml-auto flex items-center gap-3">
              <label htmlFor="file-upload">
                <HiOutlinePencil className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800" />
              </label>
              {fileUrl && (
                <HiDownload
                  onClick={() => window.open(fileUrl, "_blank")}
                  className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800"
                />
              )}
              <HiOutlineTrash
                onClick={() => setValue("file", null)}
                className="w-4 h-4 cursor-pointer text-gray-500 hover:text-red-600"
              />
            </div>
          </div>

          <div className="mt-4">
            <Input
              label="Set Expiry Date"
              type="date"
              {...register("expiry_date")}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-[#7E22CE] hover:bg-[#6b1bb5] rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </Drawer>
  );
}
