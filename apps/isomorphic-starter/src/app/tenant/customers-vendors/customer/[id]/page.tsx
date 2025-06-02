"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tab, Button } from "rizzui";
import customerService from "@/services/customerService";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import { MdArrowBack } from "react-icons/md";

export default function CustomerDetailsPage() {
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id }: { id: string } = useParams(); // ✅ Extracts Customer ID from URL

  useEffect(() => {
    if (id) {
      fetchCustomerDetails();
    }
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      const response = await customerService.getById(id);
      if (response?.data) {
        setCustomer(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch customer details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-600">
          Customer details not found.
        </h2>
        <Button className="mt-4" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="px-4 py-2"
        >
          <MdArrowBack className="mr-2" /> Back
        </Button>
        <h1 className="text-3xl font-bold">Customer Details</h1>
      </div>

      {/* Tab Layout */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <Tab>
          <Tab.List className="border-b px-6 pt-4 bg-gray-50">
            <Tab.ListItem>Personal Info</Tab.ListItem>
            <Tab.ListItem>Address</Tab.ListItem>
            <Tab.ListItem>Additional Info</Tab.ListItem>
          </Tab.List>
          <Tab.Panels className="p-6">
            {/* Personal Info */}
            <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DetailRow label="Full Name" value={customer.full_name} />
                <DetailRow label="Email" value={customer.email} />
                <DetailRow label="Phone Number" value={customer.phone_number} />
                <DetailRow
                  label="Date of Birth"
                  value={formatDate(customer.date_of_birth)}
                />
                <DetailRow
                  label="Customer Type"
                  value={customer.customer_type}
                />
                <DetailRow
                  label="Assigned To"
                  value={customer.assigned_to?.full_name || "N/A"}
                />
              </div>
            </Tab.Panel>

            {/* Address */}
            <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DetailRow
                  label="Street"
                  value={customer.address?.street || "N/A"}
                />
                <DetailRow
                  label="City"
                  value={customer.address?.city || "N/A"}
                />
                <DetailRow
                  label="State"
                  value={customer.address?.state || "N/A"}
                />
                <DetailRow
                  label="Postal Code"
                  value={customer.address?.postal_code || "N/A"}
                />
                <DetailRow
                  label="Country"
                  value={customer.address?.country || "N/A"}
                />
              </div>
            </Tab.Panel>

            {/* Additional Info */}
            <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DetailRow
                  label="Created By"
                  value={customer.createdBy?.name}
                />
                <DetailRow
                  label="Created At"
                  value={formatDate(customer.createdAt)}
                />
                <DetailRow
                  label="Updated At"
                  value={formatDate(customer.updatedAt)}
                />
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Notes</h3>
              <div className="p-4 border rounded-lg bg-gray-100">
                <p className="text-gray-700">
                  {customer.notes || "No notes available."}
                </p>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab>
      </div>
    </div>
  );
}

/* Utility function to format date using Day.js */
const formatDate = (dateString: string) => {
  return dateString ? dayjs(dateString).format("DD-MMM-YYYY") : "N/A";
};

/* Component for displaying detail rows */
const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className="text-gray-800 text-lg font-semibold">{value || "N/A"}</p>
    </div>
  );
};
