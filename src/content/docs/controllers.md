---
title: "Controllers"
description: "Write current Gungnir controller actions, receive requests, inject dependencies, and use explicit async actions."
slug: "controllers"
group: "The Basics"
groupOrder: 3
order: 3
status: preview
---

## Defining a Controller

~~~gungnir
controller UserController
{
    Response index()
    {
        const users = User::all();

        return json(users);
    }
}
~~~

The language frontend provides the native controller inheritance and public action plumbing.

## Request Parameters

An action may receive the current request:

~~~gungnir
Response show(Request request)
{
    const id = request.parameter("id");
    return text(id);
}
~~~

Current controller actions may accept no request argument or a request argument. Typed ORM model parameters are not yet automatically resolved.

## Dependency Injection

~~~gungnir
controller AuditController
{
    inject Logger logger;

    Response index()
    {
        logger.info("Audit requested");
        return text("Audit");
    }
}
~~~

The frontend generates a container-aware constructor for injected dependencies.

## Async Actions

Use `async` and `await` only for operations that genuinely suspend:

~~~gungnir
controller ReportController
{
    async Response show(Request request)
    {
        const result = await fetchReport(request.parameter("id"));
        return json(result);
    }
}
~~~

The language lowers this to the native Gungnir task/coroutine runtime.

Synchronous ORM and database operations remain synchronous until the underlying API supplies a real asynchronous implementation.

## Responses

Controller helpers currently cover text, JSON, views, HTML, downloads, redirects, no-content responses, and general responses.
