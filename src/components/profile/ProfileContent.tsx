import { motion } from "framer-motion";
import { 
  MapPin, 
  GraduationCap, 
  Calendar,
  Edit,
  Github,
  Linkedin,
  BookOpen,
  Rocket,
  Users,
  Trophy,
  Save,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  full_name: string;
  email: string;
  college: string;
  graduation_year: string;
  location: string;
  bio: string;
  linkedin_url: string;
  github_url: string;
  avatar_url: string;
  skills: string[];
  interests: string[];
  career_goal: string;
}

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      const profileData: ProfileData = {
        full_name: data.full_name || '',
        email: data.email || user.email || '',
        college: data.college || '',
        graduation_year: data.graduation_year || '',
        location: data.location || '',
        bio: data.bio || '',
        linkedin_url: data.linkedin_url || '',
        github_url: data.github_url || '',
        avatar_url: data.avatar_url || '',
        skills: data.skills || [],
        interests: data.interests || [],
        career_goal: data.career_goal || '',
      };

      setProfile(profileData);
      setEditedProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !editedProfile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editedProfile.full_name,
          college: editedProfile.college,
          graduation_year: editedProfile.graduation_year,
          location: editedProfile.location,
          bio: editedProfile.bio,
          linkedin_url: editedProfile.linkedin_url,
          github_url: editedProfile.github_url,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(editedProfile);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile || !editedProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
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
            <AvatarImage src={profile.avatar_url} />
            <AvatarFallback className="text-4xl bg-muted">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute top-4 right-4">
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel} disabled={saving}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
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
                value={editedProfile.full_name}
                onChange={(e) => setEditedProfile({ ...editedProfile, full_name: e.target.value })}
                className="text-2xl font-display font-bold h-auto py-1"
                placeholder="Your name"
              />
            ) : (
              <h1 className="text-2xl lg:text-3xl font-display font-bold">
                {profile.full_name || 'Add your name'}
              </h1>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {isEditing ? (
                  <Input
                    value={editedProfile.college}
                    onChange={(e) => setEditedProfile({ ...editedProfile, college: e.target.value })}
                    className="h-8 w-40"
                    placeholder="College"
                  />
                ) : (
                  <span>{profile.college || 'Add college'}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {isEditing ? (
                  <Input
                    value={editedProfile.graduation_year}
                    onChange={(e) => setEditedProfile({ ...editedProfile, graduation_year: e.target.value })}
                    className="h-8 w-40"
                    placeholder="Graduation year"
                  />
                ) : (
                  <span>{profile.graduation_year || 'Add year'}</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {isEditing ? (
                  <Input
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className="h-8 w-40"
                    placeholder="Location"
                  />
                ) : (
                  <span>{profile.location || 'Add location'}</span>
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
                    value={editedProfile.linkedin_url}
                    onChange={(e) => setEditedProfile({ ...editedProfile, linkedin_url: e.target.value })}
                    className="h-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  <Input
                    placeholder="GitHub URL"
                    value={editedProfile.github_url}
                    onChange={(e) => setEditedProfile({ ...editedProfile, github_url: e.target.value })}
                    className="h-9"
                  />
                </div>
              </div>
            ) : (
              <>
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-info/10 text-info flex items-center justify-center hover:bg-info/20 transition-colors"
                    title="View LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
                    title="View GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {!profile.linkedin_url && !profile.github_url && (
                  <p className="text-sm text-muted-foreground">Click edit to add social links</p>
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
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-muted-foreground">
              {profile.bio || 'Add a bio to tell others about yourself'}
            </p>
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
        {stats.map((stat) => (
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
            {profile.skills.length > 0 ? (
              profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No skills added yet</p>
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.length > 0 ? (
              profile.interests.map((interest) => (
                <Badge key={interest} variant="outline">{interest}</Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No interests added yet</p>
            )}
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
