---
title: "Configuration"
description: "Environment values, native bootstrap hooks, and optional database adapters."
slug: "configuration"
group: "Getting Started"
groupOrder: 1
order: 4
status: development
---

## Environment values

A generated project includes `.env` and `.env.example`:

```text
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
```

Process environment variables take precedence over `.env`. `APP_HOST` and `APP_PORT` select the HTTP address; the default is `http://127.0.0.1:8000`. Set `APP_DEBUG=false` for production.

## Native bootstrap

`bootstrap/app.hpp` is editable application code. Builds preserve it. Register adapters, service providers, dependency bindings, and middleware in `bootstrap::configure(Application&)`. Use `bootstrap::boot(Application&)` for registrations that require a booted application.

These hooks use the native C++ API. For example, within `bootstrap::configure`:

```cpp
const auto name = app.config().string("app.name");
const auto port = app.config().integer("server.port");
const auto debug = app.config().boolean("app.debug");
```

See [Dependency Injection](/docs/container/) and [Application Lifecycle](/docs/request-lifecycle/).

## Database adapters

Generated projects link and register native database adapters exported by the installed Gungnir package. The selected backend must have been built with its native dependencies. Setting an environment value alone does not install a driver.

`DB_CONNECTION` selects a backend and `DB_NAME` names the application's connection. With no configured database, the generated welcome page can still run; database operations require a configured connection. See [Database](/docs/database/) for backend capabilities.

## Application services

The generated bootstrap provides memory cache, queue, and mail plus local storage. Memory services are process-local. A separate queue worker needs a shared backend such as Redis, configured consistently with the HTTP application. Configure authentication, persistent sessions and remember-token storage explicitly.

See [Queues](/docs/queues/), [Scheduler](/docs/scheduler/), [Authentication](/docs/auth/), and [Production](/docs/production/).
