import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw Error("Couldn't find supabase connection info");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
