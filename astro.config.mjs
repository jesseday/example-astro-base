import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import { generateIsolationRoutes } from "./src/integrations/isolation/plugin";

function setPrerender() {
  const { PREVIEW } = loadEnv(process.env.NODE_ENV || "", process.cwd(), "");

  return {
    name: "set-prerender",
    hooks: {
      "astro:route:setup": ({ route }) => {
        route.prerender = PREVIEW !== "true";
      },
    },
  };
}

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
  integrations: [setPrerender(), generateIsolationRoutes()],
});
