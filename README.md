# Fiberplane Blog

The official engineering blog for [Fiberplane](https://fiberplane.com), covering topics around observability, developer tools, MCP (Model Context Protocol), and TypeScript.

## 🚀 Project Structure

This is an Astro-based blog with a clean design. Here's the project structure:

```
.
├── public/              # Static assets (favicons, logos, etc.)
├── src/
│   ├── assets/          # Images and media for blog posts
│   ├── content/
│   │   └── blog/        # Blog posts (.md or .mdx files)
│   ├── layouts/         # Page layouts (BaseLayout, BlogPost)
│   ├── pages/           # Route pages
│   │   ├── index.astro           # Blog listing homepage
│   │   └── blog/[...slug].astro  # Dynamic blog post routes
│   └── content.config.ts         # Content collection schema
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### Adding a New Blog Post

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add the required frontmatter at the top of the file:

```md
---
title: "Your Post Title"
description: "A brief description for SEO and post listings"
pubDate: 2025-10-29
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
---

Your blog post content starts here...
```

3. The post will automatically appear on the homepage at `/` and be accessible at `/blog/your-filename`

**Frontmatter fields:**
- `title` (required): The post title
- `description` (required): Short description for SEO
- `pubDate` (required): Publication date (YYYY-MM-DD)
- `author` (optional, defaults to "Fiberplane Team"): Post author
- `tags` (optional, defaults to []): Array of tags
- `updatedDate` (optional): Last updated date
- `draft` (optional, defaults to false): Set to true to hide from listings

Images can be added to `src/assets/` and embedded in Markdown with relative links.

Static assets like favicons can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 🎨 Design

The blog features a clean, minimal design:
- Geist Sans and Geist Mono fonts
- Dark mode support (auto, light, dark)
- Responsive layout
- Clean typography with focus on readability

## 🔗 Links

- [Fiberplane](https://fiberplane.com)
- [Documentation](https://docs.fiberplane.com)
- [GitHub](https://github.com/fiberplane)
- [Astro Documentation](https://docs.astro.build)
