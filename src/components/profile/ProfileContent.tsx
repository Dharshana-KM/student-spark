import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Calendar,
  Edit,
  Github,
  Linkedin,
  Globe,
  BookOpen,
  Rocket,
  Users,
  Trophy,
  ExternalLink,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface ProfileData {
  name: string;
  email: string;
  college: string;
  year: string;
  location: string;
  bio: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  skills: string[];
  interests: string[];
}

const initialProfile: ProfileData = {
  name: "Alex Student",
  email: "alex@example.com",
  college: "IIT Delhi",
  year: "3rd Year, B.Tech CSE",
  location: "New Delhi, India",
  bio: "Passionate about building technology that makes a difference. Currently exploring ML and sustainable tech. Love collaborating with fellow students on meaningful projects.",
  linkedinUrl: "https://linkedin.com/in/alexstudent",
  githubUrl: "https://github.com/alexstudent",
  websiteUrl: "",
  skills: ["React", "Python", "Machine Learning", "Node.js", "Figma"],
  interests: ["Environment", "Healthcare", "AI/ML", "EdTech"],
};

const stats = [
  { label: "Courses Completed", value: 4, icon: BookOpen, color: "text-primary" },
  { label: "Problems Solved", value: 5, icon: Rocket, color: "text-secondary" },
  { label: "Teams Joined", value: 2, icon: Users, color: "text-success" },
  { label: "Hackathons", value: 3, icon: Trophy, color: "text-accent" },
];

const achievements = [
  { title: "First Course Completed", description: "Completed your first course on the platform", date: "Dec 2024" },
  { title: "Team Player", description: "Joined your first team", date: "Dec 2024" },
  { title: "Problem Solver", description: "Contributed to 5 real-world problems", date: "Nov 2024" },
];

export function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [editedProfile, setEditedProfile] = useState<ProfileData>(initialProfile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Header with Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="h-32 rounded-2xl gradient-primary" />
        <div className="absolute -bottom-16 left-6 flex items-end gap-6">
          <Avatar className="w-32 h-32 border-4 border-card shadow-card">
            <AvatarImage src="" />
            <AvatarFallback className="text-4xl bg-muted">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute top-4 right-4">
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          ) : (
            <Button variant="glass" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </motion.div>

      {/* Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="pt-20 space-y-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2">
            {isEditing ? (
              <Input
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="text-2xl font-display font-bold h-auto py-1"
              />
            ) : (
              <h1 className="text-2xl lg:text-3xl font-display font-bold">{profile.name}</h1>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {isEditing ? (
                  <Input
                    value={editedProfile.college}
                    onChange={(e) => setEditedProfile({ ...editedProfile, college: e.target.value })}
                    className="h-8 w-40"
                  />
                ) : (
                  <span>{profile.college}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {isEditing ? (
                  <Input
                    value={editedProfile.year}
                    onChange={(e) => setEditedProfile({ ...editedProfile, year: e.target.value })}
                    className="h-8 w-40"
                  />
                ) : (
                  <span>{profile.year}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {isEditing ? (
                  <Input
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className="h-8 w-40"
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-info" />
                  <Input
                    placeholder="LinkedIn URL"
                    value={editedProfile.linkedinUrl}
                    onChange={(e) => setEditedProfile({ ...editedProfile, linkedinUrl: e.target.value })}
                    className="h-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  <Input
                    placeholder="GitHub URL"
                    value={editedProfile.githubUrl}
                    onChange={(e) => setEditedProfile({ ...editedProfile, githubUrl: e.target.value })}
                    className="h-9"
                  />
                </div>
              </div>
            ) : (
              <>
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-info/10 text-info flex items-center justify-center hover:bg-info/20 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold mb-3">About</h3>
          {isEditing ? (
            <Textarea
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-muted-foreground">{profile.bio}</p>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="p-5 rounded-2xl bg-card border border-border shadow-soft text-center"
          >
            <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-display font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Skills & Interests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <Badge key={interest} variant="outline">{interest}</Badge>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Achievements
        </h3>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              <span className="text-sm text-muted-foreground">{achievement.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-6 rounded-2xl gradient-warm text-center"
      >
        <p className="text-xl font-medium text-primary-foreground italic">
          "Your journey is unique. Keep growing, keep building."
        </p>
        <p className="text-primary-foreground/70 text-sm mt-2">— GrowthPath</p>
      </motion.div>
    </div>
  );
}
