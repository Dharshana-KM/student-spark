import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Play, 
  Clock, 
  BookOpen, 
  Search,
  ChevronRight,
  Star,
  Users,
  CheckCircle,
  Circle,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { courses, categories, statusFilters, CourseStatus } from "./courseData";

export function CoursesContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from("profiles")
        .select("interests, skills")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (data) {
        setUserInterests(data.interests || []);
        setUserSkills(data.skills || []);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Personalize courses based on user interests/skills
  const getPersonalizedCourses = () => {
    const userTags = [...userInterests, ...userSkills].map(t => t.toLowerCase());
    
    if (userTags.length === 0) return courses;

    return [...courses].sort((a, b) => {
      const aScore = a.tags.filter(tag => 
        userTags.some(ut => tag.toLowerCase().includes(ut) || ut.includes(tag.toLowerCase()))
      ).length;
      const bScore = b.tags.filter(tag => 
        userTags.some(ut => tag.toLowerCase().includes(ut) || ut.includes(tag.toLowerCase()))
      ).length;
      return bScore - aScore;
    });
  };

  const personalizedCourses = getPersonalizedCourses();

  const filteredCourses = personalizedCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || 
      (selectedStatus === "In Progress" && course.status === "in_progress") ||
      (selectedStatus === "Not Started" && course.status === "not_started") ||
      (selectedStatus === "Completed" && course.status === "completed");
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: CourseStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "in_progress":
        return <Play className="w-4 h-4 text-primary" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: CourseStatus) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      default:
        return "Not Started";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
          Courses
        </h1>
        <p className="text-muted-foreground text-lg">
          Learn from SWAYAM, NPTEL & IIT — official courses from Government of India.
        </p>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-4 rounded-xl bg-primary/10 border border-primary/20"
      >
        <p className="text-center text-primary font-medium italic">
          "Consistency beats intensity. Small steps daily lead to big changes."
        </p>
      </motion.div>

      {/* Personalization Note */}
      {userInterests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Courses personalized based on your interests: {userInterests.slice(0, 3).join(", ")}{userInterests.length > 3 ? "..." : ""}</span>
        </motion.div>
      )}

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
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="w-px bg-border mx-2 hidden sm:block" />
          <div className="flex gap-2 flex-wrap">
            {statusFilters.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="group rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Badge 
                className="absolute top-3 left-3"
                variant={course.level === "Beginner" ? "default" : course.level === "Intermediate" ? "secondary" : "outline"}
              >
                {course.level}
              </Badge>
              <Badge 
                className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground"
              >
                {course.source}
              </Badge>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {course.instructor} • {course.institute}
                </p>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {course.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.modules} modules
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {course.students.toLocaleString()} students
                </div>
              </div>

              {/* Progress Section */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(course.status)}
                    <span className="text-sm font-medium">{getStatusLabel(course.status)}</span>
                  </div>
                  {course.status !== "not_started" && (
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  )}
                </div>
                {course.status !== "not_started" && (
                  <Progress value={course.progress} className="h-2" />
                )}
                {course.currentModule && (
                  <p className="text-xs text-muted-foreground mt-2">{course.currentModule}</p>
                )}
              </div>

              <Button 
                variant={course.status === "not_started" ? "default" : "secondary"} 
                className="w-full"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                {course.status === "not_started" ? "Start Course" : 
                 course.status === "completed" ? "Review Course" : "Continue"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Source Attribution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-sm text-muted-foreground py-4"
      >
        📚 All courses are sourced from <strong>SWAYAM</strong>, <strong>NPTEL</strong> & <strong>IIT YouTube</strong> — Government of India Initiatives
      </motion.div>
    </div>
  );
}
