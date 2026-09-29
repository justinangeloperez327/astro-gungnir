---
layout: ../../layouts/DocsLayout.astro
title: Controllers
description: Organize HTTP request handling into focused controller actions with dependency injection and explicit async behavior.
---

## Writing Controllers

A controller groups related HTTP actions:

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

Controller actions are application-facing actions by convention, so normal Gungnir source does not need C++ access-specifier boilerplate.

## Receiving the Request

An action may receive the current request:

~~~gungnir
Response store(Request request)
{
    const name = request.input("name");

    return response(name, 201);
}
~~~

Use the request object for input, headers, cookies, route parameters, sessions, authentication state, and validation.

## Dependency Injection

Declare a container-managed dependency with `inject`:

~~~gungnir
controller AuditController
{
    inject Logger logger;

    Response index()
    {
        logger.info("Audit page requested");

        return text("Audit");
    }
}
~~~

The controller itself does not need to manually construct its dependencies.

## Async Actions

Use `async` and `await` for operations that genuinely suspend:

~~~gungnir
controller ReportController
{
    async Response show(Request request)
    {
        const report = await fetchReport(request.parameter("id"));

        return json(report);
    }
}
~~~

Gungnir keeps suspension explicit. Synchronous ORM or database operations remain synchronous until the underlying runtime provides a true asynchronous implementation.

## Returning Responses

Controller actions can return the standard response helpers:

~~~gungnir
return text("Created", 201);
return json(user);
return view("users/show", { "user": user });
return response("Accepted", 202);
~~~

The framework exception handler covers common application failures such as validation, authentication, authorization, missing models, and unexpected server errors.
