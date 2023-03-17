import * as z from "zod";

export const ANSWERS = ["No", "Yes", "N/A", "Solved"] as const;

export const responseSchema = z.object({
  answer: z
    .string()
    .trim()
    // REMINDER: removes either the "No." or "No, you need to explain the solution."
    .transform((val) => val.replace(/(\,|\.).*$/i, ""))
    .refine(
      (val) => ANSWERS.find((i) => i === val),
      (val) => ({
        message: `Invalid answer. Expected '${ANSWERS.join(
          ", "
        )}, received ${val}`,
      })
    )
    .transform((val) => val.trim()),
});
