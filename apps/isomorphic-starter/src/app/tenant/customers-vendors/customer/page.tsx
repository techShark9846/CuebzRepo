import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import CustomersTable from "@/app/shared/customers/customers-list/table";
import { routesTenant } from "@/config/routes";

export default function CustomersPage() {
  return (
    <>
      <PageHeader title="Customers" breadcrumb={[]}></PageHeader>
      <CustomersTable pageSize={20} />
    </>
  );
}
