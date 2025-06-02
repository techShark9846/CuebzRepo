// "use client";

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import { Modal } from "rizzui";
// import SearchTrigger from "./search-trigger";
// import SearchList from "./search-list";

// export default function SearchWidget({
//   className,
//   placeholderClassName,
//   icon,
// }: {
//   className?: string;
//   icon?: React.ReactNode;
//   placeholderClassName?: string;
// }) {
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const onKeyDown = (event: KeyboardEvent) => {
//       if ((event.metaKey || event.ctrlKey) && event.key === "k") {
//         event.preventDefault();
//         setOpen(!open);
//       }
//     };
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [open]);

//   const pathname = usePathname();
//   useEffect(() => {
//     setOpen(() => false);
//     return () => setOpen(() => false);
//   }, [pathname]);

//   return (
//     <>
//       <SearchTrigger
//         icon={icon}
//         className={className}
//         onClick={() => setOpen(true)}
//         placeholderClassName={placeholderClassName}
//       />

//       <Modal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
//         containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
//         className="z-[9999]"
//       >
//         <SearchList onClose={() => setOpen(false)} />
//       </Modal>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "rizzui";
import SearchTrigger from "./search-trigger";
import SearchList from "./search-list";

export default function SearchWidget({
  className,
  placeholderClassName,
  icon,
}: {
  className?: string;
  icon?: React.ReactNode;
  placeholderClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const pathname = usePathname();
  useEffect(() => {
    setOpen(() => false);
    return () => setOpen(() => false);
  }, [pathname]);

  return (
    <>
      <div
        className="hidden md:flex items-center px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 hover:bg-white/20 transition cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <span className="text-sm text-white/90">Search</span>
        <kbd className="ml-3 px-1.5 py-0.5 text-xs font-semibold text-white bg-white/20 rounded">
          Ctrl K
        </kbd>
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
        className="z-[9999]"
      >
        <SearchList onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
