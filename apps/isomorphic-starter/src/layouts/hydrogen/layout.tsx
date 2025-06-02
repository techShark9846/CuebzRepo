import { useAtom } from "jotai";
import Header from "./header";
import Sidebar from "./sidebar";
import { currentUserAtom } from "@/store/authAtom";

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser] = useAtom(currentUserAtom);
  // flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]
  return (
    <main className="min-h-screen flex-grow">
      <div className="">
        <Header />
        <Sidebar className="fixed hidden xl:block dark:bg-gray-50" />
        <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
          <div className="flex flex-grow flex-col pr-4 pb-6 pt-2 md:pr-3 lg:pr-4 lg:pb-8 3xl:pr-8 3xl:pt-4 4xl:pr-10 4xl:pb-9">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
