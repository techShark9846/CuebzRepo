import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import LeadsTable from "@/app/shared/leads/lead-list/table";
import { routesTenant } from "@/config/routes";

export default function LeadsPage() {
  return (
    <>
      <PageHeader title="Leads" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href={routesTenant.salesManagement.createLead}>
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add Lead
            </Button>
          </Link>
        </div>
      </PageHeader>
      <LeadsTable pageSize={20} />
    </>
  );
}
