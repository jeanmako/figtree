import { BreadcrumbLg } from "@/components/layout/breadcrumb-lg"
import { PageContent } from "@/components/layout/page-content"
import { PageWidthWrapper } from "@/components/layout/page-content/page-width-wrapper"
import { Icons } from "@figtree/ui/components/icons"

export const ServicesNewForm = () => {
  return (
    <PageContent className="**:data-[slot=child-parent]:flex **:data-[slot=child-parent]:flex-col **:data-[slot=child-parent]:items-center">
      <PageWidthWrapper className="max-w-4xl">
        <BreadcrumbLg
          href="/services"
          icon={<Icons.briefcase2 />}
          backTo="Services"
          label="New service"
        />
      </PageWidthWrapper>
    </PageContent>
  )
}
