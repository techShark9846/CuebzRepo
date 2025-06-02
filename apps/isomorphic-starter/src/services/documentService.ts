import axiosClient from "./axiosClient";

const documentService = {
  // ✅ Get document by Tenant and Organization ID
  getDocument: async () => {
    const response = await axiosClient.get("/document/tenant");
    return response.data;
  },

  // ✅ Upsert (Create or Update) a document (supports file uploads)
  upsertDocument: async (data: any) => {
    const response = await axiosClient.post("/document/tenant", data, {
      headers: { "Content-Type": "multipart/form-data" }, // Required for file uploads
    });
    return response.data;
  },
};

export default documentService;
