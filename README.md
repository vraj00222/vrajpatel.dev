# vrajpatel.dev

My personal portfolio and blog — a fast, single-page site with a dark/light
theme, live GitHub activity, and long-form writing on the things I build and
break.

**Live:** https://vrajpatel.xyz

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
- **Blog** — long-form articles at `/blog`, rendered from React components.
- **Accessibility** — skip link, visible focus states, `prefers-reduced-motion`
  support throughout.

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
| --------------------------------- | ---------------------------------------------- |
| `/api/contributions`             | GitHub contribution calendar for a given year  |
| `/api/merged-prs`                | Merged PRs authored in popular repositories    |
| `/api/visitors`                  | Visitor counter                                |
| `/api/cron/refresh-contributions`| Daily cache refresh (Vercel cron)              |

## License

[MIT](./LICENSE)
