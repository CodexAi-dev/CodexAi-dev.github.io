import { z } from "zod";

/**
 * Validation runs in the browser now. On a static host there is no server to
 * re-check it, so treat this as UX only — Web3Forms does its own spam and
 * abuse filtering on the receiving end.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.email("That email address doesn't look right."),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().min(3, "Give the message a subject.").max(120),
  service: z.string().trim().max(60).optional(),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps — 20 characters minimum.")
    .max(4000),
});

export type ContactValues = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

/** Maps a zod failure to one message per field, first error wins. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] ??= issue.message;
  }
  return fieldErrors;
}
