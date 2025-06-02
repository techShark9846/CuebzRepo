import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import RolesUserTable from "@/app/shared/roles-user/roles-user-list/table";
import { routesTenant } from "@/config/routes";

export default function RolesUserPage() {
  return (
    <>
      <PageHeader title="Roles & Users" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href={routesTenant.rolesUser.createRoleUser}>
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add User Role
            </Button>
          </Link>
        </div>
      </PageHeader>
      <RolesUserTable pageSize={20} />
    </>
  );
}
