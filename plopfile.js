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
      {
        type: "list",
        name: "type",
        message: "What type of component is this?",
        choices: ["ui", "flow", "layout", "thirdparty"],
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{lowerCase type}}/{{pascalCase name}}.astro",
        templateFile: "plop-templates/component.astro.hbs",
      },
    ],
  });
}
