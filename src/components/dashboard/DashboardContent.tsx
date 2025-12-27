import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  BookOpen, 
  Users, 
  Rocket, 
  ArrowRight, 
  Play,
  Quote,
  Lightbulb,
  Target,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const motivationalQuotes = [
  { quote: "You're not late. Everyone starts somewhere.", author: "GrowthPath Community" },
  { quote: "Small steps every day lead to big changes.", author: "A Senior at IIT Bombay" },
  { quote: "Learn. Build. Solve. Grow.", author: "Our Philosophy" },
  { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { quote: "Your only limit is your mind.", author: "Unknown" },
];

interface ProfileData {
  full_name: string;
  interests: string[];
  skills: string[];
  career_goal: string;
}

const quickActions = [
  {
    icon: Lightbulb,
    title: "Watch Guidance",
    description: "TEDx & IIT talks",
    link: "/guidance",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    title: "Continue Learning",
    description: "Pick up your courses",
    link: "/courses",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Users,
    title: "Find Your Team",
    description: "Connect with peers",
    link: "/teams",
    color: "bg-success/10 text-success",
  },
  {
    icon: Rocket,
    title: "Solve Problems",
    description: "NGO & Hackathons",
    link: "/impact",
    color: "bg-accent/20 text-accent-foreground",
  },
];

const stats = [
  { label: "Courses Started", value: 3, icon: BookOpen, color: "text-primary" },
  { label: "Problems Solved", value: 5, icon: Rocket, color: "text-secondary" },
  { label: "Team Members", value: 4, icon: Users, color: "text-success" },
];

const recommendedGuidance = [
  { 
    title: "The Power of Believing You Can Improve", 
    speaker: "Carol Dweck",
    duration: "10 min",
    id: "1"
  },
  { 
    title: "How to Find Work You Love", 
    speaker: "Scott Dinsmore",
    duration: "18 min",
    id: "2"
  },
];

const upcomingHackathons = [
  { name: "Climate Tech Challenge", date: "Jan 15, 2025", category: "Environment" },
  { name: "EduHack 2025", date: "Jan 22, 2025", category: "Education" },
];

export function DashboardContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from("profiles")
        .select("full_name, interests, skills, career_goal")
        .eq("user_id", user.id)
        .single();
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFirstName = () => {
    if (profile?.full_name) {
      return profile.full_name.split(" ")[0];
    }
    return "there";
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Personalized Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
          Good {getTimeOfDay()}, {getFirstName()}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          {profile?.career_goal 
            ? `Working towards: ${profile.career_goal}`
            : "Let's continue your growth journey today."}
        </p>
      </motion.div>

      {/* Motivational Quote Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 rounded-2xl gradient-warm shadow-card"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
            <Quote className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xl font-medium text-primary-foreground italic mb-2">
              "{randomQuote.quote}"
            </p>
            <p className="text-primary-foreground/70 text-sm">— {randomQuote.author}</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions - Your Journey Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display font-semibold">Your Growth Path</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
            >
              <Link
                to={action.link}
                className="block p-5 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card hover:border-primary/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="p-5 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </div>
            <p className="text-3xl font-display font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recommended Guidance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-soft"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-semibold">Recommended For You</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/guidance">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="space-y-4">
            {recommendedGuidance.map((item) => (
              <Link
                key={item.id}
                to={`/guidance/${item.id}`}
                className="block p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.speaker} • {item.duration}</p>
                  </div>
                  <Button size="sm" variant="secondary">
                    <Play className="w-4 h-4 mr-1" /> Watch
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-soft"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-display font-semibold">Continue Learning</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/courses">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Introduction to Machine Learning</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="h-2 mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Module 3: Neural Networks</span>
                <Button size="sm" variant="secondary" asChild>
                  <Link to="/courses">
                    <Play className="w-4 h-4 mr-1" /> Continue
                  </Link>
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Web Development Bootcamp</span>
                <span className="text-sm text-muted-foreground">22%</span>
              </div>
              <Progress value={22} className="h-2 mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Module 2: CSS Flexbox</span>
                <Button size="sm" variant="secondary" asChild>
                  <Link to="/courses">
                    <Play className="w-4 h-4 mr-1" /> Continue
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Hackathons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="p-6 rounded-2xl bg-card border border-border shadow-soft"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-display font-semibold">Upcoming Opportunities</h2>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/impact">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {upcomingHackathons.map((hackathon, index) => (
            <Link
              key={index}
              to="/impact"
              className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-md bg-secondary/10 text-secondary text-xs font-medium">
                  {hackathon.category}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{hackathon.name}</h3>
              <p className="text-sm text-muted-foreground">{hackathon.date}</p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Profile Completion Prompt */}
      {profile && (!profile.skills?.length || !profile.interests?.length) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="p-6 rounded-2xl bg-primary/5 border border-primary/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Complete your profile</h3>
              <p className="text-sm text-muted-foreground">
                Add your skills and interests to get better recommendations
              </p>
            </div>
            <Button asChild>
              <Link to="/profile">Update Profile</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
