// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: 'https://blog.fiberplane.com',
  integrations: [],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
