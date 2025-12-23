import { motion } from "framer-motion";
import { 
  TrendingUp, 
  BookOpen, 
  Users, 
  Rocket, 
  ArrowRight, 
  Play,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const motivationalQuotes = [
  { quote: "You're not late. Everyone starts somewhere.", author: "GrowthPath Community" },
  { quote: "Small steps every day lead to big changes.", author: "A Senior at IIT Bombay" },
  { quote: "Learn. Build. Solve. Grow.", author: "Our Philosophy" },
];

const stats = [
  { label: "Courses Started", value: 3, icon: BookOpen, color: "text-primary" },
  { label: "Problems Solved", value: 5, icon: Rocket, color: "text-secondary" },
  { label: "Team Members", value: 4, icon: Users, color: "text-success" },
];

const recentActivity = [
  { title: "Started 'Introduction to ML'", time: "2 hours ago", type: "course" },
  { title: "Joined Team Green Earth", time: "Yesterday", type: "team" },
  { title: "Completed: 'Career Clarity' podcast", time: "2 days ago", type: "guidance" },
];

const upcomingHackathons = [
  { name: "Climate Tech Challenge", date: "Jan 15, 2025", category: "Environment" },
  { name: "EduHack 2025", date: "Jan 22, 2025", category: "Education" },
];

export function DashboardContent() {
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Let's continue your growth journey today.
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

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
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
        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-soft"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold">Continue Learning</h2>
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
                <Button size="sm" variant="secondary">
                  <Play className="w-4 h-4 mr-1" /> Continue
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
                <Button size="sm" variant="secondary">
                  <Play className="w-4 h-4 mr-1" /> Continue
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-soft"
        >
          <h2 className="text-xl font-display font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
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
          <h2 className="text-xl font-display font-semibold">Upcoming Hackathons</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/impact">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {upcomingHackathons.map((hackathon, index) => (
            <div key={index} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-md bg-secondary/10 text-secondary text-xs font-medium">
                  {hackathon.category}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{hackathon.name}</h3>
              <p className="text-sm text-muted-foreground">{hackathon.date}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
