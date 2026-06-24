import { PageContent } from "@/components/layout/page-content"
import { Header } from "@figtree/ui/components/shared/section-layout"

const DashboardPage = async (): Promise<React.ReactElement> => {
  return (
    <PageContent>
      <Header
        title="Good afternoon, Mike."
        className="[&_h2]:mt-0 [&_h2]:text-left"
      />
    </PageContent>
  )
}

export default DashboardPage
