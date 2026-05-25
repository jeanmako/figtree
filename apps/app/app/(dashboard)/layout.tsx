import type React from "react";
import { SidebarProvider } from "@figtree/ui/components/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";

type Props = { children: React.ReactNode };

const layout = async ({ children }: Props) => {
  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      <SidebarProvider className="contents">
        <div className="flex flex-1 min-h-0 overflow-hidden relative">
          <AppSidebar />
          <main className="flex-[1_1_auto] bg-background overflow-y-auto rounded-lg">
            <div className="flex w-full h-full">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default layout;
