import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { CoursesContent } from "@/components/courses/CoursesContent";
import { Helmet } from "react-helmet-async";

const Courses = () => {
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
