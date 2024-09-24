import { loadEnv } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ModuleInterface = {
  story: {
    name: string;
    description: string;
  };
};

export function storyLoader() {
  return {
    loader: async () => {
      // globs from the root of the project
      const stories = await import.meta.glob(["/src/**/*.story.astro"]);

      const entries = [];
      for (const path in stories) {
        const entry = stories[path]().then((mod) => {
          const definition = mod as ModuleInterface;
          return {
            id: definition?.story?.name.toLowerCase(),
            ...definition?.story,
            path,
          };
        });
        entries.push(entry);
      }

      return Promise.all(entries);
    },
  };
}

/**
 * Astro plugin that generates a route for isolation mode.
 *
 * The route is only injected in preview mode.
 *
 *
 * @see https://docs.astro.build/reference/api-plugins#hooks
 * @returns {import("astro/types").Plugin}
 */
export function generateIsolationRoutes() {
  const { PREVIEW } = loadEnv(process.env.NODE_ENV || "", process.cwd(), "");

  return {
    name: "generate-isolation-routes",
    hooks: {
      "astro:config:setup": ({
        injectRoute,
      }: {
        injectRoute: (route: { pattern: string; entrypoint: string }) => void;
      }) => {
        if (PREVIEW !== "true") {
          return;
        }

        injectRoute({
          pattern: "/isolation/[...component]",
          entrypoint: path.join(__dirname, "page.astro"),
        });
      },
    },
  };
}
