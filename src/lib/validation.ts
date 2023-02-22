import * as z from "zod";

export const ANSWERS = ["No", "Yes", "N/A", "Solved"] as const;

// DISCUSS: Should `\n` be checked as well, additionally to trimming string?

export const responseSchema = z.object({
  answer: z
    .string()
    .trim()
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
