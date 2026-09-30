---
title: "Installation"
description: "Install Gungnir, create a new application, and run your first route."
slug: "getting-started"
group: "Getting Started"
groupOrder: 1
order: 2
status: preview
---


## Requirements

A Gungnir development environment requires:

- a C++23-capable compiler;
- CMake 3.25 or newer;
- the Gungnir framework and `gungnir` command-line tool.

Gungnir applications use `.gnr` files for normal application code while retaining interoperability with native C++ where needed.

> Gungnir is under active development. Pin the framework version or commit your application has been validated against.

## Creating an Application

Create a new application from the command line:

~~~text
gungnir new my-app
cd my-app
gungnir run
~~~

The `new` command creates the conventional application structure and `run` builds and starts the application from the project root.

## Your First Route

Open `routes/web.gnr` and register a route:

~~~gungnir
Route::get("/", HomeController::index);
~~~

Create the controller in `app/controllers/`:

~~~gungnir
controller HomeController
{
    Response index()
    {
        return text("Hello from Gungnir");
    }
}
~~~

Run the application again:

~~~text
gungnir run
~~~

## Generating Application Classes

The CLI can generate common application types:

~~~text
gungnir make:model User
gungnir make:controller UserController
gungnir make:middleware AuthMiddleware
gungnir make:migration create_users_table
~~~

Generated files follow Gungnir's standard directories so application code stays predictable as the project grows.

## Building an Application

Create a development build with:

~~~text
gungnir build
~~~

For a release build:

~~~text
gungnir build --release
~~~

Framework-managed generated build files live under `.gungnir/`. Treat that directory as build output rather than application source.

## Next Steps

Continue with [Configuration](/docs/configuration/) and [Directory Structure](/docs/project-structure/), then move into [Routing](/docs/routing/) and [Controllers](/docs/controllers/).
