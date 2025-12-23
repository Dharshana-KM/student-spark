import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { PodcastDetailContent } from "@/components/guidance/PodcastDetailContent";
import { Helmet } from "react-helmet-async";

const PodcastDetail = () => {
  return (
    <>
      <Helmet>
        <title>Podcast - GrowthPath</title>
        <meta name="description" content="Listen to guidance from IIT students and professors. Get key takeaways and next steps." />
      </Helmet>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            <PodcastDetailContent />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default PodcastDetail;
