import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TeamsContent } from "@/components/teams/TeamsContent";
import { Helmet } from "react-helmet-async";

const Teams = () => {
  return (
    <>
      <Helmet>
        <title>Teams - GrowthPath</title>
        <meta name="description" content="Find students with similar interests and build together. Form or join teams for hackathons and projects." />
      </Helmet>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            <TeamsContent />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Teams;
