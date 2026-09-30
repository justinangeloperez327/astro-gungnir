import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    group: z.string(),
    groupOrder: z.number().int().nonnegative(),
    order: z.number().int().nonnegative(),
    status: z.enum(['stable', 'preview']).default('preview'),
  }),
});

export const collections = { docs };
