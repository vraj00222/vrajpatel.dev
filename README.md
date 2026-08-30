# vrajpatel.xyz

**Live:** https://vrajpatel.xyz

## About me

I'm Vraj Patel — I build software, publish research, and write about both.
This repo is my personal site: a single-page portfolio with live GitHub
activity, a proof strip of things I can back up with a link (a peer-reviewed
paper, hackathon wins, open-source contributions), and a small blog where I
write up projects in more depth.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** for dev/build
- **Tailwind CSS v4** (CSS-first `@theme` config)
- **Framer Motion** for animation
- **Vercel** for hosting, serverless API routes, and a daily cron

## Features

- **Theme** — light/dark toggle with a no-flash bootstrap; defaults to dark
  regardless of OS preference, persisted to `localStorage`.
- **GitHub activity** — contribution calendar rendered as an inline SVG.
  Past years are bundled as static JSON (no loading flash); the current/rolling
  year is fetched live. Also surfaces merged PRs to popular (500★+) repos.
- **Content sections** — About & skills, work history, projects, research
  (with BibTeX), hackathons, and a reading list of papers.
- **Blog** — long-form articles at `/blog`, rendered from React components,
  code-split and lazy-loaded per route.
- **Accessibility** — skip link, visible focus states, `prefers-reduced-motion`
  support throughout.

## Components

Each section of the page is one self-contained component under
`src/components/`, composed together in `src/App.tsx`:

| Component            | Renders                                              |
| --------------------- | ----------------------------------------------------- |
| `Hero.tsx`            | Name, tagline, proof-stat strip                        |
| `About.tsx`           | Bio and skills                                         |
| `Experience.tsx`      | Work history timeline                                  |
| `Projects.tsx`        | Project cards                                          |
| `Research.tsx`        | Papers with BibTeX export                              |
| `Hackathons.tsx`      | Hackathon results                                      |
| `Reading.tsx`         | Reading list                                           |
| `Stats.tsx`           | Consolidated metrics + open-source repos contributed to |
| `GitHubActivity.tsx`  | Contribution calendar + merged PRs                      |
| `Labs.tsx`            | Experiments / side projects                             |
| `BlogIndex.tsx` + `components/blog/` | Blog listing and individual articles     |
| `Contact.tsx`         | Contact links                                          |
| `Navbar.tsx` / `Footer.tsx` | Site chrome                                       |
| `ui/aurora-background.tsx` | Animated gradient background used behind sections |
| `ui/logos-badge.tsx`  | Stacked, spring-animated logo badge                     |

Anything reusable outside a single section (icons, the fade-in-on-scroll
wrapper, the active-section-tracking hook) lives in `Icons.tsx`,
`FadeIn.tsx`, and `hooks/useActiveSection.ts` respectively.

## Using this for your own site

This is a real personal site, not a template, but it's MIT-licensed and
built to be forked:

1. Fork/clone the repo and `npm install`.
2. Replace the content in `src/data/content.ts` (bio, experience, projects,
   hackathons, skills, stats) and `src/data/papers.ts` (reading list) with
   your own — these two files drive almost everything on the page.
3. Swap `src/assets/` (photo, images) and `public/` (resume, favicon,
   og-image, logos) for your own assets.
4. Point the GitHub-activity components at your own username, and update
   the social/contact links in `Contact.tsx` and `Footer.tsx`.
5. If you want the live GitHub stats and visitor counter, deploy to Vercel
   and set up the API routes below (they need a `GITHUB_TOKEN` env var);
   otherwise delete `api/` and the components that call it.
6. Update `LICENSE` copyright and `vercel.json` / domain settings for your
   own deployment.

## Development

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check + production build
npm run lint     # eslint
npm run preview  # preview the production build
```

> Note: the Vite dev server doesn't run the `/api/*` serverless routes, so on
> `localhost` the GitHub components fetch from the deployed API instead.

## Project structure

```
src/
  components/      UI components (one section per file)
  components/ui/   small reusable pieces (aurora background, logos badge)
  components/blog/ blog articles + shared article shell
  data/            site content — edit these to update the site
    content.ts       personal info, experience, projects, hackathons, skills
    papers.ts        reading list
    blog.ts          blog post metadata
  hooks/           custom hooks (e.g. active-section tracking)
api/               Vercel serverless functions
public/            static assets (resume, favicon, images)
```

## API routes

| Route                             | Purpose                                        |
| --------------------------------- | ----------------------------------------------- |
| `/api/contributions`             | GitHub contribution calendar for a given year  |
| `/api/merged-prs`                | Merged PRs authored in popular repositories    |
| `/api/visitors`                  | Visitor counter                                |
| `/api/cron/refresh-contributions`| Daily cache refresh (Vercel cron)              |

## License

[MIT](./LICENSE) — use it, fork it, strip it for parts.
