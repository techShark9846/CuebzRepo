"use client";

import cn from "@core/utils/class-names";
import { useIsMounted } from "@core/hooks/use-is-mounted";
import { useWindowScroll } from "@core/hooks/use-window-scroll";

interface StickyHeaderProps {
  className?: string;
  offset?: number;
}

export default function StickyHeader({
  offset = 2,
  className,
  children,
}: React.PropsWithChildren<StickyHeaderProps>) {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  return (
    <header
      className={cn(
        "sticky top-0 z-[9999] flex items-center bg-gray-0/80 p-4 backdrop-blur-xl dark:bg-gray-50/50",
        ((isMounted && windowScroll.y) as number) > offset ? "card-shadow" : "",
        className
      )}
    >
      {children}
    </header>
  );
}
