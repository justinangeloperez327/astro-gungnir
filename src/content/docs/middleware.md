---
title: "Middleware"
description: "Use the implemented asynchronous middleware pipeline and understand which registration conveniences currently remain runtime configuration."
slug: "middleware"
group: "The Basics"
groupOrder: 3
order: 2
status: preview
---

## Defining Middleware

Gungnir middleware can run before and after downstream request handling.

~~~gungnir
middleware AuthMiddleware
{
    async Response handle(Request request, Next next)
    {
        if (request.header("authorization").empty()) {
            return text("Unauthorized", 401);
        }

        return await next(request);
    }
}
~~~

Middleware that calls the downstream pipeline is asynchronous because the next middleware or controller may suspend.

## Short-Circuiting

Returning a response without calling `next` stops the pipeline.

This is the normal pattern for authentication checks, authorization checks, request limits, host validation, CSRF protection, and similar guards.

## Container Resolution

Middleware instances are resolved through the application container. Dependencies should therefore be container-managed rather than manually constructed inside route files.

## Aliases and Groups

The runtime owns a middleware registry that supports aliases, groups, and priority ordering.

Those are currently application/runtime configuration APIs. They should not be confused with dedicated source-language syntax.

## Terminable Middleware

A native `TerminableMiddleware` contract exists for work that belongs after response completion. Its execution belongs to the server/request lifecycle rather than ordinary controller code.
