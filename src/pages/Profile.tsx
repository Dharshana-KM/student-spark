import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile - GrowthPath</title>
        <meta name="description" content="Your student profile. Connect with LinkedIn and GitHub to showcase your work globally." />
      </Helmet>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            <ProfileContent />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Profile;
