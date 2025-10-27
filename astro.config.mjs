// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://blog.fiberplane.com",
  build: {
    format: "file",
  },
  integrations: [starlight({ title: "Fiberplane Blog" })],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
