import { SidebarProvider } from "@figtree/ui/components/sidebar"
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import { DashboardHeader } from "@/components/layout/header"

type Props = { children: React.ReactNode }

const layout = async ({ children }: Props) => {
  return (
    <div className="flex min-h-svh w-full flex-col bg-super">
      <SidebarProvider className="contents">
        <DashboardHeader />
        <div className="fixed h-full w-full overflow-clip">
          <AppSidebar />
          <main className="mt-14 flex h-full min-w-0 flex-[1_1_auto] items-stretch overflow-hidden rounded-t-[12px] bg-background ps-60">
            <div className="flex h-full w-full">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default layout
