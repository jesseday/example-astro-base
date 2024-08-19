export default function (plop) {
  // create your generators here
  plop.setGenerator("component:astro", {
    description: "A new astro component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}.astro",
        templateFile: "plop-templates/component.astro.hbs",
      },
    ],
  });
}
