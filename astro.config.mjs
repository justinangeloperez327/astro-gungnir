import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL;
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  ...(site ? { site } : {}),
  base,
  markdown: {
    syntaxHighlight: false,
  },
});
