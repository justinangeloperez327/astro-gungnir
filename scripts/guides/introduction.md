**Gungnir is an expressive web framework built in C++23.**

Build backend applications using `.gnr` files for models, controllers, routes,
middleware and application services. Your application runs as a native executable.

## Create your first application

Install the CLI and SDK using [Getting Started](docs/getting-started.md), then run:

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
| Define endpoints and request handlers | [Routing](docs/routing.md), [Controllers](docs/controller.md) |
| Validate input and handle uploads | [Requests](docs/request.md), [Validation](docs/validation.md) |
| Store and query application data | [Models](docs/model.md), [ORM](docs/orm.md), [Migrations](docs/migration.md) |
| Render HTML with Spear templates | [Views](docs/view.md) |
| Authenticate users and authorize operations | [Authentication](docs/authentication.md), [Policies](docs/policy.md) |
| Process background work and recurring tasks | [Queues](docs/queues.md), [Scheduler](docs/scheduler.md) |
| Send email and notifications | [Mail](docs/mail.md), [Notifications](docs/notification.md) |
| Configure services and persistent storage | [Configuration](docs/configuration.md), [Storage](docs/storage.md) |
| Test and deploy | [Testing](docs/testing.md), [Production](docs/production.md) |

## Choose the right SDK

Gungnir reports **Stable 1.0.0**. Published 1.0.0 downloads provide the core SDK.
The current-source application SDK adds SQLite and password support;
Spear templates and typed delivery also require current source.
Optional adapters have their own dependencies.

Follow [SDK Packages](docs/sdk-packages.md) before configuring those features.
The installation and service guides identify the capabilities each SDK needs.
