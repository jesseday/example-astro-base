import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";

function setPrerender() {
  const { PRERENDER } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

  return {
    name: "set-prerender",
    hooks: {
      "astro:route:setup": ({ route }) => {
        route.prerender = PRERENDER === "true";
      },
    },
  };
}

function generateIsolationRoutes() {
  return {
    name: "generate-isolation-routes",
    hooks: {
      "astro:config:setup": ({ injectRoute }) => {
        if (process.env.NODE_ENV === "production") {
          return;
        }

        injectRoute({
          pattern: "/isolation/[...component]",
          entrypoint: "src/isolation/page.astro",
        });
      },
    },
  };
}

let serverConfig =
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

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentLayer: true,
  },
  ...serverConfig,
  integrations: [setPrerender(), generateIsolationRoutes()],
});
