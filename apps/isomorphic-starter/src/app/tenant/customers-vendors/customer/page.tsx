import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import CustomersTable from "@/app/shared/customers/customers-list/table";
import { routesTenant } from "@/config/routes";

export default function CustomersPage() {
  return (
    <>
      <PageHeader title="Customers" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href={routesTenant.sales.createCustomer}>
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add Customer
            </Button>
          </Link>
        </div>
      </PageHeader>
      <CustomersTable pageSize={20} />
    </>
  );
}
