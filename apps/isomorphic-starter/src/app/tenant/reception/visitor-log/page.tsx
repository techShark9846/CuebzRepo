import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import VisitorsTable from "@/app/shared/visitor-log/visitor-log-list/table";

export default function VisitorsPage() {
  return (
    <>
      <PageHeader title="Visitors" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href="/tenant/reception/visitor-log/create">
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add Visitor
            </Button>
          </Link>
        </div>
      </PageHeader>
      <VisitorsTable pageSize={20} />
    </>
  );
}
