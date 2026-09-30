---
title: "Installation"
description: "Install Gungnir, create a project, and run the current framework toolchain."
slug: "getting-started"
group: "Getting Started"
groupOrder: 1
order: 2
status: preview
---

## Requirements

Gungnir currently requires:

- a **C++23-capable compiler**;
- **CMake 3.25 or newer**;
- an installed Gungnir package that provides the runtime and command-line tools.

Optional database, Redis, SMTP, TLS, and other adapters have their own native-library requirements and are not part of the minimal core build.

## Create an Application

Use the framework CLI:

~~~text
gungnir new my-app
cd my-app
gungnir run
~~~

The CLI creates the conventional application directories, a local environment file, a starter route, controller, and view.

## Build

Create a development build:

~~~text
gungnir build
~~~

Create a release build:

~~~text
gungnir build --release
~~~

Framework-generated native files and build output live under `.gungnir/`. Treat that directory as generated output rather than application source.

## Development Command

The project-aware CLI also exposes:

~~~text
gungnir dev
~~~

Gungnir is still pre-stable. Before upgrading the framework, validate the application against the exact version or commit you intend to deploy.
