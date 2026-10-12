import { rm } from 'node:fs/promises';

// Remove stale routes and search indexes before every production build.
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
