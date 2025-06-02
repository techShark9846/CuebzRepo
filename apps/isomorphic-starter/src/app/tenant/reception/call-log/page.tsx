import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import CallLogsTable from "@/app/shared/call-log/call-log-list/table";
import { routesTenant } from "@/config/routes";

export default function CallLogsPage() {
  return (
    <>
      <PageHeader title="Call Logs" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href={routesTenant.reception.createCallLog}>
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add Call Log
            </Button>
          </Link>
        </div>
      </PageHeader>
      <CallLogsTable pageSize={20} />
    </>
  );
}
