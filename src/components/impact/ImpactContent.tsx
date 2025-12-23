import { motion } from "framer-motion";
import { 
  Rocket, 
  Heart, 
  Leaf, 
  GraduationCap, 
  Users, 
  Zap,
  Search,
  Calendar,
  MapPin,
  Trophy,
  ArrowRight,
  Building,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const categoryIcons: Record<string, React.ElementType> = {
  "Environment": Leaf,
  "Healthcare": Heart,
  "Education": GraduationCap,
  "Community": Users,
  "Tech": Zap,
};

const categoryColors: Record<string, string> = {
  "Environment": "bg-success/10 text-success border-success/20",
  "Healthcare": "bg-destructive/10 text-destructive border-destructive/20",
  "Education": "bg-info/10 text-info border-info/20",
  "Community": "bg-warning/10 text-warning border-warning/20",
  "Tech": "bg-primary/10 text-primary border-primary/20",
};

interface Problem {
  id: string;
  title: string;
  description: string;
  organization: string;
  organizationType: "NGO" | "College" | "Startup" | "Community";
  category: string;
  location: string;
  solversNeeded: number;
  currentSolvers: number;
  deadline?: string;
}

interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  date: string;
  location: string;
  prize: string;
  category: string;
  registrations: number;
  isOpen: boolean;
}

const problems: Problem[] = [
  {
    id: "p1",
    title: "Rural Water Quality Monitoring System",
    description: "Design an affordable IoT solution to monitor water quality in remote villages and alert authorities about contamination.",
    organization: "Clean Water India NGO",
    organizationType: "NGO",
    category: "Environment",
    location: "Pan India",
    solversNeeded: 5,
    currentSolvers: 2,
    deadline: "Jan 30, 2025"
  },
  {
    id: "p2",
    title: "Mental Health Chatbot for Students",
    description: "Create an AI-powered chatbot that provides initial mental health support and connects students with counselors.",
    organization: "IIT Bombay Wellness Center",
    organizationType: "College",
    category: "Healthcare",
    location: "Mumbai",
    solversNeeded: 4,
    currentSolvers: 3,
  },
  {
    id: "p3",
    title: "Accessible Learning Platform for Visually Impaired",
    description: "Build an audio-first learning platform with screen reader optimization for visually impaired students.",
    organization: "EduAccess Foundation",
    organizationType: "NGO",
    category: "Education",
    location: "Remote",
    solversNeeded: 6,
    currentSolvers: 1,
    deadline: "Feb 15, 2025"
  },
  {
    id: "p4",
    title: "Local Business Discovery App",
    description: "Create a hyperlocal app to help community members discover and support small businesses in their neighborhood.",
    organization: "Neighbourhood Connect",
    organizationType: "Community",
    category: "Community",
    location: "Bengaluru",
    solversNeeded: 3,
    currentSolvers: 0,
  },
  {
    id: "p5",
    title: "Smart Waste Segregation System",
    description: "Design an automated waste segregation system using computer vision for residential complexes.",
    organization: "GreenTech Startups",
    organizationType: "Startup",
    category: "Environment",
    location: "Delhi NCR",
    solversNeeded: 4,
    currentSolvers: 2,
    deadline: "Feb 28, 2025"
  },
];

const hackathons: Hackathon[] = [
  {
    id: "h1",
    name: "Climate Tech Challenge 2025",
    organizer: "IIT Delhi & UNDP",
    date: "Jan 15-17, 2025",
    location: "Hybrid",
    prize: "₹5,00,000",
    category: "Environment",
    registrations: 2340,
    isOpen: true,
  },
  {
    id: "h2",
    name: "EduHack 2025",
    organizer: "Ministry of Education",
    date: "Jan 22-24, 2025",
    location: "Virtual",
    prize: "₹3,00,000",
    category: "Education",
    registrations: 1890,
    isOpen: true,
  },
  {
    id: "h3",
    name: "Health Innovation Sprint",
    organizer: "AIIMS & Google",
    date: "Feb 5-7, 2025",
    location: "New Delhi",
    prize: "₹7,00,000",
    category: "Healthcare",
    registrations: 1560,
    isOpen: true,
  },
  {
    id: "h4",
    name: "Smart Cities Hackathon",
    organizer: "Smart Cities Mission",
    date: "Feb 12-14, 2025",
    location: "Multiple Cities",
    prize: "₹10,00,000",
    category: "Tech",
    registrations: 3200,
    isOpen: true,
  },
];

const categories = ["All", "Environment", "Healthcare", "Education", "Community", "Tech"];

export function ImpactContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || hackathon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
          Impact Board
        </h1>
        <p className="text-muted-foreground text-lg">
          Solve real problems. Make real impact. Grow as you contribute.
        </p>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-4 rounded-xl gradient-secondary"
      >
        <p className="text-center text-secondary-foreground font-medium italic">
          "The best way to learn is by doing. The best way to grow is by helping."
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search problems and hackathons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat !== "All" ? categoryIcons[cat] : Rocket;
            return (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                <Icon className="w-4 h-4 mr-1" />
                {cat}
              </Button>
            );
          })}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="problems" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="problems">
            <Rocket className="w-4 h-4 mr-2" />
            Problems ({filteredProblems.length})
          </TabsTrigger>
          <TabsTrigger value="hackathons">
            <Trophy className="w-4 h-4 mr-2" />
            Hackathons ({filteredHackathons.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="problems" className="space-y-4">
          {filteredProblems.map((problem, index) => {
            const CategoryIcon = categoryIcons[problem.category] || Rocket;
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${categoryColors[problem.category]}`}>
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={categoryColors[problem.category]}>
                        {problem.category}
                      </Badge>
                      <Badge variant="secondary">
                        {problem.organizationType}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold">{problem.title}</h3>
                    <p className="text-muted-foreground">{problem.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {problem.organization}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {problem.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {problem.currentSolvers}/{problem.solversNeeded} solvers
                      </div>
                      {problem.deadline && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {problem.deadline}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button variant="default" className="shrink-0">
                    Join as Solver
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </TabsContent>

        <TabsContent value="hackathons" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredHackathons.map((hackathon, index) => {
              const CategoryIcon = categoryIcons[hackathon.category] || Trophy;
              return (
                <motion.div
                  key={hackathon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColors[hackathon.category]}`}>
                      <CategoryIcon className="w-6 h-6" />
                    </div>
                    <Badge variant={hackathon.isOpen ? "default" : "secondary"}>
                      {hackathon.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-display font-semibold mb-2">{hackathon.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{hackathon.organizer}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span className="font-medium">{hackathon.prize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{hackathon.registrations.toLocaleString()} registered</span>
                    </div>
                  </div>

                  <Button variant="default" className="w-full">
                    Register Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
