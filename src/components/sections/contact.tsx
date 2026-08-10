"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, Check, Send } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/ui";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  contactSchema,
  initialContactState,
  toFieldErrors,
  type ContactState,
} from "@/lib/contact";

/** Inlined at build time by Next; supplied by the deploy workflow. */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const fieldClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm text-ink " +
  "placeholder:text-muted/60 transition-colors focus:border-ink focus:outline-none";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-ink px-6 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
    >
      {pending ? (
        <>
          <span
            aria-hidden
            className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          Sending
        </>
      ) : (
        <>
          Send message
          <Send className="size-3.5" aria-hidden />
        </>
      )}
    </button>
  );
}

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: site.phoneHref, note: site.workingHours },
  {
    label: "WhatsApp",
    value: site.phone,
    href: site.whatsapp,
    note: "Quickest for short questions",
  },
  { label: "Location", value: site.location },
];

const socialIcons = { github: GithubIcon, linkedin: LinkedinIcon } as const;

export function Contact() {
  const [state, setState] = useState<ContactState>(initialContactState);
  const [pending, setPending] = useState(false);

  const errorFor = (field: string) => state.fieldErrors[field];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never fill a hidden field. Pretend it worked.
    if (data.get("company")) {
      setState({ status: "success", message: "Thanks — your message is on its way.", fieldErrors: {} });
      return;
    }

    const parsed = contactSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone") || undefined,
      subject: data.get("subject"),
      service: data.get("service") || undefined,
      message: data.get("message"),
    });

    if (!parsed.success) {
      setState({
        status: "error",
        message: "Please check the highlighted fields.",
        fieldErrors: toFieldErrors(parsed.error),
      });
      return;
    }

    // Not configured yet — say so plainly rather than swallowing the enquiry.
    if (!WEB3FORMS_KEY) {
      setState({
        status: "error",
        message: `The contact form isn't connected yet. Please email ${site.email} directly.`,
        fieldErrors: {},
      });
      return;
    }

    setPending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // Spread first so the derived fields below win over the raw values.
        body: JSON.stringify({
          ...parsed.data,
          access_key: WEB3FORMS_KEY,
          from_name: parsed.data.name,
          subject: `Portfolio enquiry — ${parsed.data.subject}`,
        }),
      });
      const result = (await response.json()) as { success?: boolean };

      if (result.success) {
        form.reset();
        setState({
          status: "success",
          message: "Thanks — I've got your message and will reply within a day.",
          fieldErrors: {},
        });
      } else {
        setState({
          status: "error",
          message: `Something went wrong sending that. Please email ${site.email} directly.`,
          fieldErrors: {},
        });
      }
    } catch {
      setState({
        status: "error",
        message: `Something went wrong sending that. Please email ${site.email} directly.`,
        fieldErrors: {},
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Section id="contact" tinted>
      <SectionHeading
        index="04"
        eyebrow="Contact"
        title="Let's talk about what you're building."
        lead="Tell me roughly what you need and when. I read everything and reply within a day."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal>
          {/* Contact details as a ruled definition list */}
          <dl className="divide-y divide-line border-y border-line">
            {channels.map((channel) => (
              <div key={channel.label} className="grid grid-cols-[5.5rem_1fr] gap-3 py-4">
                <dt className="meta pt-0.5">{channel.label}</dt>
                <dd className="min-w-0">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                      className="block truncate py-0.5 text-sm text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <p className="py-0.5 text-sm text-ink">{channel.value}</p>
                  )}
                  {channel.note ? (
                    <p className="mt-0.5 text-xs text-muted">{channel.note}</p>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex gap-2">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-md border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-lg border border-line bg-surface p-5 sm:p-6"
            noValidate
          >
            {/* honeypot — hidden from people, tempting to bots */}
            <div aria-hidden className="absolute left-[-9999px] top-0">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                required
                autoComplete="name"
                placeholder="Your name"
                error={errorFor("name")}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                error={errorFor("email")}
              />
              <Field
                id="phone"
                label="Phone"
                type="tel"
                autoComplete="tel"
                placeholder="+94 XX XXX XXXX"
                optional
              />
              <div>
                <label className="meta" htmlFor="service">
                  Service
                </label>
                <select id="service" name="service" className={cn(fieldClass, "mt-1.5")}>
                  <option value="">Select one</option>
                  <option>Website development</option>
                  <option>E-commerce or booking</option>
                  <option>Management system</option>
                  <option>UI/UX or brand design</option>
                  <option>Maintenance &amp; support</option>
                  <option>Something else</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <Field
                id="subject"
                label="Subject"
                required
                placeholder="Project enquiry"
                error={errorFor("subject")}
              />
            </div>

            <div className="mt-4">
              <label className="meta" htmlFor="message">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="What are you building, roughly when do you need it, and is there a budget range in mind?"
                aria-invalid={Boolean(errorFor("message"))}
                aria-describedby={errorFor("message") ? "message-error" : undefined}
                className={cn(
                  fieldClass,
                  "mt-1.5 resize-y",
                  errorFor("message") && "border-accent",
                )}
              />
              {errorFor("message") ? (
                <p id="message-error" className="mt-1 text-xs text-accent">
                  {errorFor("message")}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <SubmitButton pending={pending} />
              <p className="text-xs text-muted">
                Or email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink underline underline-offset-4 hover:text-accent"
                >
                  {site.email}
                </a>
              </p>
            </div>

            <div aria-live="polite" aria-atomic="true">
              {state.status !== "idle" && state.message ? (
                <p
                  className={cn(
                    "mt-5 flex items-start gap-2 rounded-md border px-3 py-2.5 text-[0.8125rem]",
                    state.status === "success"
                      ? "border-line bg-bg-subtle text-ink"
                      : "border-accent/40 bg-accent-soft text-accent",
                  )}
                >
                  {state.status === "success" ? (
                    <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  ) : (
                    <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  )}
                  {state.message}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  required,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="meta" htmlFor={id}>
        {label}{" "}
        {required ? (
          <span className="text-accent">*</span>
        ) : optional ? (
          <span className="normal-case tracking-normal">(optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClass, "mt-1.5", error && "border-accent")}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
