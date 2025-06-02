import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import QuotationsTable from "@/app/shared/quotation/quotation-list/table";
import { routesTenant } from "@/config/routes";

export default function QuotationsPage() {
  return (
    <>
      <PageHeader title="Quotations" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href={routesTenant.salesManagement.createQuotation}>
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add Quotation
            </Button>
          </Link>
        </div>
      </PageHeader>
      <QuotationsTable pageSize={20} />
    </>
  );
}
