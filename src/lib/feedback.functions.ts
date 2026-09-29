import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key);
}

export type FeedbackInput = {
  name: string;
  location: string;
  product_bought: string;
  rating: number;
  message: string;
};

export const submitFeedback = createServerFn({ method: "POST" })
  .validator((data: FeedbackInput) => data)
  .handler(async ({ data }) => {
    const payload = {
      name: data.name.trim(),
      location: data.location.trim(),
      product_bought: data.product_bought.trim(),
      rating: data.rating,
      message: data.message.trim(),
    };

    if (!payload.name || !payload.location || !payload.product_bought || !payload.message || !payload.rating) {
      throw new Error("All fields are required");
    }

    if (payload.rating < 1 || payload.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const { error } = await publicClient().from("feedback").insert(payload);
    if (error) {
      console.error("Supabase insert error (feedback):", error.message);
      throw new Error("Failed to submit feedback. Please try again later.");
    }

    return { ok: true as const };
  });

export const listFeedback = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await publicClient()
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase select error (feedback):", error.message);
      throw new Error("Failed to load feedback");
    }

    return data || [];
  });
