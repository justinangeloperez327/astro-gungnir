# Gungnir Website

Official documentation website for **Gungnir**, an expressive web framework built in C++.

The website uses Astro and Tailwind CSS 4. Its documentation structure is optimized for framework reference material: persistent navigation, restrained reading width, visible hierarchy, accessible focus states, responsive navigation, and high-contrast code examples.

## Design System

The interface uses the Gungnir colorway:

- Blue: `#145DA0`
- White: `#FFFFFF`
- Silver: `#C7CBD1`
- Black: `#0B0D10`

Design tokens are defined with Tailwind's CSS-first `@theme` configuration in `src/styles/global.css`.

## Public Images

Public image assets belong in:

~~~text
public/images/
~~~

The primary brand asset is `public/images/logo-alt.png`.

## Requirements

- Node.js 22.23.3 or newer supported release
- npm

## Development

~~~bash
npm install
npm run dev
~~~

The development server is available at `http://localhost:4321`.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production site |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Run Astro CLI commands |

## Styling

Tailwind CSS 4 is connected through the official `@tailwindcss/vite` plugin in `astro.config.mjs`.

Most application and layout styling uses Tailwind utility classes directly in Astro components. The global stylesheet contains the Tailwind import, Gungnir design tokens, base accessibility rules, and Markdown content styles that cannot be applied directly to generated Markdown elements.

## CI

GitHub Actions verifies the website on pushes to `main`, pull requests targeting `main`, and manual workflow runs.

The CI workflow installs dependencies and runs the Astro production build. Deployment is intentionally not configured until a deployment platform is selected.
