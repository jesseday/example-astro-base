const modules = await import.meta.glob(["/src/**/*.story.astro"], {
  import: "default",
});

export function importStory(path: string) {
  return modules[path]();
}
