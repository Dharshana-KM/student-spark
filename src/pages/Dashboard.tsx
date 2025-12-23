import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - GrowthPath</title>
        <meta name="description" content="Your personal growth dashboard. Track progress, find opportunities, and connect with peers." />
      </Helmet>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            <DashboardContent />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;
