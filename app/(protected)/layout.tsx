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
        <div className="flex flex-col h-screen">
          <div className="flex justify-between">
            <Navbar />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div className="flex flex-1">
            <HistorySidebar />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ClerkProvider>
  );
}
