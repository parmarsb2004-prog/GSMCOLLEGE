import { supabase } from "@/supabaseClient";

export type AdmissionApplication = {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  course: string;
  address: string;
  created_at: string;
};

export const submitAdmissionApplication = async (payload: Omit<AdmissionApplication, "id" | "created_at">) => {
  const { error } = await supabase.from("admissions_applications").insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    dob: payload.dob,
    course: payload.course,
    address: payload.address,
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving admission application:", error);
    throw error;
  }
};

