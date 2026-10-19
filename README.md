# Gungnir Documentation Website

The Astro website for **Gungnir**, an expressive web framework built in C++23.
The public guides explain installation, application code, HTTP, databases,
security, services, testing and deployment.

## Run locally

Use Node.js 22.23.3 or a newer supported version and npm:

```sh
npm install
npm run dev
```

Open `http://localhost:4321`. The site uses Astro, Tailwind CSS and light/dark
themes with the Gungnir blue, white, silver and black palette. The logo lives in
`public/images/logo-alt.png`.

## Build and search

```sh
npm run build
npm run preview
```

The production build clears old output, renders the guides, creates the
Pagefind search index, and checks local links and section anchors. Search opens
with Ctrl+K / Cmd+K or `/`. Search requires a production build.

## Update the guides

Sync from a clean checkout of `justinangeloperez327/gungnir`:

```sh
npm run docs:sync -- ../gungnir
npm run build
```

The sync script imports an explicit selection of application guides and removes
obsolete pages. Navigation, previous/next links and search use that collection.
Compiler internals, engineering audits, contributor references and development
plans are excluded.

Reader-oriented replacements live in `scripts/guides/`; other presentation
changes live in `scripts/public-guides.mjs`. Review these against the framework
when refreshing. Modify those sources rather than the generated Markdown in
`src/content/docs/`.

`src/data/gungnir-source.json` records the exact framework commit, version and
content hashes. Guide links point to that revision. The installation guides
distinguish published 1.0.0 core downloads from current-source SDK features.

| Command | Action |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Clean, build, index search and validate the site |
| `npm run build:site` | Clean and build without indexing search |
| `npm run preview` | Preview the production build |
| `npm run docs:sync -- ../gungnir` | Refresh the application guides |
| `npm run docs:check` | Verify content and collection membership |
| `npm run docs:check -- --built` | Also check rendered pages, links and anchors |

GitHub Actions runs the full production build on main pushes, pull requests and
manual workflow runs. Hosting is managed separately.

## Website verification

The homepage uses keyboard-accessible HTTP, data and view examples, local fonts,
and an optimized version of the existing logo. It uses static Astro output and
keeps Pagefind search lazy-loaded. Dark mode is the default; a saved light-mode
choice persists between pages and syncs across open tabs. The Laravel-inspired
layout uses locally hosted Inter, compact grouped navigation and a shared set of
semantic CSS colors in `src/styles/global.css`. Homepage styles live in
`src/styles/home.css`; both themes cover code panels, search and mobile menus.
Reduced-motion preferences affect animation without changing theme colors.

```sh
npm ci
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

Playwright checks desktop and mobile navigation, example tabs, search, theme
persistence, clipboard behavior, horizontal overflow and automated WCAG AA rules.
CI runs these checks against the production build. To use an existing browser
locally, set `CHROMIUM_EXECUTABLE_PATH` to its executable.

Design targets are LCP <= 1.2 seconds, INP <= 200 ms and CLS <= 0.1 at p75,
with <= 30 KB gzip of initial JavaScript per page. These are targets, not field
measurements. The local Lighthouse review aims for accessibility >= 95 and
performance >= 90. No React runtime or client-side rendering framework is added.
