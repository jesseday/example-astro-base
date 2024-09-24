import { defineCollection } from "astro:content";
import { storyLoader } from "@integrations/launchpad/plugin";

export const collections = { components: defineCollection(storyLoader()) };
