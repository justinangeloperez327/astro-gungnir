import { rm } from "node:fs/promises";

// Remove stale routes and search indexes before every production build.
await rm(new URL("../dist/", import.meta.url), {
  recursive: true,
  force: true,
});
// Astro persists compiled Markdown here; renderer changes must invalidate it.
await rm(new URL("../node_modules/.astro/data-store.json", import.meta.url), {
  force: true,
});
