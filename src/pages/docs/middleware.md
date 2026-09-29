---
layout: ../../layouts/DocsLayout.astro
title: Middleware
description: Run request logic before and after controller dispatch, or stop the request early.
---

Middleware wraps route execution.

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

Attach it to a route:

~~~gungnir
Route::get("/dashboard", DashboardController::index)
    .middleware(AuthMiddleware);
~~~

## Short-circuiting

Middleware can return a response without calling `next`. This is useful for authentication, authorization, rate limiting, host checks, request limits, and similar guards.

## Continuing the pipeline

When middleware continues, call and await the next handler:

~~~gungnir
return await next(request);
~~~

The continuation is asynchronous because downstream middleware or the controller may suspend.

## Application middleware

Gungnir supports application-level middleware registration, aliases, groups, and priority ordering. Use these mechanisms for reusable middleware stacks such as browser/session routes or API routes.

Global middleware executes before middleware attached to an individual route.

## Dependency injection

Middleware is resolved through the application container, so its dependencies can be managed by the same IoC system used by controllers.
