import path from "path";
import { glob } from "glob";
import { defineCollection, z } from "astro:content";
import client, { getAll } from "../shared/contentful";

const page = defineCollection({
  // By default the ID is a slug generated from
  // the path of the file relative to `base`
  loader: async () => {
    const entries = await getAll(
      async ({ skip, limit }: { skip: number; limit: number }) => {
        return await client().getEntries({
          content_type: "landingPage",
          include: 10,
          skip,
          limit,
        });
      },
    );

    return entries.map((entry: any) => {
      if (!entry) {
        return;
      }

      return {
        id: entry.fields.slug,
        slug: entry.fields.slug,
        title: entry.fields.title,
        seo: entry.fields.seo,
        ...entry.fields,
      };
    });
  },
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    seo: z.object({}).default({}),
  }),
});

const componentsCollection = defineCollection({
  loader: async () => {
    // globs from the root of the project
    const stories = await glob([
      "src/lib/**/*.story.astro",
      "src/components/**/*.story.astro",
    ]);

    const entries = stories.map(async (story) => {
      const definition = await import(
        /* @vite-ignore */ path.join("../../", story)
      );

      return {
        id: definition.story.name.toLowerCase(),
        ...definition.story,
        file: definition.file,
      };
    });

    return Promise.all(entries);
  },
});

export const collections = { page, components: componentsCollection };
