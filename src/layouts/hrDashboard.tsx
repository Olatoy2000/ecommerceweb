import { ReactNode } from "react";
import HeaderLayout from "./header";
import SidebarLayout from "./sidebar";

export default function HRDashboardLayout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  const { pageLabel = [
    {
      link: "/show-product",
      label: "Show Product"
    },
  ] } = props;
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <HeaderLayout pageLabel={pageLabel} />
      <div className="flex flex-1 overflow-auto">       
        <SidebarLayout />
        <>{children}</>
      </div>
    </div>
  );
}