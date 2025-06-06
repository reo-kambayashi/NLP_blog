import { defineCollection, z } from 'astro:content';

const papersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  papers: papersCollection,
};
