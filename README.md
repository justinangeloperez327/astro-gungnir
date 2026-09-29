# Gungnir Website

Official documentation website for **Gungnir**, an expressive web framework built in C++.

The site is built with Astro and focuses on the public framework conventions used to build applications: routing, controllers, requests and responses, models and ORM, database migrations, middleware, validation, views, authentication and authorization, application services, testing, and production.

## Requirements

- Node.js 22.12.0 or newer
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

## CI/CD

GitHub Actions provides automated build verification and deployment.

- **CI** runs on pushes and pull requests targeting `main` and verifies that the Astro production build succeeds.
- **CD** runs after pushes to `main`, builds the site using GitHub Pages metadata, uploads the `dist/` artifact, and deploys it to the `github-pages` environment.
- Both workflows can also be started manually from the Actions tab.

The Astro configuration reads `SITE_URL` and `BASE_PATH` during deployment so links and assets work whether the Pages site is hosted at the account root, under the repository path, or later behind a configured custom domain.

## Documentation Structure

Framework documentation lives under `src/pages/docs/`. Shared documentation navigation and presentation are defined by `src/layouts/DocsLayout.astro`.

The public documentation deliberately focuses on how developers use Gungnir. Compiler frontend and generated-code implementation details belong in the framework repository rather than the normal application documentation.
