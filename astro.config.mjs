import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import { generateIsolationRoutes } from "astro-launchpad";
import { setPrerender } from "./src/integrations/previewMode";

const serverConfig =
  process.env.PRERENDER !== "true"
    ? {
        output: "server",
        adapter: process.env.NETLIFY
          ? netlify()
          : node({
              mode: "standalone",
            }),
      }
    : {};

export default defineConfig({
  experimental: {
    contentLayer: true,
  },
  ...serverConfig,
  integrations: [
    setPrerender(),
    generateIsolationRoutes({
      routePrefix: "/docs",
      layoutFile: "./src/shared/layouts/Launchpad.astro",
    }),
  ],
});
