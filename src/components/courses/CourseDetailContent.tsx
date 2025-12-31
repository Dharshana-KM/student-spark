import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  ExternalLink,
  Play,
  CheckCircle,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { courses } from "./courseData";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { toast } from "sonner";

export function CourseDetailContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseProgress, startCourse, updateProgress } = useCourseProgress();
  
  const course = courses.find(c => c.id === id);
  const userProgress = id ? getCourseProgress(id) : undefined;
  const progress = userProgress?.progress || 0;
  const status = userProgress?.status || "not_started";
  
  if (!course) {
    return (
      <div className="max-w-4xl mx-auto pt-16 lg:pt-0 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Button onClick={() => navigate("/courses")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
      </div>
    );
  }

  const handleStartCourse = async () => {
    if (!id) return;
    
    const result = await startCourse(id);
    if (result) {
      toast.success("Course started! Good luck on your learning journey.");
    }
  };

  const handleContinueLearning = async () => {
    if (!id || !userProgress) {
      await handleStartCourse();
      return;
    }
    
    // Simulate progress increase (in real app, this would be based on video progress)
    const newProgress = Math.min(progress + 10, 100);
    await updateProgress(id, newProgress, `Module ${Math.ceil(newProgress / (100 / course.modules))}`);
    
    if (newProgress >= 100) {
      toast.success("Congratulations! You've completed this course! 🎉");
    } else {
      toast.success("Progress saved!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-16 lg:pt-0">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button variant="ghost" onClick={() => navigate("/courses")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
      </motion.div>

      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {course.source}
          </Badge>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-display font-bold">
          {course.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            <span>{course.instructor}</span>
          </div>
          <span>•</span>
          <span>{course.institute}</span>
        </div>

        <p className="text-lg text-muted-foreground">
          {course.description}
        </p>

        <p className="text-sm text-muted-foreground italic">
          Created by students, for students.
        </p>
      </motion.div>

      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl overflow-hidden bg-card border border-border shadow-card"
      >
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${course.youtubeId}`}
            title={course.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>

      {/* Progress & Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span>{course.modules} modules</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          {userProgress?.current_module && (
            <p className="text-xs text-muted-foreground">Currently on: {userProgress.current_module}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="flex-1" onClick={handleContinueLearning}>
            <Play className="w-4 h-4 mr-2" />
            {status === "not_started" ? "Start Course" : "Continue Learning"}
          </Button>
          {course.courseUrl && (
            <Button variant="outline" size="lg" asChild>
              <a href={course.courseUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on {course.source}
              </a>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Course Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="text-xl font-display font-semibold mb-4">Course Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            {course.overview}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="text-xl font-display font-semibold mb-4">Why This Course Matters</h2>
          <p className="text-muted-foreground leading-relaxed">
            {course.whyItMatters}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h2 className="text-xl font-display font-semibold mb-4">Who Should Take This Course</h2>
        <ul className="space-y-3">
          {course.whoShouldTake.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Source Attribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center"
      >
        <p className="text-sm text-primary font-medium">
          📚 This course is sourced from <strong>{course.source}</strong> – {course.institute} • Government of India Initiative
        </p>
      </motion.div>
    </div>
  );
}
