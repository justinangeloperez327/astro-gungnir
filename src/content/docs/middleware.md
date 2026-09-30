---
title: "Middleware"
description: "Filter and transform requests before they reach a controller, or perform work around the downstream response."
slug: "middleware"
group: "The Basics"
groupOrder: 3
order: 2
status: preview
---


## Defining Middleware

Middleware participates in the HTTP request pipeline before controller dispatch.

~~~gungnir
middleware AuthMiddleware
{
    async Response handle(Request request, Next next)
    {
        if (!request.authenticated()) {
            return text("Unauthorized", 401);
        }

        return await next(request);
    }
}
~~~

Middleware is resolved through the application container, so its dependencies can use the same injection model as controllers.

## Attaching Middleware

Attach middleware to an individual route:

~~~gungnir
Route::get("/dashboard", DashboardController::index)
    .middleware(AuthMiddleware);
~~~

Application-level middleware can also be registered globally when every request should pass through it.

## Short-Circuiting Requests

Middleware does not have to call `next`. Returning a response immediately stops the pipeline:

~~~gungnir
if (request.header("authorization").empty()) {
    return text("Unauthorized", 401);
}
~~~

This pattern is appropriate for authentication, authorization checks, request limits, host validation, CSRF enforcement, rate limiting, and similar guards.

## Continuing the Pipeline

When a middleware allows the request to continue, call and await the downstream handler:

~~~gungnir
return await next(request);
~~~

The continuation is asynchronous because later middleware or the controller may suspend.

## Middleware Aliases and Groups

Reusable middleware may be registered under aliases and composed into groups. A browser-oriented group, for example, can combine sessions, CSRF protection, and authentication in one standard stack.

A priority order may be configured where middleware ordering is important.

## Request-Scoped Dependencies

Request-scoped dependencies are owned by the request lifecycle. Middleware should resolve scoped services through the container rather than manually starting or ending container scopes.
