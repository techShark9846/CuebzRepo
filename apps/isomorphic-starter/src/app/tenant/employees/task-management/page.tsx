import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import TasksTable from "@/app/shared/task-management/task-management-list/table";
import { routesTenant } from "../../../../config/routes";

export default function TaskManagementPage() {
  return (
    <>
      <PageHeader title="Task Management" breadcrumb={[]}>
        <div className="mt-4 flex items-center gap-3">
          <Link href={routesTenant.employees.createTaskManagementRecord}>
            <Button>
              <PiPlusBold className="me-1.5 size-[17px]" />
              Add Task
            </Button>
          </Link>
        </div>
      </PageHeader>
      <TasksTable pageSize={20} />
    </>
  );
}
