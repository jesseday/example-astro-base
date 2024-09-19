# Codebase organization

## Overview

Astro will always create the /src/pages directory
when installed. If you install with sample files
it will also create a /src/components and
/src/layouts directory. That looks like this:

```text
/
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
```

This structure makes sense, but we want to introduce
an architectural principle that make it simple
for us to understand and make choices about
our code.

For this, we're going to borrow principles from
[Feature Sliced Design](https://feature-sliced.design/)
though we do not plan on implementing it exactly.

## Applying FSD

See below for more information on why we have adopted this
structure and what goes in each directory.

For our purposes, I've defined additional directories
that related to each other in a dependency hierarchy.
Below, I've listed the directories, in their actual
dependency hierarchy. Eg, anything at the top can
depend on anything below it.

```text
/
├── src/
│   ├── pages/...
│   ├── blocks/...
│   ├── components/...
│   ├── entities/...
│   └── shared/...
│      ├── api/...
│      ├── ui/...
│      ├── layouts/...
│      └── styles/...
```

## What principles of FSD do we care about

The primary concepts of FSD that we want to borrow are
those of hierarchy and isolation.

While we want to guide ourselves to good patterns and
some default organizational styles, if we don't
get it perfectly right that's okay. It at least
gives us some directive to strive for.

### Layers

FSD defines what it calls "Layers". Each layer has a
specific purpose, ensuring that code at each layer is
similar in intent. This helps us to organize our code
and provide guidelines on how to break up modules and
business logic at the appropriate abstraction level.

### Isolation and Hierarcy of layers

In FSD, the concept of isolation is actually one of
dependency hierarchy. It says that,

"[Each] module should not depend directly on
other modules of the same layer or overlying layers".

By isolating the code that each layer can rely on, we
decouple business logic and ui from modules of the same
layer that may otherwise go unnoticed until you or a
colleague have the unfortunate task of refactoring.

## Our naming conventions and dependency directions

As stated, we want to adopt principles of FSD where
practical, without locking ourselves into naming
conventions that may or may not work for our purposes.

For that reason, we're adopting the following layer
name conventions within this directory and defining
them as follows. This also represents to top to bottom
dependency direction.

As an example, Components can depend on items
at the Entity or Shared level, but not on other Components
or Blocks.

- Pages:
  - full pages. This is an important Astro directory and essentially
    holds the app.
  - FSD equivalent: Pages
- Blocks:
  - large self-contained chunks of functionality or UI, usually
    delivering an entire use case.
  - FSD equivalent: Widgets
- Components:
  - reused implementations of entire product features, i.e. actions that bring
    business value to the user.
  - FSD equivalent: Features
- Entities:
  - Business entities that the project works with, like page or post.
  - FSD equivalent: Entities
- Shared:
  - reusable functionality, especially when it's detached
    from the specifics of the project/business, though not necessarily.
  - FSD equivalent: Shared

Other directories that are outside of the FSD hierarchy

- Content: Astro content collection definitions
- Integrations: Astro integrations.
