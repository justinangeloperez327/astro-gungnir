---
title: "Introduction"
description: "Build native web applications with models, controllers, routes, views and application services."
slug: ""
group: "Getting Started"
groupOrder: 1
order: 1
sourcePath: "README.md"
---

**Gungnir is an expressive web framework built in C++23.**

Build backend applications using `.gnr` files for models, controllers, routes,
middleware and application services. Your application runs as a native executable.

## Create your first application

Install the CLI and SDK using [Getting Started](/docs/getting-started/), then run:

```sh
gungnir new hello
cd hello
gungnir build
gungnir run
```

Open `http://127.0.0.1:8000`. Use `gungnir dev` for automatic rebuilds while editing.

## Handle a request

Define `app/controllers/HomeController.gnr`:

```gnr
controller HomeController {
    Response index() {
        return text("Hello from Gungnir");
    }
}
```

Register it in `routes/web.gnr`:

```gnr
Route::get("/", HomeController::index);
```

## Build your application

| Task | Guide |
| --- | --- |
| Define endpoints and request handlers | [Routing](/docs/routing/), [Controllers](/docs/controllers/) |
| Validate input and handle uploads | [Requests](/docs/requests-responses/), [Validation](/docs/validation/) |
| Store and query application data | [Models](/docs/models/), [ORM](/docs/orm/), [Migrations](/docs/migrations/) |
| Render HTML with Spear templates | [Views](/docs/views/) |
| Authenticate users and authorize operations | [Authentication](/docs/auth/), [Policies](/docs/policies/) |
| Process background work and recurring tasks | [Queues](/docs/queues/), [Scheduler](/docs/scheduler/) |
| Send email and notifications | [Mail](/docs/mail/), [Notifications](/docs/notifications/) |
| Configure services and persistent storage | [Configuration](/docs/configuration/), [Storage](/docs/storage/) |
| Test and deploy | [Testing](/docs/testing/), [Production](/docs/production/) |

## Choose the right SDK

Gungnir reports **Stable 1.0.0**. Published 1.0.0 downloads provide the core SDK.
The current-source application SDK adds SQLite and password support;
Spear templates and typed delivery also require current source.
Optional adapters have their own dependencies.

Follow [SDK Packages](/docs/sdk-packages/) before configuring those features.
The installation and service guides identify the capabilities each SDK needs.
