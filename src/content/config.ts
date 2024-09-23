import { defineCollection } from "astro:content";
import { storyLoader } from "@integrations/isolation/plugin";

export const collections = { components: defineCollection(storyLoader()) };
