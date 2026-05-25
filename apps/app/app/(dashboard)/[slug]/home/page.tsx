import { PageContent } from "@/components/layout/page-content";
import { Icons } from "@figtree/ui/components/icons";
import { Header } from "@figtree/ui/components/shared/section-layout";

const DashboardPage = async (): Promise<React.ReactElement> => {
  return (
    <PageContent title="Home" icon={<Icons.home />}>
      <Header
        title="Good afternoon, Mike."
        className="[&_h2]:mt-0 [&_h2]:text-left"
      />
    </PageContent>
  );
};

export default DashboardPage;
