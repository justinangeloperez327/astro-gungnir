---
title: "Command Line"
description: "Use the project-aware Gungnir CLI and only the generators and migration commands that are currently implemented."
slug: "cli"
group: "Getting Started"
groupOrder: 1
order: 6
status: preview
---

## Project Commands

The current project-aware CLI exposes:

~~~text
gungnir new <name> [path]
gungnir build [--release]
gungnir run [--release]
gungnir dev
~~~

Project discovery walks upward until it finds `.gungnir-project`.

## Working Generators

~~~text
gungnir make:model User
gungnir make:controller UserController
gungnir make:middleware AuthMiddleware
gungnir make:migration create_users_table
~~~

Generators refuse to overwrite an existing application file.

> In 0.1.0, some generator templates still emit the compatible class-style Gungnir/C++ form even though the language frontend also supports first-class `model`, `controller`, and `middleware` declarations.

## Unavailable Generators

These are intentionally rejected by the current CLI:

~~~text
gungnir make:request
gungnir make:job
~~~

`make:request` is waiting for `ValidatedRequest` source-language lowering. `make:job` is waiting for queue-job source-language lowering.

## Migration Commands

The current CLI exposes:

~~~text
gungnir migrate
gungnir migrate:rollback
gungnir migrate:reset
gungnir migrate:status
gungnir migrate:plan
~~~

`migrate:plan` can compile migration plans for the selected backend without opening a database connection. Execution commands require a registered concrete database driver.
