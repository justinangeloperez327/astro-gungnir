---
title: "Introduction"
description: "Build web applications with Gungnir's current C++23 runtime and .gnr application syntax."
slug: ""
group: "Getting Started"
groupOrder: 1
order: 1
status: preview
---

Gungnir is an **experimental C++23 web framework and source-language toolchain**. Application code can use `.gnr` syntax for the framework areas that have language support, while the runtime remains native C++.

The current repository version is **0.1.0**. The public API is pre-stable, so applications should pin the exact Gungnir version or commit they have validated.

> This documentation describes capabilities that are implemented in the current framework. Features that only have foundations, optional adapters, or incomplete application-language support are identified explicitly.

## What You Can Use Today

The current application-facing path includes:

- project creation, build, run, and development commands;
- routes and controller actions;
- synchronous and asynchronous controller actions;
- middleware and middleware short-circuiting;
- request input, headers, cookies, route parameters, and JSON;
- response, text, JSON, view, redirect, download, and no-content responses;
- request validation with the implemented core rule set;
- server-rendered views with escaped interpolation and loops;
- models, ORM queries, timestamps, soft deletes, relationships, and eager loading;
- migrations and migration execution commands;
- database contracts plus optional PostgreSQL, MySQL/MariaDB, SQL Server, and MongoDB adapters;
- sessions, authentication, authorization, cache, events, queues, mail, scheduling, testing, and production runtime APIs.

Some of the last group currently use the **native C++ runtime API** rather than a complete dedicated `.gnr` declaration or generator workflow.

## A Small Application

~~~gungnir
controller HomeController
{
    Response index()
    {
        return view("welcome", {
            "title": "Gungnir"
        });
    }
}

Route::get("/", HomeController::index);
~~~

A normal project keeps routes, controllers, models, middleware, migrations, and views in their conventional directories.

## Recommended Reading

Start with [Installation](/docs/getting-started/), then read [Current Status](/docs/status/) before relying on a feature in production. Continue through [Routing](/docs/routing/), [Controllers](/docs/controllers/), and [Models & Relationships](/docs/models/).
