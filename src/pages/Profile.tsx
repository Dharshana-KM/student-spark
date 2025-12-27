import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { Helmet } from "react-helmet-async";
import { useRequireAuth } from "@/hooks/useAuth";

const Profile = () => {
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
