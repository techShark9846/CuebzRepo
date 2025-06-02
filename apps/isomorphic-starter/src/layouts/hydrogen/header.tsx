// "use client";

// import Link from "next/link";
// import HamburgerButton from "@/layouts/hamburger-button";
// import Sidebar from "@/layouts/hydrogen/sidebar";
// import Logo from "@core/components/logo";
// import HeaderMenuRight from "@/layouts/header-menu-right";
// import StickyHeader from "@/layouts/sticky-header";
// import SearchWidget from "@/app/shared/search/search";

// export default function Header() {
//   return (
//     <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8  4xl:px-10">
//       <div className="sticky top-0 z-40 bg-gray-0/10 dark:bg-gray-100/5 ">
//         <Link
//           href={"/"}
//           aria-label="Site Logo"
//           className="text-gray-800 hover:text-gray-900"
//         >
//           <Logo className="max-w-[155px]" />
//         </Link>
//       </div>
//       <div className="flex w-full max-w-2xl items-center">
//         <HamburgerButton
//           view={<Sidebar className="static w-full 2xl:w-full" />}
//         />
//         <Link
//           href={"/"}
//           aria-label="Site Logo"
//           className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
//         >
//           <Logo iconOnly={true} />
//         </Link>

//         <SearchWidget />
//       </div>

//       <HeaderMenuRight />
//     </StickyHeader>
//   );
// }

"use client";

import Link from "next/link";
import HamburgerButton from "@/layouts/hamburger-button";
import Sidebar from "@/layouts/hydrogen/sidebar";
import Logo from "@core/components/logo";
import HeaderMenuRight from "@/layouts/header-menu-right";
import StickyHeader from "@/layouts/sticky-header";
import SearchWidget from "@/app/shared/search/search";
import Image from "next/image";

function LogoWrapper() {
  return (
    <div className="relative w-[200px] h-16 overflow-hidden bg-white rounded-br-[80px] shadow-md z-10 py-10">
      <Link
        href="/"
        aria-label="Site Logo"
        className="flex items-center h-full pl-4"
      >
        <Image
          src="https://res.cloudinary.com/dw5jruknf/image/upload/v1741951858/cuebz_Pro_rt2mib.png"
          alt="Cuebz Pro Logo"
          width={120}
          height={40}
          priority
          className="object-contain"
        />
      </Link>

      {/* Right curved purple overlay */}
      <div className="absolute -right-16 top-0 w-[180px] h-full rounded-full pointer-events-none" />
    </div>
  );
}

export default function Header() {
  return (
    <StickyHeader className="z-[990] bg-primary text-white h-[80px]  flex items-center justify-between shadow-md border-b-2 border-tertiary">
      <div className="flex items-center gap-8">
        <div className="-ml-4 pr-2">
          {/* <Link href="/" aria-label="Site Logo" className="shrink-0">
            <Logo className="max-w-[120px] text-white" />
          </Link> */}
          <LogoWrapper />
        </div>
        {/* px-4 lg:px-6 */}

        <div className="hidden sm:block text-sm">
          <span className="font-medium text-white/70">Workspace</span>
          <div className="font-semibold text-white leading-none">
            ABC Store Bangalore ▾
          </div>
        </div>
      </div>
      {/* Center: Search */}
      <div className="flex-1 mx-4 max-w-lg hidden md:block">
        <SearchWidget className="w-full" placeholderClassName="text-white/60" />
      </div>
      {/* Right: Profile, Notifications, Settings */}
      <div className="flex items-center gap-4">
        <HeaderMenuRight />
      </div>
    </StickyHeader>
  );
}
