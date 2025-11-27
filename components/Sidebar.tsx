"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function HistorySidebar() {
  const sidebar = useSidebar();
  return (
    <Sidebar className="mt-15">
      <SidebarHeader className="relative">
        <SidebarTrigger className=" absolute right-2 " />
      </SidebarHeader>

      {sidebar?.state == "expanded" && (
        <SidebarContent className="flex flex-col ml-5">
          <h1 className="text-2xl font-semibold">History</h1>
        </SidebarContent>
      )}
    </Sidebar>
  );
}
