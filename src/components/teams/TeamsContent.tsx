import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Plus, 
  Rocket, 
  MessageCircle,
  User,
  Star,
  ChevronRight,
  Trophy,
  Target,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  interests: string[];
  currentProject?: string;
  projectType?: "hackathon" | "problem";
  progress: number;
  isOpen: boolean;
}

interface StudentMatch {
  id: string;
  name: string;
  avatar: string;
  college: string;
  year: string;
  interests: string[];
  matchScore: number;
}

const myTeams: Team[] = [
  {
    id: "t1",
    name: "Team Green Earth",
    description: "Working on sustainable technology solutions",
    members: [
      { id: "m1", name: "You", avatar: "", role: "Developer", skills: ["React", "Python"] },
      { id: "m2", name: "Priya S.", avatar: "", role: "Designer", skills: ["Figma", "UI/UX"] },
      { id: "m3", name: "Rahul K.", avatar: "", role: "Data Science", skills: ["ML", "Python"] },
      { id: "m4", name: "Ananya R.", avatar: "", role: "Backend", skills: ["Node.js", "MongoDB"] },
    ],
    interests: ["Environment", "IoT", "Sustainability"],
    currentProject: "Rural Water Quality Monitoring System",
    projectType: "problem",
    progress: 35,
    isOpen: false,
  },
];

const openTeams: Team[] = [
  {
    id: "t2",
    name: "EduTech Innovators",
    description: "Building accessible learning tools for underserved communities",
    members: [
      { id: "m5", name: "Vikram M.", avatar: "", role: "Lead", skills: ["React", "Node.js"] },
      { id: "m6", name: "Sneha P.", avatar: "", role: "UI/UX", skills: ["Figma", "Research"] },
    ],
    interests: ["Education", "Accessibility", "Mobile"],
    currentProject: "EduHack 2025",
    projectType: "hackathon",
    progress: 0,
    isOpen: true,
  },
  {
    id: "t3",
    name: "HealthTech Squad",
    description: "Creating AI solutions for mental health support",
    members: [
      { id: "m7", name: "Arjun D.", avatar: "", role: "ML Engineer", skills: ["Python", "TensorFlow"] },
    ],
    interests: ["Healthcare", "AI", "Mental Health"],
    isOpen: true,
    progress: 0,
  },
  {
    id: "t4",
    name: "Smart City Builders",
    description: "Working on IoT solutions for urban problems",
    members: [
      { id: "m8", name: "Kavya N.", avatar: "", role: "Hardware", skills: ["Arduino", "IoT"] },
      { id: "m9", name: "Rohan S.", avatar: "", role: "Backend", skills: ["Python", "AWS"] },
      { id: "m10", name: "Meera I.", avatar: "", role: "PM", skills: ["Agile", "Strategy"] },
    ],
    interests: ["IoT", "Smart Cities", "Data"],
    currentProject: "Smart Cities Hackathon",
    projectType: "hackathon",
    progress: 0,
    isOpen: true,
  },
];

const studentMatches: StudentMatch[] = [
  {
    id: "s1",
    name: "Aditya Kumar",
    avatar: "",
    college: "IIT Bombay",
    year: "3rd Year",
    interests: ["Machine Learning", "Web Dev", "IoT"],
    matchScore: 92,
  },
  {
    id: "s2",
    name: "Shreya Sharma",
    avatar: "",
    college: "NIT Trichy",
    year: "4th Year",
    interests: ["Data Science", "Healthcare", "Python"],
    matchScore: 88,
  },
  {
    id: "s3",
    name: "Karthik Reddy",
    avatar: "",
    college: "BITS Pilani",
    year: "2nd Year",
    interests: ["React", "Mobile Dev", "Design"],
    matchScore: 85,
  },
  {
    id: "s4",
    name: "Neha Gupta",
    avatar: "",
    college: "IIT Delhi",
    year: "3rd Year",
    interests: ["Backend", "Cloud", "DevOps"],
    matchScore: 82,
  },
];

const interestTags = ["All", "Tech", "Environment", "Healthcare", "Education", "Design", "AI/ML"];

export function TeamsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All");

  const filteredOpenTeams = openTeams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInterest = selectedInterest === "All" || 
      team.interests.some(i => i.toLowerCase().includes(selectedInterest.toLowerCase()));
    return matchesSearch && matchesInterest;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
            Teams
          </h1>
          <p className="text-muted-foreground text-lg">
            Find your tribe. Build together. Grow together.
          </p>
        </div>
        <Button variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-4 rounded-xl bg-accent/20 border border-accent/30"
      >
        <p className="text-center font-medium italic">
          "Alone we can do so little; together we can do so much." — Helen Keller
        </p>
      </motion.div>

      <Tabs defaultValue="my-teams" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="my-teams">
            <Users className="w-4 h-4 mr-2" />
            My Teams
          </TabsTrigger>
          <TabsTrigger value="discover">
            <Search className="w-4 h-4 mr-2" />
            Discover
          </TabsTrigger>
          <TabsTrigger value="matches">
            <Sparkles className="w-4 h-4 mr-2" />
            Matches
          </TabsTrigger>
        </TabsList>

        {/* My Teams */}
        <TabsContent value="my-teams" className="space-y-6">
          {myTeams.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Users className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Teams Yet</h3>
              <p className="text-muted-foreground mb-4">Create a team or join one to get started!</p>
              <Button>Create Your First Team</Button>
            </motion.div>
          ) : (
            myTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-display font-semibold">{team.name}</h3>
                        <p className="text-muted-foreground text-sm">{team.description}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {team.members.length} members
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {team.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">{interest}</Badge>
                      ))}
                    </div>

                    {team.currentProject && (
                      <div className="p-4 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-2 mb-3">
                          {team.projectType === "hackathon" ? (
                            <Trophy className="w-5 h-5 text-accent" />
                          ) : (
                            <Target className="w-5 h-5 text-secondary" />
                          )}
                          <span className="font-medium">Current Project</span>
                        </div>
                        <p className="text-sm mb-3">{team.currentProject}</p>
                        <div className="flex items-center gap-3">
                          <Progress value={team.progress} className="h-2 flex-1" />
                          <span className="text-sm text-muted-foreground">{team.progress}%</span>
                        </div>
                      </div>
                    )}

                    {/* Team Members */}
                    <div>
                      <p className="text-sm font-medium mb-3">Team Members</p>
                      <div className="flex flex-wrap gap-4">
                        {team.members.map((member) => (
                          <div key={member.id} className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button variant="default" className="flex-1 lg:flex-none">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Team Chat
                    </Button>
                    <Button variant="outline" className="flex-1 lg:flex-none">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </TabsContent>

        {/* Discover Teams */}
        <TabsContent value="discover" className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {interestTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedInterest === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedInterest(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredOpenTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-display font-semibold">{team.name}</h3>
                  <Badge variant="default" className="bg-success text-success-foreground">
                    Open
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{team.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {team.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">{interest}</Badge>
                  ))}
                </div>

                {team.currentProject && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    {team.projectType === "hackathon" ? (
                      <Trophy className="w-4 h-4" />
                    ) : (
                      <Target className="w-4 h-4" />
                    )}
                    <span>{team.currentProject}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="w-8 h-8 border-2 border-card">
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {team.members.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-card">
                        +{team.members.length - 3}
                      </div>
                    )}
                  </div>
                  <Button size="sm">Request to Join</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Student Matches */}
        <TabsContent value="matches" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-primary/10 border border-primary/20"
          >
            <p className="text-sm text-center">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Based on your interests and skills, here are students you might want to connect with!
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentMatches.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-5 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 text-center"
              >
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback className="text-lg">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>

                <h3 className="font-semibold mb-1">{student.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{student.college}</p>
                <p className="text-xs text-muted-foreground mb-3">{student.year}</p>

                <div className="flex items-center justify-center gap-1 text-sm font-medium text-primary mb-3">
                  <Star className="w-4 h-4 fill-primary" />
                  {student.matchScore}% Match
                </div>

                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {student.interests.slice(0, 2).map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">{interest}</Badge>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Connect
                </Button>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
