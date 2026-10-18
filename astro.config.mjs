import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import docElements from "./scripts/rehype-doc-elements.mjs";
import { unified } from "@astrojs/markdown-remark";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: false,
    processor: unified({ rehypePlugins: [docElements] }),
  },
});
