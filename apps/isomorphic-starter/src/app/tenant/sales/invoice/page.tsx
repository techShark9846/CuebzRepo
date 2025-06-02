import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import InvoicesTable from "@/app/shared/invoice/invoice-list/table";
import { routesTenant } from "@/config/routes";

export default function InvoicesPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader title="Invoices" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href={routesTenant.salesManagement.createInvoice}>
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add Invoice
            </Button>
          </Link>
        </div>
      </PageHeader>

      {/* Invoices Table with Pagination */}
      <InvoicesTable pageSize={20} />
    </>
  );
}
