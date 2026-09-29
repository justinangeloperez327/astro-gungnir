---
layout: ../../layouts/DocsLayout.astro
title: Controllers
description: Controllers organize request handling into focused application actions.
---

Controllers use the `controller` declaration.

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

Controller actions are public application actions by convention.

## Request parameters

An action can receive the current request:

~~~gungnir
Response store(Request request)
{
    const name = request.input("name");

    return response(name, 201);
}
~~~

## Dependency injection

Declare container-managed dependencies with `inject`:

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

Gungnir resolves controller dependencies through the application container. Application code does not need to manually construct controller dependencies.

## Async actions

Use `async` and `await` when the work is genuinely asynchronous:

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

Do not mark synchronous database or ORM work asynchronous merely for syntax consistency. Gungnir keeps suspension points explicit.

## Returning responses

Controller actions may return framework responses such as:

~~~gungnir
return text("Created", 201);
return json(user);
return view("users/show", { "user": user });
return response("Accepted", 202);
~~~
