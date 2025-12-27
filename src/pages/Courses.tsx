import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { CoursesContent } from "@/components/courses/CoursesContent";
import { Helmet } from "react-helmet-async";
import { useRequireAuth } from "@/hooks/useAuth";

const Courses = () => {
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
        <title>Courses - GrowthPath</title>
        <meta name="description" content="Skill-based and career-oriented courses with progress tracking. Continue where you left off." />
      </Helmet>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            <CoursesContent />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Courses;
