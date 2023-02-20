import * as z from "zod";

export const ANSWERS = ["No", "Yes", "N/A", "Solved"] as const;

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
