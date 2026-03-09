import { supabase } from "@/supabaseClient";

export type Student = {
  id: string;
  name: string;
  email: string;
  enrollmentNumber?: string;
  course?: string;
  createdAt?: Date;
};

export const fetchRecentStudents = async (): Promise<Student[]> => {
  const { data, error } = await supabase
    .from("students")
    .select("id, name, email, enrollmentNumber, course, createdAt")
    .order("createdAt", { ascending: false })
    .limit(10);

  if (error) {
    // If table doesn't exist or no permission, just return empty instead of breaking admin UI
    console.error("Error fetching students:", error);
    return [];
  }

  return (
    data?.map((row) => ({
      id: row.id,
      name: row.name || "",
      email: row.email || "",
      enrollmentNumber: row.enrollmentNumber || "",
      course: row.course || "",
      createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
    })) ?? []
  );
};

