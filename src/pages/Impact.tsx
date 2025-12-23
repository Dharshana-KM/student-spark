import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ImpactContent } from "@/components/impact/ImpactContent";
import { Helmet } from "react-helmet-async";

const Impact = () => {
  return (
    <>
      <Helmet>
        <title>Impact Board - GrowthPath</title>
        <meta name="description" content="Solve real-world problems from NGOs, startups, and communities. Join hackathons and make an impact." />
      </Helmet>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            <ImpactContent />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Impact;
