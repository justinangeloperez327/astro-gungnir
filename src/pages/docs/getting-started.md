---
layout: ../../layouts/DocsLayout.astro
title: Installation & Setup
description: Create a Gungnir application and start building with the framework conventions.
---

Gungnir applications use the `.gnr` source format for application code while compiling to native C++23 applications.

> Gungnir is currently under active development. Pin the framework version or commit your project has been validated against.

## Requirements

A Gungnir development environment requires:

- a C++23-capable toolchain
- CMake 3.25 or newer
- the Gungnir framework and `gungnir` CLI installed

The framework supports native toolchains across Linux, macOS, and Windows as the project matures.

## Create an application

Use the framework CLI to scaffold a conventional application:

~~~text
gungnir new my-app
cd my-app
gungnir run
~~~

The generated project keeps framework plumbing out of normal application code. Your work primarily lives in `app/`, `routes/`, `database/`, `views/`, and `config/`.

## Your first route

Open `routes/web.gnr` and define a route:

~~~gungnir
Route::get("/", HomeController::index);
~~~

Then create a controller:

~~~gungnir
controller HomeController
{
    Response index()
    {
        return text("Hello from Gungnir");
    }
}
~~~

Run the application:

~~~text
gungnir run
~~~

## Build for release

Use a release build when preparing the application for deployment:

~~~text
gungnir build --release
~~~

Gungnir handles the application build pipeline while keeping the generated native build artifacts under the framework-managed `.gungnir/` directory.

## Configuration

Application configuration begins with `.env`. Common keys include:

~~~text
APP_NAME=MyApp
APP_ENV=local
APP_DEBUG=true
APP_HOST=127.0.0.1
APP_PORT=8000

DB_CONNECTION=postgresql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=my_app
DB_USERNAME=postgres
DB_PASSWORD=
~~~

Process environment variables take precedence over values loaded from `.env`.
