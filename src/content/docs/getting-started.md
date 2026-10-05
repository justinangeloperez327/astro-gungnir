---
title: "Getting Started"
description: "Getting Started: current Gungnir APIs, usage, configuration, and documented limits."
slug: "getting-started"
group: "Getting Started"
groupOrder: 1
order: 2
status: development
sourcePath: "docs/getting-started.md"
---

Gungnir is an expressive C++23 web framework with a dedicated `.gnr` application language and a native runtime.

## Requirements

A Gungnir development environment requires a supported C++23 compiler, CMake, and the Gungnir CLI. Optional database, Redis, SMTP, TLS, HTTP/2, and storage adapters may require their native dependencies.

## Install

Install a packaged Gungnir distribution for your platform or build and install the framework from source.

After installation, verify the tools:

```sh
gungnir --version
gungnirc --version
```

## Build from source

CMake 3.25 or newer and a C++23-compatible compiler are required. Run these commands inside a checkout of the Gungnir repository. Source builds represent the current development contract; historical preview packages may differ.

```sh
cmake -S . -B build \
  -DCMAKE_BUILD_TYPE=Release \
  -DGUNGNIR_BUILD_TOOLS=ON \
  -DGUNGNIR_BUILD_TESTS=OFF

cmake --build build --parallel 2
cmake --install build
```

Verify:

```sh
gungnir --version
gungnirc --version
gungnirc --print-contract
```

Development builds report `Gungnir development`.

## Create an application

```sh
gungnir new hello
cd hello
```

A project contains application declarations, routes, views, configuration, bootstrap code, tests, and build metadata.

## Create a controller

```gnr
controller HomeController {
    index() {
        return text("Hello from Gungnir");
    }
}
```

## Register a route

```gnr
Route::get("/", HomeController::index);
```

## Build and run

```sh
gungnir build
gungnir run
```

The development server can rebuild and restart the application while source files change:

```sh
gungnir dev
```

The generated environment listens on `http://127.0.0.1:8000`. Change `APP_HOST` and `APP_PORT` in `.env` to choose another address. See [Configuration](/docs/configuration/).

## Validate source

```sh
gungnirc app/controllers/HomeController.gnr --check
```

The check command performs Gungnir parsing and semantic/framework validation without producing a native executable.

## Generate application files

Use the CLI to generate framework declarations:

```sh
gungnir make:model User
gungnir make:controller UserController
gungnir make:migration CreateUsers
gungnir make:middleware Authenticate
gungnir make:policy UserPolicy app.models.User::User
gungnir make:event UserRegistered
gungnir make:listener SendWelcomeEmail app.events.UserRegistered::UserRegistered
gungnir make:notification WelcomeNotification app.models.User::User
gungnir make:mail WelcomeMail
gungnir make:job ProcessImport
```

Generated declarations follow Gungnir naming and project-layout conventions.

## Next steps

Continue with [The Gungnir Language](/docs/language/), [Routing](/docs/routing/), [Controllers](/docs/controllers/), [Models](/docs/models/), [ORM](/docs/orm/), [Migrations](/docs/migrations/), and [Testing](/docs/testing/).
