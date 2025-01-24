import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, data, image } = req.body;

  if (!username || !data) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiledata")
      .select("id")
      .ilike("username", username);

    if (fetchError) {
      console.error("Error checking username:", fetchError.message);
      return res.status(500).json({ error: "Failed to check username" });
    }

    if (existingProfile && existingProfile.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const { error: insertError } = await supabase
      .from("profiledata")
      .insert([{ username, data, image }]);

    if (insertError) {
      console.error("Error inserting profile:", insertError.message);
      return res.status(500).json({ error: "Failed to add profile" });
    }

    res.status(200).json({ message: "Profile added successfully!" });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
