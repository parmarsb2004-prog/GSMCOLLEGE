import { createClient } from "@supabase/supabase-js";

// Using your provided Supabase project credentials directly
const supabaseUrl = "https://ywecvjgxbuelcnyzqewp.supabase.co";
const supabaseAnonKey = "sb_publishable_S-0L4sIIoK9d3gG37LBKTg__eMLrXbM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


