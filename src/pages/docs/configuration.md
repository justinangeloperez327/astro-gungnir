---
layout: ../../layouts/DocsLayout.astro
title: Configuration
description: Configure a Gungnir application through environment values and the application configuration repository.
---

## Environment Configuration

Gungnir loads application environment values during `Application::create()`. Keep environment-specific values in `.env` during local development and provide them through the process environment in deployed environments.

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

Process environment values take precedence over values from `.env`.

## Application Environment

`APP_ENV` describes the current application mode. Gungnir normalizes application environments around development, testing, staging, and production behavior.

Production applications should normally use:

~~~text
APP_ENV=production
APP_DEBUG=false
~~~

Do not commit production secrets to `.env` files in source control.

## Reading Configuration

Configuration is available through the application:

~~~gungnir
const name = app.config().string("app.name");
const port = app.config().integer("server.port");
const debug = app.config().boolean("app.debug");
~~~

Use configuration values for application behavior instead of scattering environment lookups throughout controllers and services.

## Server Configuration

The normal application bootstrap can read host and port configuration:

~~~gungnir
app = Application::create();

Route::get("/", HomeController::index);

app.run();
~~~

You can still start the listener explicitly when required:

~~~gungnir
app.listen(8000, "0.0.0.0");
~~~

## Database Configuration

The database settings are loaded into the application configuration during bootstrap. Selecting a backend does not make unavailable native drivers magically available; the matching database adapter must be built and registered for the application.

Supported backend identifiers at the framework contract level include PostgreSQL, MySQL/MariaDB, SQL Server, and MongoDB.
