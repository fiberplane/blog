import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    // Accept both 'date' and 'pubDate' for compatibility
    date: z.coerce.date().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Fiberplane Team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }).transform((data) => ({
    ...data,
    // Normalize to pubDate for consistency
    pubDate: data.pubDate || data.date || new Date(),
  })),
});

export const collections = {
  blog,
};
