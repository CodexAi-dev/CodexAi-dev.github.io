# dilshanjanith.me

Personal portfolio of **Dilshan Janith** — full-stack developer and designer, founder of SiteLab Solutions.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

---

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Command             | Does                                    |
| ------------------- | --------------------------------------- |
| `npm run build`     | Production build                        |
| `npm start`         | Serve the production build              |
| `npm run lint`      | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit`                          |

## Editing content

All copy and data live in `src/content/` — no need to touch markup:

| File            | Holds                                             |
| --------------- | ------------------------------------------------- |
| `site.ts`       | Name, role, intro, email, phone, socials          |
| `projects.ts`   | Portfolio entries (add `live` / `repo` URLs here) |
| `experience.ts` | Work and education timeline                       |
| `tech.ts`       | Grouped tools and technologies                    |
| `services.ts`   | SiteLab Solutions services and metrics            |

To add a project, append an object to `projects` and drop its screenshot in
`public/projects/`. Entries without an `image` fall back to a typographic tile,
so a missing screenshot never breaks the layout.

## Design system

Tokens live at the top of `src/app/globals.css` as CSS custom properties, mirrored
into Tailwind via `@theme inline`. Light and dark both clear WCAG AA on every
text/background pair.

| Token       | Light     | Dark      |
| ----------- | --------- | --------- |
| `--bg`      | `#f6f5f2` | `#131211` |
| `--surface` | `#ffffff` | `#1c1b19` |
| `--ink`     | `#171614` | `#edeae4` |
| `--muted`   | `#63605a` | `#94908a` |
| `--accent`  | `#b4451f` | `#e8825a` |

Three rules hold the look together:

1. **Near-monochrome.** The accent (burnt sienna) is reserved for marks, active
   states and focus — never large fills. Primary buttons invert to `--ink`
   instead, which reads as print rather than as a landing page.
2. **Mono carries the metadata.** Section numbers, years, tags and form labels
   use IBM Plex Mono via the `.meta` class. That does the work a second accent
   colour would otherwise have to do.
3. **Hairlines, not boxes.** Rules and dividers structure the page; corners are
   `rounded-md` / `rounded-lg`, never pills.

Type: **IBM Plex Sans** (400/500/600) throughout including headings, **IBM Plex
Mono** (400/500) for metadata. Both self-hosted at build time by `next/font`.
To swap the typeface, change the two imports at the top of `src/app/layout.tsx` —
nothing else references a font by name.

## Contact form

The form posts to a server action in `src/app/actions.ts`, which sends mail via
[Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=
CONTACT_FROM_EMAIL=   # an address on a domain verified in Resend
CONTACT_TO_EMAIL=     # where enquiries land
```

Until those are set the form validates normally but returns a message asking the
visitor to email directly — it never silently drops an enquiry.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is detected automatically.
3. Add the three environment variables above under **Settings → Environment Variables**.
4. Add `dilshanjanith.me` under **Settings → Domains** and follow the DNS instructions.
5. Turn off GitHub Pages for this repo (**Settings → Pages → Source: None**) so the two don't fight over the domain.
