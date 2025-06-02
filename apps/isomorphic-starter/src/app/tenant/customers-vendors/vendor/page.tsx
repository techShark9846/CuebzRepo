"use client";

import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import VendorsTable from "@/app/shared/vendor/vendors-list/table";
import { routesTenant } from "@/config/routes";

export default function VendorsPage() {
  return (
    <>
      <PageHeader title="Vendors" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href={routesTenant.sales.createVendor}>
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add Vendor
            </Button>
          </Link>
        </div>
      </PageHeader>
      <VendorsTable pageSize={20} />
    </>
  );
}
