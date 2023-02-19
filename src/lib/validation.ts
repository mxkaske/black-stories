import * as z from "zod";

const ANSWERS = ["No", "Yes", "N/A"];
// const SIGNIFICANCE = [0, 1, 2, 3, 4, 5] as const;

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
  significance: z.coerce.number(),
});
