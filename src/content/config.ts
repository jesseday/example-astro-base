import { defineCollection } from "astro:content";
import { storyLoader } from "astro-launchpad/plugin";

export const collections = { components: defineCollection(storyLoader()) };
