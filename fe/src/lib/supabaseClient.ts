import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseClient = async (supabaseAccessToken: string) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  });

  return supabase;
};

export async function uploadImage(
  file: File,
  bucketName: string,
  filePath: string
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);
  return { data, error };
}

export default supabase;
