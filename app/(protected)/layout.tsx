import Navbar from "@/components/Navbar";
import HistorySidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton, SignedIn, ClerkProvider } from "@clerk/nextjs";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SidebarProvider defaultOpen={false}>
        <div className="flex flex-col h-screen w-full justify-center items-center">
          <div className="flex w-full justify-between">
            <Navbar />
          </div>
          <div className="flex w-full h-screen justify-center items-center ">
            <HistorySidebar />
            <main>{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ClerkProvider>
  );
}
