import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ChequeTrackerTable from "@/app/shared/cheque-tracker/cheque-tracker-list/table";
import { routesTenant } from "@/config/routes";

export default function ChequeTrackerPage() {
  return (
    <>
      <PageHeader title="Cheque Tracker" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href={routesTenant.financials.createChequeTracker}>
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add Cheque Entry
            </Button>
          </Link>
        </div>
      </PageHeader>
      <ChequeTrackerTable pageSize={20} />
    </>
  );
}
