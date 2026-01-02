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
  Sparkles,
  Send,
  Linkedin,
  CheckCircle,
  Clock,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
  linkedinUrl?: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
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
  messages: ChatMessage[];
}

interface StudentMatch {
  id: string;
  name: string;
  avatar: string;
  college: string;
  year: string;
  interests: string[];
  skills: string[];
  matchScore: number;
  linkedinUrl: string;
  isConnected: boolean;
}

const myTeams: Team[] = [
  {
    id: "t1",
    name: "Team EcoTech",
    description: "Working on sustainable technology solutions for rural India",
    members: [
      { id: "m1", name: "You", avatar: "", role: "Full Stack Developer", skills: ["React", "Python", "Node.js"], linkedinUrl: "https://linkedin.com/in/student" },
      { id: "m2", name: "Priya Sharma", avatar: "", role: "UI/UX Designer", skills: ["Figma", "Adobe XD"], linkedinUrl: "https://linkedin.com/in/priya-sharma" },
      { id: "m3", name: "Rahul Verma", avatar: "", role: "ML Engineer", skills: ["TensorFlow", "Python"], linkedinUrl: "https://linkedin.com/in/rahul-verma" },
      { id: "m4", name: "Ananya Reddy", avatar: "", role: "Backend Developer", skills: ["Node.js", "MongoDB"], linkedinUrl: "https://linkedin.com/in/ananya-reddy" },
    ],
    interests: ["Environment", "IoT", "Sustainability"],
    currentProject: "WWF India - Wildlife Conservation Alert System",
    projectType: "problem",
    progress: 45,
    isOpen: false,
    messages: [
      { id: "msg1", senderId: "m2", senderName: "Priya Sharma", message: "Hey team! I've completed the wireframes for the dashboard.", timestamp: new Date(Date.now() - 3600000) },
      { id: "msg2", senderId: "m3", senderName: "Rahul Verma", message: "Great work! The ML model is 70% done. Should be ready by weekend.", timestamp: new Date(Date.now() - 1800000) },
      { id: "msg3", senderId: "m4", senderName: "Ananya Reddy", message: "API endpoints are ready for integration. Let's sync tomorrow.", timestamp: new Date(Date.now() - 900000) },
    ],
  },
];

const openTeams: Team[] = [
  {
    id: "t2",
    name: "Digital Literacy Squad",
    description: "Building offline-capable learning apps for rural schools with Pratham",
    members: [
      { id: "m5", name: "Vikram Mehta", avatar: "", role: "Project Lead", skills: ["React Native", "Node.js"], linkedinUrl: "https://linkedin.com/in/vikram-mehta" },
      { id: "m6", name: "Sneha Patel", avatar: "", role: "UX Researcher", skills: ["User Research", "Figma"], linkedinUrl: "https://linkedin.com/in/sneha-patel" },
    ],
    interests: ["Education", "Mobile", "Social Impact"],
    currentProject: "Pratham - Digital Literacy App",
    projectType: "problem",
    progress: 20,
    isOpen: true,
    messages: [],
  },
  {
    id: "t3",
    name: "HealthTech Innovators",
    description: "Creating AI-powered nutrition tracking for Akshaya Patra",
    members: [
      { id: "m7", name: "Arjun Das", avatar: "", role: "ML Engineer", skills: ["Python", "TensorFlow", "Computer Vision"], linkedinUrl: "https://linkedin.com/in/arjun-das" },
    ],
    interests: ["Healthcare", "AI", "Nutrition"],
    currentProject: "Akshaya Patra - Child Nutrition System",
    projectType: "problem",
    isOpen: true,
    progress: 0,
    messages: [],
  },
  {
    id: "t4",
    name: "Smart Campus Builders",
    description: "IoT solutions for smart cities - preparing for IIT Bombay Techfest",
    members: [
      { id: "m8", name: "Kavya Nair", avatar: "", role: "Hardware Lead", skills: ["Arduino", "IoT", "Embedded C"], linkedinUrl: "https://linkedin.com/in/kavya-nair" },
      { id: "m9", name: "Rohan Singh", avatar: "", role: "Cloud Engineer", skills: ["AWS", "Python", "Docker"], linkedinUrl: "https://linkedin.com/in/rohan-singh" },
      { id: "m10", name: "Meera Iyer", avatar: "", role: "Product Manager", skills: ["Agile", "Strategy"], linkedinUrl: "https://linkedin.com/in/meera-iyer" },
    ],
    interests: ["IoT", "Smart Cities", "Cloud"],
    currentProject: "IIT Bombay Techfest - AI Challenge",
    projectType: "hackathon",
    progress: 15,
    isOpen: true,
    messages: [],
  },
  {
    id: "t5",
    name: "FinTech Pioneers",
    description: "Building blockchain solutions for BITS Pilani APOGEE Buildathon",
    members: [
      { id: "m11", name: "Aditya Rao", avatar: "", role: "Blockchain Dev", skills: ["Solidity", "Web3", "React"], linkedinUrl: "https://linkedin.com/in/aditya-rao" },
    ],
    interests: ["Blockchain", "FinTech", "DeFi"],
    currentProject: "BITS Pilani - APOGEE Buildathon",
    projectType: "hackathon",
    isOpen: true,
    progress: 0,
    messages: [],
  },
];

// Realistic student profiles with LinkedIn links
const studentMatches: StudentMatch[] = [
  {
    id: "s1",
    name: "Aditya Kumar",
    avatar: "",
    college: "IIT Bombay",
    year: "3rd Year CSE",
    interests: ["Machine Learning", "Web Development"],
    skills: ["Python", "React", "TensorFlow"],
    matchScore: 92,
    linkedinUrl: "https://linkedin.com/in/aditya-kumar-iitb",
    isConnected: false,
  },
  {
    id: "s2",
    name: "Shreya Sharma",
    avatar: "",
    college: "NIT Trichy",
    year: "4th Year ECE",
    interests: ["Data Science", "Healthcare Tech"],
    skills: ["Python", "SQL", "Tableau"],
    matchScore: 88,
    linkedinUrl: "https://linkedin.com/in/shreya-sharma-nitt",
    isConnected: false,
  },
  {
    id: "s3",
    name: "Karthik Reddy",
    avatar: "",
    college: "BITS Pilani",
    year: "2nd Year CS",
    interests: ["Mobile Development", "UI/UX"],
    skills: ["React Native", "Figma", "JavaScript"],
    matchScore: 85,
    linkedinUrl: "https://linkedin.com/in/karthik-reddy-bits",
    isConnected: false,
  },
  {
    id: "s4",
    name: "Neha Gupta",
    avatar: "",
    college: "IIT Delhi",
    year: "3rd Year CSE",
    interests: ["Cloud Computing", "DevOps"],
    skills: ["AWS", "Docker", "Kubernetes"],
    matchScore: 82,
    linkedinUrl: "https://linkedin.com/in/neha-gupta-iitd",
    isConnected: false,
  },
  {
    id: "s5",
    name: "Arjun Menon",
    avatar: "",
    college: "VIT Vellore",
    year: "4th Year IT",
    interests: ["Blockchain", "FinTech"],
    skills: ["Solidity", "Node.js", "MongoDB"],
    matchScore: 79,
    linkedinUrl: "https://linkedin.com/in/arjun-menon-vit",
    isConnected: false,
  },
  {
    id: "s6",
    name: "Divya Krishnan",
    avatar: "",
    college: "Anna University",
    year: "3rd Year CSE",
    interests: ["AI Research", "NLP"],
    skills: ["PyTorch", "Hugging Face", "Python"],
    matchScore: 76,
    linkedinUrl: "https://linkedin.com/in/divya-krishnan-au",
    isConnected: false,
  },
];

const interestTags = ["All", "Tech", "Environment", "Healthcare", "Education", "Design", "AI/ML", "IoT"];

export function TeamsContent() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All");
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);
  const [connectedStudents, setConnectedStudents] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [teamMessages, setTeamMessages] = useState<Record<string, ChatMessage[]>>({
    "t1": myTeams[0].messages,
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  const filteredOpenTeams = openTeams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInterest = selectedInterest === "All" || 
      team.interests.some(i => i.toLowerCase().includes(selectedInterest.toLowerCase()));
    return matchesSearch && matchesInterest;
  });

  const handleRequestToJoin = (teamId: string, teamName: string) => {
    setPendingRequests([...pendingRequests, teamId]);
    toast({
      title: "📤 Request Sent!",
      description: `Your request to join "${teamName}" has been sent to the team leader.`,
    });
  };

  const handleConnectStudent = (studentId: string, studentName: string) => {
    setConnectedStudents([...connectedStudents, studentId]);
    toast({
      title: "🤝 Connection Request Sent!",
      description: `Your connection request to ${studentName} has been sent.`,
    });
  };

  const openTeamChat = (team: Team) => {
    setSelectedTeam(team);
    setChatOpen(true);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedTeam) return;

    const message: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: "m1",
      senderName: "You",
      message: newMessage.trim(),
      timestamp: new Date(),
    };

    setTeamMessages(prev => ({
      ...prev,
      [selectedTeam.id]: [...(prev[selectedTeam.id] || []), message],
    }));
    setNewMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [teamMessages, selectedTeam]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
          <p className="text-sm text-muted-foreground mt-1 italic">
            Created by students, for students.
          </p>
        </div>
        <Button variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </motion.div>

      {/* Pending Requests Summary */}
      {pendingRequests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-warning/10 border border-warning/20"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning" />
            <span className="font-medium">Pending Requests: {pendingRequests.length}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Waiting for team leaders to accept your join requests.
          </p>
        </motion.div>
      )}

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
                              <div className="flex items-center gap-1">
                                <p className="text-sm font-medium">{member.name}</p>
                                {member.linkedinUrl && (
                                  <a 
                                    href={member.linkedinUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#0077B5] hover:opacity-80"
                                  >
                                    <Linkedin className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <Dialog open={chatOpen && selectedTeam?.id === team.id} onOpenChange={(open) => {
                      setChatOpen(open);
                      if (open) setSelectedTeam(team);
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="default" className="flex-1 lg:flex-none" onClick={() => openTeamChat(team)}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Team Chat
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            {team.name} - Team Chat
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col h-[400px]">
                          <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-muted/30 rounded-lg">
                            {(teamMessages[team.id] || []).map((msg) => (
                              <div 
                                key={msg.id} 
                                className={`flex ${msg.senderId === 'm1' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div className={`max-w-[70%] p-3 rounded-lg ${
                                  msg.senderId === 'm1' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-card border border-border'
                                }`}>
                                  {msg.senderId !== 'm1' && (
                                    <p className="text-xs font-medium mb-1 opacity-70">{msg.senderName}</p>
                                  )}
                                  <p className="text-sm">{msg.message}</p>
                                  <p className={`text-xs mt-1 ${msg.senderId === 'm1' ? 'opacity-70' : 'text-muted-foreground'}`}>
                                    {formatTime(msg.timestamp)}
                                  </p>
                                </div>
                              </div>
                            ))}
                            <div ref={chatEndRef} />
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Input 
                              placeholder="Type a message..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <Button onClick={sendMessage}>
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
                placeholder="Search teams, projects, hackathons..."
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
            {filteredOpenTeams.map((team, index) => {
              const isPending = pendingRequests.includes(team.id);
              return (
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
                        <Trophy className="w-4 h-4 text-accent" />
                      ) : (
                        <Target className="w-4 h-4 text-primary" />
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
                    <Button 
                      size="sm" 
                      variant={isPending ? "secondary" : "default"}
                      onClick={() => !isPending && handleRequestToJoin(team.id, team.name)}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Clock className="w-4 h-4 mr-1" />
                          Request Sent
                        </>
                      ) : (
                        "Request to Join"
                      )}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentMatches.map((student, index) => {
              const isConnected = connectedStudents.includes(student.id);
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-5 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback className="text-lg">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <a 
                      href={student.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>

                  <h3 className="font-semibold mb-1">{student.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{student.college}</p>
                  <p className="text-xs text-muted-foreground mb-3">{student.year}</p>

                  <div className="flex items-center gap-1 text-sm font-medium text-primary mb-3">
                    <Star className="w-4 h-4 fill-primary" />
                    {student.matchScore}% Match
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap gap-1">
                      {student.interests.map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">{interest}</Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {student.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant={isConnected ? "secondary" : "default"} 
                    size="sm" 
                    className="w-full"
                    onClick={() => !isConnected && handleConnectStudent(student.id, student.name)}
                    disabled={isConnected}
                  >
                    {isConnected ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Request Sent
                      </>
                    ) : (
                      "Connect"
                    )}
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
