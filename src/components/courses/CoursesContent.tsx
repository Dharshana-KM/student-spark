import { motion } from "framer-motion";
import { 
  Play, 
  Clock, 
  BookOpen, 
  Search,
  ChevronRight,
  Star,
  Users,
  CheckCircle,
  Circle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type CourseStatus = "not_started" | "in_progress" | "completed";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  modules: number;
  students: number;
  rating: number;
  thumbnail: string;
  status: CourseStatus;
  progress: number;
  currentModule?: string;
  category: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of ML, from linear regression to neural networks.",
    instructor: "Prof. Amit Kumar",
    level: "Beginner",
    duration: "8 weeks",
    modules: 12,
    students: 2340,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    status: "in_progress",
    progress: 45,
    currentModule: "Module 3: Neural Networks",
    category: "Tech"
  },
  {
    id: "2",
    title: "Web Development Bootcamp",
    description: "Full-stack web development with HTML, CSS, JavaScript, React, and Node.js.",
    instructor: "Sneha Reddy",
    level: "Beginner",
    duration: "12 weeks",
    modules: 18,
    students: 5600,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop",
    status: "in_progress",
    progress: 22,
    currentModule: "Module 2: CSS Flexbox",
    category: "Tech"
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    description: "Master DSA concepts essential for coding interviews and problem-solving.",
    instructor: "Vikram Singh",
    level: "Intermediate",
    duration: "10 weeks",
    modules: 15,
    students: 3200,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
    status: "not_started",
    progress: 0,
    category: "Tech"
  },
  {
    id: "4",
    title: "Product Management Fundamentals",
    description: "Learn to build products users love — from ideation to launch.",
    instructor: "Meera Iyer",
    level: "Beginner",
    duration: "6 weeks",
    modules: 8,
    students: 1890,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    status: "completed",
    progress: 100,
    category: "Business"
  },
  {
    id: "5",
    title: "Design Thinking Workshop",
    description: "A hands-on approach to solving complex problems through design.",
    instructor: "Arjun Das",
    level: "Beginner",
    duration: "4 weeks",
    modules: 6,
    students: 2100,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop",
    status: "not_started",
    progress: 0,
    category: "Design"
  },
  {
    id: "6",
    title: "Public Speaking for Students",
    description: "Build confidence and master the art of impactful communication.",
    instructor: "Kavya Nair",
    level: "Beginner",
    duration: "3 weeks",
    modules: 5,
    students: 980,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    status: "not_started",
    progress: 0,
    category: "Skills"
  },
];

const categories = ["All", "Tech", "Business", "Design", "Skills"];
const statusFilters = ["All", "In Progress", "Not Started", "Completed"];

export function CoursesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredCourses = courses.filter((course) => {
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
          Skill-based learning designed for students who want to grow.
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
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
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
              >
                {course.status === "not_started" ? "Start Course" : 
                 course.status === "completed" ? "Review Course" : "Continue"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
