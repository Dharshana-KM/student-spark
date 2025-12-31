import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  status: "in_progress" | "completed";
  progress: number;
  current_module: string | null;
  started_at: string;
  last_accessed_at: string;
  completed_at: string | null;
}

export function useCourseProgress() {
  const { user } = useAuth();
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserCourses = useCallback(async () => {
    if (!user) {
      setUserCourses([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_courses")
        .select("*")
        .eq("user_id", user.id)
        .order("last_accessed_at", { ascending: false });

      if (error) throw error;
      setUserCourses((data as UserCourse[]) || []);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserCourses();
  }, [fetchUserCourses]);

  const startCourse = async (courseId: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("user_courses")
        .upsert({
          user_id: user.id,
          course_id: courseId,
          status: "in_progress",
          progress: 0,
          started_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString()
        }, {
          onConflict: "user_id,course_id"
        })
        .select()
        .single();

      if (error) throw error;
      await fetchUserCourses();
      return data;
    } catch (error) {
      console.error("Error starting course:", error);
      return null;
    }
  };

  const updateProgress = async (courseId: string, progress: number, currentModule?: string) => {
    if (!user) return null;

    try {
      const updateData: Record<string, unknown> = {
        progress,
        last_accessed_at: new Date().toISOString()
      };

      if (currentModule) {
        updateData.current_module = currentModule;
      }

      if (progress >= 100) {
        updateData.status = "completed";
        updateData.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("user_courses")
        .update(updateData)
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .select()
        .single();

      if (error) throw error;
      await fetchUserCourses();
      return data;
    } catch (error) {
      console.error("Error updating progress:", error);
      return null;
    }
  };

  const getCourseProgress = (courseId: string): UserCourse | undefined => {
    return userCourses.find(uc => uc.course_id === courseId);
  };

  const getStartedCoursesCount = () => userCourses.length;

  const getInProgressCourses = () => userCourses.filter(uc => uc.status === "in_progress");

  const getCompletedCourses = () => userCourses.filter(uc => uc.status === "completed");

  return {
    userCourses,
    loading,
    startCourse,
    updateProgress,
    getCourseProgress,
    getStartedCoursesCount,
    getInProgressCourses,
    getCompletedCourses,
    refetch: fetchUserCourses
  };
}
