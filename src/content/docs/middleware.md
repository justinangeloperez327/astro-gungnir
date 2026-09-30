---
title: "Middleware"
description: "Create middleware as a first-class Gungnir declaration around the request pipeline."
slug: "middleware"
group: "Framework"
groupOrder: 3
order: 5
status: preview
---

## Middleware Declaration

~~~gnr
middleware AuthMiddleware {
    inject AuthService auth;

    public async handle(Request request, Next next) {
        const user = await auth.resolve(request);

        if (user == null) {
            return response(null, 401);
        }

        return await next(request);
    }
}
~~~

Middleware can inspect or modify a request before the controller, short-circuit with a response, or continue the pipeline through `next`.

## Dependency Injection

Middleware supports injected application services using the same dependency-container model as controllers.

## Async Pipeline

The downstream request pipeline may suspend, so asynchronous middleware uses ordinary Gungnir `async` / `await` rather than exposing C++ coroutine syntax.
