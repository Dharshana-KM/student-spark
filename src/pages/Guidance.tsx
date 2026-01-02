import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { GuidanceContent } from "@/components/guidance/GuidanceContent";
import { Helmet } from "react-helmet-async";
import { useRequireAuth } from "@/hooks/useAuth";

const Guidance = () => {
  const { user, loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

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
