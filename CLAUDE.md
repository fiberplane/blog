# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro blog site for Fiberplane. It's a clean, minimal blog with Vercel-inspired styling, focusing on readability and performance.

## Development Commands

All commands use `pnpm` as the package manager:

- `pnpm install` - Install dependencies
- `pnpm dev` - Start local dev server at `localhost:4321`
- `pnpm build` - Build production site to `./dist/`
- `pnpm preview` - Preview built site locally before deploying
- `pnpm astro ...` - Run Astro CLI commands (e.g., `pnpm astro check` for type checking)

### Troubleshooting

If you encounter 404 errors or the dev server shows stale content:
1. Stop the dev server
2. Delete `.astro` directory: `rm -rf .astro`
3. Delete `dist` directory: `rm -rf dist`
4. Restart dev server: `pnpm dev`
5. Clear browser cache or use incognito mode

## Architecture

### Content Management

- **Blog posts**: All blog posts live in `src/content/blog/` as `.md` or `.mdx` files
- **File-based routing**: Each file in `src/content/blog/` becomes a route at `/blog/{filename}`
  - Example: `src/content/blog/welcome.md` → `/blog/welcome`
- **Content schema**: Defined in `src/content.config.ts` using Astro's content collections
- **Frontmatter fields**:
  - `title` (required): The post title
  - `description` (required): A short description for SEO and post listings
  - `pubDate` (required): Publication date
  - `updatedDate` (optional): Last updated date
  - `author` (optional, defaults to "Fiberplane Team"): Post author
  - `tags` (optional, defaults to []): Array of tags
  - `draft` (optional, defaults to false): Set to true to hide from listings

### Routes

- `/` - Blog listing page showing all published posts (newest first)
- `/blog/[slug]` - Individual blog post pages

### Layouts

- **BaseLayout.astro**: Base HTML structure with header, footer, and global styles
  - Includes Geist Sans and Geist Mono fonts
  - Responsive header with Fiberplane logo
  - Clean footer
  - Dark mode support via `prefers-color-scheme`

- **BlogPost.astro**: Layout for individual blog posts
  - Post header with title, date, author, and tags
  - Formatted content area with proper typography
  - Responsive design
  - Dark mode support

### Styling

- **Design philosophy**: Clean, minimal Vercel-inspired aesthetic
  - No sidebar navigation
  - Focus on content readability
  - Clean typography with Geist Sans and Geist Mono
  - Subtle borders and spacing
  - Blue accent color (#3b82f6)
- **Styling approach**: Scoped CSS in Astro components with CSS custom properties for theming
- **Dark mode**: Automatic based on system preference using `prefers-color-scheme`

### Assets

- **Images for content**: Place in `src/assets/` and reference with relative links in Markdown
- **Static assets**: Place in `public/` for favicons, robots.txt, etc. (copied as-is to build output)

## Key Files

- `astro.config.mjs` - Main Astro configuration
- `src/content.config.ts` - Content collection schema definition
- `src/layouts/BaseLayout.astro` - Base HTML layout with global styles
- `src/layouts/BlogPost.astro` - Blog post layout template
- `src/pages/index.astro` - Blog listing homepage
- `src/pages/blog/[...slug].astro` - Dynamic route for blog posts
- `src/content/blog/` - Directory containing all blog posts

## Writing Blog Posts

To create a new blog post:

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add frontmatter with required fields:
   ```md
   ---
   title: "Your Post Title"
   description: "A brief description of your post"
   pubDate: 2025-10-20
   author: "Your Name"
   tags: ["tag1", "tag2"]
   ---

   Your content here...
   ```
3. The post will automatically appear on the homepage and be accessible at `/blog/your-filename`

## Deployment

This site is configured to deploy to Cloudflare R2 via GitHub Actions (see `.github/workflows/`).
