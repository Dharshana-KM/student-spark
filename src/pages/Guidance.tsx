import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { GuidanceContent } from "@/components/guidance/GuidanceContent";
import { Helmet } from "react-helmet-async";

const Guidance = () => {
  return (
    <>
      <Helmet>
        <title>Guidance Hub - GrowthPath</title>
        <meta name="description" content="Learn from IIT students and professors through podcasts and videos. Get career guidance and mentorship." />
      </Helmet>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            <GuidanceContent />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Guidance;
