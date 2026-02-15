import type { ReactNode } from "react";
import { useCustomerContextProvider } from "ui/context";
import { Header } from "./header";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

export const DashboardLayout = ({ children }: { children?: ReactNode }) => {
  const { customerData, fetching } = useCustomerContextProvider()

  return (
    <div className="min-h-screen bg-[#FDFAEE]">
      <Header userData={customerData} isLoading={fetching} />
      <div className="mx-auto grid max-w-7xl pb-28 gap-6 md:pb-6 p-6 md:grid-cols-[280px_1fr]">
        <Sidebar userData={customerData} isLoading={fetching} />
        <main className="space-y-6">{children}</main>
      </div>
      <MobileNav userData={customerData} />
    </div>
  );
};
