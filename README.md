# Gungnir Website

Official documentation website for **Gungnir**, an expressive web framework built in C++.

The site is built with Astro and presents Gungnir as a conventional application framework: installation, configuration, routing, controllers, middleware, requests and responses, validation, views, sessions, security, database access, ORM, application services, testing, and production.

## Visual System

The documentation UI uses the Gungnir colorway:

- Blue: `#145DA0`
- White: `#FFFFFF`
- Silver: `#C7CBD1`
- Black: `#0B0D10`

The layout follows the information-density and navigation patterns common to mature framework documentation sites while retaining Gungnir branding.

## Public Images

Public image assets belong in:

~~~text
public/images/
~~~

Files placed there are available from `/images/<filename>`.

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

## CI

GitHub Actions verifies the website on pushes to `main`, pull requests targeting `main`, and manual workflow runs.

The CI workflow installs dependencies and runs the Astro production build. Deployment is intentionally not configured until a deployment platform is selected.
