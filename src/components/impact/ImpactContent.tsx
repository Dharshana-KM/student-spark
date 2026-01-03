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
  Globe,
  CheckCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

const categoryIcons: Record<string, React.ElementType> = {
  "Environment": Leaf,
  "Healthcare": Heart,
  "Education": GraduationCap,
  "Community": Users,
  "Tech": Zap,
  "Women Empowerment": Users,
  "Rural Development": Globe,
};

const categoryColors: Record<string, string> = {
  "Environment": "bg-success/10 text-success border-success/20",
  "Healthcare": "bg-destructive/10 text-destructive border-destructive/20",
  "Education": "bg-info/10 text-info border-info/20",
  "Community": "bg-warning/10 text-warning border-warning/20",
  "Tech": "bg-primary/10 text-primary border-primary/20",
  "Women Empowerment": "bg-pink-500/10 text-pink-500 border-pink-500/20",
  "Rural Development": "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

interface Problem {
  id: string;
  title: string;
  description: string;
  ngoName: string;
  ngoLogo: string;
  category: string;
  location: string;
  solversNeeded: number;
  currentSolvers: number;
  deadline?: string;
  verified: boolean;
}

interface Hackathon {
  id: string;
  name: string;
  theme: string;
  college: string;
  collegeLogo: string;
  date: string;
  duration: string;
  location: string;
  mode: "Online" | "Offline" | "Hybrid";
  prize: string;
  registrations: number;
  isOpen: boolean;
}

// Real NGO Problems with verified organizations
const problems: Problem[] = [
  {
    id: "p1",
    title: "Digital Literacy App for Rural Schools",
    description: "Build an offline-capable mobile app to teach basic digital skills to children in villages with limited internet connectivity. Focus on local language support.",
    ngoName: "Pratham",
    ngoLogo: "https://www.pratham.org/wp-content/uploads/2019/02/Pratham_logo_new.png",
    category: "Education",
    location: "Rural India",
    solversNeeded: 6,
    currentSolvers: 2,
    deadline: "Mar 15, 2025",
    verified: true
  },
  {
    id: "p2",
    title: "Child Nutrition Tracking System",
    description: "Create a system to track and analyze nutritional status of children in mid-day meal programs. Include growth monitoring and alert mechanisms.",
    ngoName: "Akshaya Patra Foundation",
    ngoLogo: "https://www.akshayapatra.org/includefiles/settings/logo.png",
    category: "Healthcare",
    location: "Pan India",
    solversNeeded: 5,
    currentSolvers: 1,
    deadline: "Feb 28, 2025",
    verified: true
  },
  {
    id: "p3",
    title: "Disaster Relief Coordination Platform",
    description: "Develop a platform to coordinate cloth and material donations during disasters. Real-time tracking of contributions and distribution.",
    ngoName: "Goonj",
    ngoLogo: "https://goonj.org/wp-content/uploads/2019/07/goonj-logo.png",
    category: "Community",
    location: "Delhi NCR",
    solversNeeded: 4,
    currentSolvers: 2,
    deadline: "Mar 10, 2025",
    verified: true
  },
  {
    id: "p4",
    title: "Wildlife Conservation Alert System",
    description: "Build an IoT-based alert system to detect and prevent poaching in wildlife sanctuaries. Include camera trap analytics and ranger notification.",
    ngoName: "WWF India",
    ngoLogo: "https://www.wwfindia.org/content/dam/wwfindia/images/wwf_logo.png",
    category: "Environment",
    location: "Western Ghats",
    solversNeeded: 5,
    currentSolvers: 3,
    deadline: "Apr 1, 2025",
    verified: true
  },
  {
    id: "p5",
    title: "Child Rights Awareness Gamification",
    description: "Create an interactive game-based learning platform to educate children about their rights. Multi-language support for 10+ Indian languages.",
    ngoName: "CRY India",
    ngoLogo: "https://www.cry.org/wp-content/themes/developer/images/logo.svg",
    category: "Education",
    location: "Pan India",
    solversNeeded: 4,
    currentSolvers: 0,
    verified: true
  },
  {
    id: "p6",
    title: "Smile Scholarship Management Portal",
    description: "Build a comprehensive scholarship tracking and application system for underprivileged students. Include mentorship matching features.",
    ngoName: "Smile Foundation",
    ngoLogo: "https://www.smilefoundationindia.org/images/smile-foundation-logo.png",
    category: "Education",
    location: "Multiple Cities",
    solversNeeded: 3,
    currentSolvers: 1,
    deadline: "Feb 20, 2025",
    verified: true
  },
  {
    id: "p7",
    title: "Teacher Training Digital Modules",
    description: "Design interactive online training modules for government school teachers. Focus on innovative teaching methods and student engagement.",
    ngoName: "Teach For India",
    ngoLogo: "https://www.teachforindia.org/images/logo.svg",
    category: "Education",
    location: "7 Major Cities",
    solversNeeded: 5,
    currentSolvers: 2,
    deadline: "Mar 30, 2025",
    verified: true
  },
  {
    id: "p8",
    title: "Clean Water Access Mapping Tool",
    description: "Create a mapping solution to identify villages lacking clean water access. Include community reporting and government scheme integration.",
    ngoName: "WaterAid India",
    ngoLogo: "https://www.wateraid.org/sites/g/files/jkxoof266/files/wa_logo.svg",
    category: "Environment",
    location: "Rural India",
    solversNeeded: 4,
    currentSolvers: 1,
    verified: true
  },
];

// Real College/Institution Hackathons
const hackathons: Hackathon[] = [
  {
    id: "h1",
    name: "Shaastra Tech Challenge",
    theme: "Sustainable Technology for India",
    college: "IIT Madras",
    collegeLogo: "https://www.iitm.ac.in/sites/default/files/logo/iitm_logo.png",
    date: "Jan 18-20, 2025",
    duration: "48 hours",
    location: "Chennai",
    mode: "Hybrid",
    prize: "₹5,00,000",
    registrations: 3200,
    isOpen: true,
  },
  {
    id: "h2",
    name: "Techfest AI Challenge",
    theme: "AI for Social Good",
    college: "IIT Bombay",
    collegeLogo: "https://www.iitb.ac.in/sites/default/files/IITB_logo.png",
    date: "Jan 25-27, 2025",
    duration: "36 hours",
    location: "Mumbai",
    mode: "Offline",
    prize: "₹7,00,000",
    registrations: 4500,
    isOpen: true,
  },
  {
    id: "h3",
    name: "Pragyan Hackathon",
    theme: "Healthcare Innovation",
    college: "NIT Trichy",
    collegeLogo: "https://www.nitt.edu/home/academics/departments/cse/images/nitt-logo.png",
    date: "Feb 8-10, 2025",
    duration: "48 hours",
    location: "Tiruchirappalli",
    mode: "Hybrid",
    prize: "₹3,00,000",
    registrations: 1800,
    isOpen: true,
  },
  {
    id: "h4",
    name: "APOGEE Buildathon",
    theme: "FinTech & Blockchain",
    college: "BITS Pilani",
    collegeLogo: "https://www.bits-pilani.ac.in/wp-content/uploads/bits-logo.png",
    date: "Feb 15-17, 2025",
    duration: "48 hours",
    location: "Pilani",
    mode: "Offline",
    prize: "₹4,00,000",
    registrations: 2100,
    isOpen: true,
  },
  {
    id: "h5",
    name: "VIT Hack",
    theme: "EdTech Revolution",
    college: "VIT Vellore",
    collegeLogo: "https://vit.ac.in/files/vit_logo.png",
    date: "Feb 22-24, 2025",
    duration: "36 hours",
    location: "Vellore",
    mode: "Hybrid",
    prize: "₹2,50,000",
    registrations: 2800,
    isOpen: true,
  },
  {
    id: "h6",
    name: "Hackoverflow",
    theme: "Smart Cities & IoT",
    college: "Anna University",
    collegeLogo: "https://www.annauniv.edu/images/au-logo.png",
    date: "Mar 1-3, 2025",
    duration: "48 hours",
    location: "Chennai",
    mode: "Online",
    prize: "₹2,00,000",
    registrations: 1500,
    isOpen: true,
  },
  {
    id: "h7",
    name: "SRM Hackathon",
    theme: "Sustainable Development Goals",
    college: "SRM University",
    collegeLogo: "https://www.srmist.edu.in/sites/default/files/srm_logo.png",
    date: "Mar 8-10, 2025",
    duration: "36 hours",
    location: "Chennai",
    mode: "Hybrid",
    prize: "₹3,50,000",
    registrations: 2200,
    isOpen: true,
  },
  {
    id: "h8",
    name: "Tryst Innovation Challenge",
    theme: "AgriTech Solutions",
    college: "IIT Delhi",
    collegeLogo: "https://home.iitd.ac.in/images/logo.png",
    date: "Mar 15-17, 2025",
    duration: "48 hours",
    location: "New Delhi",
    mode: "Offline",
    prize: "₹6,00,000",
    registrations: 3800,
    isOpen: true,
  },
];

const categories = ["All", "Environment", "Healthcare", "Education", "Community", "Tech"];

export function ImpactContent() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [joinedProblems, setJoinedProblems] = useState<string[]>([]);
  const [joinedHackathons, setJoinedHackathons] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("problems");
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  const handleLogoError = useCallback((id: string) => {
    setLogoErrors(prev => ({ ...prev, [id]: true }));
  }, []);

  const handleJoinProblem = (problemId: string, ngoName: string) => {
    setJoinedProblems([...joinedProblems, problemId]);
    toast({
      title: "✅ Successfully Joined!",
      description: `You've joined this ${ngoName} problem as a solver. Added to "My Contributions".`,
    });
  };

  const handleJoinHackathon = (hackathonId: string, hackathonName: string) => {
    setJoinedHackathons([...joinedHackathons, hackathonId]);
    toast({
      title: "🎉 Registered Successfully!",
      description: `You've registered for ${hackathonName}. Added to "My Hackathons".`,
    });
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.ngoName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const myContributions = problems.filter(p => joinedProblems.includes(p.id));
  const myHackathons = hackathons.filter(h => joinedHackathons.includes(h.id));

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
          Solve real problems from verified NGOs. Join hackathons from top colleges.
        </p>
        <p className="text-sm text-muted-foreground mt-1 italic">
          Created by students, for students.
        </p>
      </motion.div>

      {/* My Contributions Summary */}
      {(myContributions.length > 0 || myHackathons.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {myContributions.length > 0 && (
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-semibold">My Contributions</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You're solving {myContributions.length} NGO problem{myContributions.length > 1 ? 's' : ''}
              </p>
            </div>
          )}
          {myHackathons.length > 0 && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-semibold">My Hackathons</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Registered for {myHackathons.length} hackathon{myHackathons.length > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </motion.div>
      )}

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
            placeholder="Search NGOs, problems, hackathons, colleges..."
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="problems">
            <Rocket className="w-4 h-4 mr-2" />
            NGO Problems ({filteredProblems.length})
          </TabsTrigger>
          <TabsTrigger value="hackathons">
            <Trophy className="w-4 h-4 mr-2" />
            Hackathons ({filteredHackathons.length})
          </TabsTrigger>
          <TabsTrigger value="my-impact">
            <CheckCircle className="w-4 h-4 mr-2" />
            My Impact
          </TabsTrigger>
        </TabsList>

        {/* NGO Problems Tab */}
        <TabsContent value="problems" className="space-y-4">
          {filteredProblems.map((problem, index) => {
            const CategoryIcon = categoryIcons[problem.category] || Rocket;
            const isJoined = joinedProblems.includes(problem.id);
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* NGO Logo */}
                  <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                    {logoErrors[problem.id] ? (
                      <span className="text-2xl font-bold text-muted-foreground">
                        {problem.ngoName.charAt(0)}
                      </span>
                    ) : (
                      <img 
                        src={problem.ngoLogo} 
                        alt={problem.ngoName}
                        className="w-12 h-12 object-contain"
                        onError={() => handleLogoError(problem.id)}
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={categoryColors[problem.category]}>
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {problem.category}
                      </Badge>
                      {problem.verified && (
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified NGO
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold">{problem.title}</h3>
                    <p className="text-muted-foreground">{problem.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 font-medium text-foreground">
                        <Building className="w-4 h-4" />
                        {problem.ngoName}
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

                  <Button 
                    variant={isJoined ? "secondary" : "default"} 
                    className="shrink-0"
                    onClick={() => !isJoined && handleJoinProblem(problem.id, problem.ngoName)}
                    disabled={isJoined}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Joined
                      </>
                    ) : (
                      <>
                        Join as Solver
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </TabsContent>

        {/* Hackathons Tab */}
        <TabsContent value="hackathons" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredHackathons.map((hackathon, index) => {
              const isJoined = joinedHackathons.includes(hackathon.id);
              return (
                <motion.div
                  key={hackathon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
                  className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                      {logoErrors[hackathon.id] ? (
                        <span className="text-lg font-bold text-muted-foreground">
                          {hackathon.college.split(' ').map(w => w.charAt(0)).join('')}
                        </span>
                      ) : (
                        <img 
                          src={hackathon.collegeLogo} 
                          alt={hackathon.college}
                          className="w-10 h-10 object-contain"
                          onError={() => handleLogoError(hackathon.id)}
                        />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={hackathon.mode === "Online" ? "secondary" : hackathon.mode === "Offline" ? "default" : "outline"}>
                        {hackathon.mode}
                      </Badge>
                      <Badge variant="default" className="bg-success text-success-foreground">
                        {hackathon.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-semibold mb-1">{hackathon.name}</h3>
                  <p className="text-sm font-medium text-primary mb-2">{hackathon.theme}</p>
                  <p className="text-muted-foreground text-sm mb-4">{hackathon.college}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.duration}</span>
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

                  <Button 
                    variant={isJoined ? "secondary" : "default"} 
                    className="w-full"
                    onClick={() => !isJoined && handleJoinHackathon(hackathon.id, hackathon.name)}
                    disabled={isJoined}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Registered
                      </>
                    ) : (
                      <>
                        Register Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        {/* My Impact Tab */}
        <TabsContent value="my-impact" className="space-y-6">
          {myContributions.length === 0 && myHackathons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Rocket className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Impact Yet</h3>
              <p className="text-muted-foreground mb-4">
                Join NGO problems or register for hackathons to start making an impact!
              </p>
              <Button onClick={() => setActiveTab("problems")}>
                Explore Problems
              </Button>
            </motion.div>
          ) : (
            <>
              {myContributions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    My Contributions ({myContributions.length})
                  </h3>
                  {myContributions.map((problem) => (
                    <div key={problem.id} className="p-4 rounded-xl bg-success/5 border border-success/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{problem.title}</h4>
                          <p className="text-sm text-muted-foreground">{problem.ngoName}</p>
                        </div>
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          Active Solver
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {myHackathons.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    My Hackathons ({myHackathons.length})
                  </h3>
                  {myHackathons.map((hackathon) => (
                    <div key={hackathon.id} className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{hackathon.name}</h4>
                          <p className="text-sm text-muted-foreground">{hackathon.college} • {hackathon.date}</p>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Registered
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
