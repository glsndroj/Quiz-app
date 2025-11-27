import Navbar from "@/components/Navbar";
import HistorySidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <div className="flex flex-col h-screen">
          <Navbar />

          <div className="flex flex-1">
            <HistorySidebar />
          </div>
        </div>
        <main className="flex-1 p-4">{children}</main>
      </SidebarProvider>
    </>
  );
}
