---
title: "Command Line"
description: "Use the project-aware Gungnir CLI for application creation, builds, runs, development, and compiler tooling."
slug: "cli"
group: "Getting Started"
groupOrder: 1
order: 6
status: preview
---

## Core Workflow

~~~text
gungnir new <name>
gungnir build
gungnir run
gungnir dev
~~~

The CLI is project-aware and should generate canonical Gungnir source.

## Compiler Tooling

As implementation matures, compiler tooling is intended to expose:

- source checking;
- formatting;
- Syntax AST inspection;
- semantic inspection;
- Validated AST inspection;
- generated-C++ inspection.

## Generators

Generators should only be enabled for constructs that the language and compiler can support correctly.

Gungnir is pre-1.0, so generator availability may lag behind the canonical declaration set while lowering and validation paths are completed.
