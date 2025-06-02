// "use client";

// import Link from "next/link";
// import cn from "@core/utils/class-names";
// import SimpleBar from "@core/ui/simplebar";
// import Logo from "@core/components/logo";
// import { SidebarMenu } from "./sidebar-menu";
// import WorkSpaceSwitcher from "./work-space-switcher";
// import { useAtom } from "jotai";
// import { currentUserAtom } from "@/store/authAtom";
// import { useEffect, useState } from "react";
// import organizationService from "@/services/organizationService";

// export default function Sidebar({ className }: { className?: string }) {
//   const [currentUser] = useAtom(currentUserAtom);
//   const [organizations, setOrganizations] = useState([]);

//   console.log(currentUser, "heyyyaa");

//   useEffect(() => {
//     // currentUser?.role === "tenant-user"
//     if (
//       currentUser?.role === "tenant-owner" ||
//       currentUser?.role === "tenant-user"
//     ) {
//       fetchOrganization();
//     }
//   }, [currentUser]);

//   const fetchOrganization = async () => {
//     const res = await organizationService.getList({});

//     const data = res.data.map((cur: any) => {
//       return {
//         label: cur.name,
//         value: cur._id,
//         category: cur.business_category,
//       };
//     });
//     setOrganizations(data);
//   };

//   let defaultSelected = currentUser?.selectedOrganization
//     ? {
//         label: currentUser.selectedOrganization.name,
//         value: currentUser.selectedOrganization._id,
//         category: currentUser.selectedOrganization.business_category,
//       }
//     : {};

//   return (
//     <aside
//       className={cn(
//         "fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72",
//         className
//       )}
//     >
//       <SimpleBar className="h-[calc(100%-80px)]">
//         <SidebarMenu />
//       </SimpleBar>
//     </aside>
//   );
// }

// "use client";

// import cn from "@core/utils/class-names";
// import SimpleBar from "@core/ui/simplebar";
// import { SidebarMenu } from "./sidebar-menu";

// export default function Sidebar({ className }: { className?: string }) {
//   return (
//     <aside
//       className={cn(
//         "fixed bottom-0 start-0 z-50 h-full w-[270px] bg-white shadow-sm border-r border-gray-200",
//         className
//       )}
//     >
//       <SimpleBar className="h-full py-6">
//         <SidebarMenu />
//       </SimpleBar>
//     </aside>
//   );
// }

"use client";

import { useState } from "react";
import cn from "@core/utils/class-names";
import SimpleBar from "@core/ui/simplebar";
import { SidebarMenu } from "./sidebar-menu";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Sidebar({ className }: { className?: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] bg-white shadow-lg transition-all duration-200",
        isCollapsed && "w-[70px]",
        className
      )}
    >
      <SimpleBar className="h-[calc(100%-60px)] mt-20">
        {/* Hamburger Toggle */}
        <div className="flex items-center justify-end px-4 py-3 border-b border-gray-200">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Toggle Sidebar"
          >
            <RxHamburgerMenu className="h-5 w-5" />
          </button>
        </div>
        <SidebarMenu isCollapsed={isCollapsed} />
      </SimpleBar>
    </aside>
  );
}

{
  /* <div className="sticky top-0 z-40 bg-gray-0/10 px-6 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link
          href={"/"}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Logo className="max-w-[155px]" />
        </Link>
      </div> */
}

//TODO: Must use later
// {(currentUser?.role === "tenant-owner" ||
//   currentUser?.role === "tenant-user") && (
//   <WorkSpaceSwitcher
//     className="px-6 pb-3.5 pt-3.5"
//     suffixClassName="text-gray-500 w-5 h-5"
//     data={organizations}
//     defaultSelected={defaultSelected}
//   />
// )}
