---
title: "Introduction"
description: "Gungnir is an expressive web framework built in C++ for building structured web applications with clear conventions."
slug: ""
group: "Getting Started"
groupOrder: 1
order: 1
status: preview
---


## Start Building

The shortest path from a new project to an application endpoint is:

~~~text
Install Gungnir
→ create the application
→ define a route
→ create a controller
→ add a model when data is needed
~~~

If you are new to Gungnir, read [Installation](/docs/getting-started/), [Configuration](/docs/configuration/), and [Directory Structure](/docs/project-structure/) in order.

If you already know a convention-first web framework, start with [Routing](/docs/routing/), [Controllers](/docs/controllers/), and [Models & Relationships](/docs/models/) to learn the Gungnir vocabulary quickly.

## Meet Gungnir

Gungnir provides the structure most web applications need without making application code revolve around low-level framework plumbing. Routes, controllers, middleware, validation, models, views, authentication, queues, mail, and other application services follow a consistent set of conventions.

Application source uses the `.gnr` format. The framework keeps native C++ interoperability available while giving normal application code a more focused syntax.

> Gungnir is currently under active development. Pin the framework version or commit that your application has been validated against.

## Why Gungnir?

Gungnir is designed around a few practical goals:

- **Expressive application code** — common web concepts should read like web concepts.
- **Convention first** — predictable defaults reduce repetitive configuration.
- **Native performance** — applications ultimately run as native C++ programs.
- **Explicit behavior** — asynchronous work, database queries, authorization, and external services should not be hidden behind surprising runtime behavior.
- **Complete application structure** — the framework covers the HTTP layer, data access, views, security, background work, testing, and production concerns.

## Create an Application

Once the Gungnir CLI is installed, create and run an application with:

~~~text
gungnir new my-app
cd my-app
gungnir run
~~~

A new project follows the normal Gungnir structure:

~~~text
my-app/
├── app/
│   ├── controllers/
│   ├── middleware/
│   └── models/
├── config/
├── database/
│   └── migrations/
├── routes/
│   └── web.gnr
├── views/
├── .env
└── .gungnir-project
~~~

## A Small Example

Define a route:

~~~gungnir
Route::get("/users", UserController::index);
~~~

Create a controller:

~~~gungnir
controller UserController
{
    Response index()
    {
        const users = User::all();

        return view("users/index", {
            "users": users
        });
    }
}
~~~

Create a model:

~~~gungnir
model User
{
    string name;
    string email;
    bool active = true;
}
~~~

This is the style the rest of the documentation uses: application conventions first, implementation details only where they affect how you build or deploy the application.

## Where to Go Next

Start with [Installation](/docs/getting-started/) and [Configuration](/docs/configuration/), then read [Directory Structure](/docs/project-structure/). After that, the HTTP workflow normally starts with [Routing](/docs/routing/), [Controllers](/docs/controllers/), and [Requests & Responses](/docs/requests-responses/).
