import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Rocket, 
  Lightbulb,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

export default function Welcome() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .single();

      if (profile?.full_name) {
        setUserName(profile.full_name.split(" ")[0]);
      }
    };
    fetchUserName();
  }, [navigate]);

  const features = [
    {
      icon: Lightbulb,
      title: "Watch Guidance Videos",
      description: "Learn from TEDx talks and IIT professors",
    },
    {
      icon: BookOpen,
      title: "Continue Courses",
      description: "Pick up where you left off with progress tracking",
    },
    {
      icon: Users,
      title: "Join Peer Groups",
      description: "Find students with similar interests globally",
    },
    {
      icon: Rocket,
      title: "Solve Real Problems",
      description: "Work on NGO challenges and hackathons",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Welcome to GrowthPath</title>
        <meta name="description" content="Your personalized growth journey starts now. Let's explore what GrowthPath has to offer." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden relative">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl relative z-10"
        >
          {/* Success checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          {/* Welcome message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              Welcome{userName ? `, ${userName}` : ""}! 🎉
            </h1>
            <p className="text-xl text-muted-foreground">
              Your profile is set up. Let's start your growth journey.
            </p>
          </motion.div>

          {/* What you can do */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-center text-lg font-semibold text-muted-foreground mb-6">
              Here's what awaits you
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-5 rounded-xl bg-card border border-border shadow-soft flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center space-y-4"
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              You can always update your profile later
            </p>
          </motion.div>

          {/* Motivational quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-12 p-6 rounded-2xl gradient-warm text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-lg font-medium text-primary-foreground italic">
              "The best time to start was yesterday. The next best time is now."
            </p>
            <p className="text-primary-foreground/70 text-sm mt-2">— Your journey begins today</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
