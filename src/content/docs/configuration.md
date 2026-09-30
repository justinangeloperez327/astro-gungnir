---
title: "Configuration"
description: "Configure a Gungnir application using .env values loaded by Application::create()."
slug: "configuration"
group: "Getting Started"
groupOrder: 1
order: 4
status: preview
---

## Environment File

A new project creates `.env` and `.env.example`. The current scaffold includes:

~~~text
APP_NAME="My App"
APP_ENV=development
APP_DEBUG=true
APP_HOST=127.0.0.1
APP_PORT=8000
VIEW_PATH=views

DB_CONNECTION=
DB_NAME=default
DB_POOL_SIZE=1
DB_HOST=127.0.0.1
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
~~~

Process environment variables take precedence over values loaded from `.env`.

## Application Bootstrap

`Application::create()` is the convention-first bootstrap entry point:

~~~gungnir
app = Application::create();

Route::get("/", HomeController::index);

app.run();
~~~

Application creation establishes the base path, loads environment values, prepares configuration, and resolves the configured view root.

## Reading Configuration

~~~gungnir
const name = app.config().string("app.name");
const port = app.config().integer("server.port");
const debug = app.config().boolean("app.debug");
~~~

`app.run()` uses the configured server host and port. Explicit listening remains available:

~~~gungnir
app.listen(8000, "127.0.0.1");
~~~

## Database Configuration

Database environment values configure settings. A concrete database adapter still has to be built and registered for the selected backend.

Setting `DB_CONNECTION=postgresql`, for example, does not by itself install libpq or register the PostgreSQL adapter.
