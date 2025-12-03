"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  useSidebar,
  SidebarTrigger,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

type Article = {
  id: number;
  title: string;
};

export default function HistorySidebar() {
  const { articles, isLoaded, state } = useSidebar();

  return (
    <Sidebar className="mt-15">
      <SidebarHeader className="relative">
        <SidebarTrigger className=" absolute right-2 " />
      </SidebarHeader>

      {state == "expanded" && (
        <SidebarContent className="flex flex-col ml-0 p-4 space-y-2 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-3">History</h1>

          {!isLoaded ? (
            <div className="space-y-2 flex gap-2 ">
              <p className="text-sm text-gray-500">Loading articles...</p>
              <Spinner />
            </div>
          ) : articles && articles.length > 0 ? (
            <SidebarMenu>
              {articles.map((article: Article) => (
                <Link
                  key={article.id}
                  href={`/summary/${article.id}`}
                  className="block p-3  hover:bg-gray-200 rounded-lg transition duration-150 truncate text-sm"
                  title={article.title}
                >
                  {article.title}
                </Link>
              ))}
            </SidebarMenu>
          ) : (
            <p className="text-gray-400 text-sm mt-4 p-2">
              No article, Please create article.
            </p>
          )}
        </SidebarContent>
      )}
    </Sidebar>
  );
}
