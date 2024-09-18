import path from "path";
import { glob } from "glob";
import { defineCollection } from "astro:content";

const componentsCollection = defineCollection({
  loader: async () => {
    // globs from the root of the project
    const stories = await glob(["src/**/*.story.astro"]);

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

export const collections = { components: componentsCollection };
