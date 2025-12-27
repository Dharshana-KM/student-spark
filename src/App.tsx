import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Guidance from "./pages/Guidance";
import Courses from "./pages/Courses";
import Impact from "./pages/Impact";
import Teams from "./pages/Teams";
import Profile from "./pages/Profile";
import PodcastDetail from "./pages/PodcastDetail";
import Welcome from "./pages/Welcome";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/guidance" element={<Guidance />} />
              <Route path="/guidance/:id" element={<PodcastDetail />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
