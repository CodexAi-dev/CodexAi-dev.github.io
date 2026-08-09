"use server";

import { Resend } from "resend";
import { z } from "zod";

import { site } from "@/content/site";
import type { ContactState } from "@/lib/contact";

const contactSchema = z.object({
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

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real people never fill a hidden field. Pretend it worked.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks — your message is on its way.", fieldErrors: {} };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject"),
    service: formData.get("service") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Not configured yet — fail loudly with a route the visitor can still use,
  // rather than silently swallowing the enquiry.
  if (!apiKey || !from) {
    return {
      status: "error",
      message: `The contact form isn't connected yet. Please email ${site.email} directly.`,
      fieldErrors: {},
    };
  }

  const { name, email, phone, subject, service, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio enquiry — ${subject}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone ?? "—"}`,
        `Service: ${service ?? "—"}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] resend error", error);
      return {
        status: "error",
        message: `Something went wrong sending that. Please email ${site.email} directly.`,
        fieldErrors: {},
      };
    }

    return {
      status: "success",
      message: "Thanks — I've got your message and will reply within a day.",
      fieldErrors: {},
    };
  } catch (error) {
    console.error("[contact] unexpected error", error);
    return {
      status: "error",
      message: `Something went wrong sending that. Please email ${site.email} directly.`,
      fieldErrors: {},
    };
  }
}
