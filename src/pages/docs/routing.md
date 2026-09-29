---
layout: ../../layouts/DocsLayout.astro
title: Routing
description: Route incoming HTTP requests to controller actions with clear, expressive declarations.
---

Routes are normally defined in `routes/web.gnr`.

## Basic routes

~~~gungnir
Route::get("/", HomeController::index);
Route::get("/users", UserController::index);
Route::post("/users", UserController::store);
Route::delete("/users/{id}", UserController::destroy);
~~~

Controller routes resolve the controller through the application container and dispatch the selected action.

## Route parameters

Declare parameters with braces:

~~~gungnir
Route::get("/users/{id}", UserController::show);
~~~

Read the matched value from the request:

~~~gungnir
Response show(Request request)
{
    const id = request.parameter("id");

    return json(User::findOrFail(id));
}
~~~

## Route middleware

Attach middleware directly to a route:

~~~gungnir
Route::get("/dashboard", DashboardController::index)
    .middleware(AuthMiddleware);
~~~

Global middleware runs before route middleware.

## Route groups

Use route groups when several routes share a prefix, middleware set, or another common route concern. Keep group configuration at the route layer rather than repeating the same options on every endpoint.

## Named routes

Named routes give stable application-level identifiers to URLs. Prefer names for links and redirects that should not depend on a hard-coded path.

## Request lifecycle

Once a route matches, Gungnir populates route parameters, resolves middleware and the controller through the container, then dispatches the action. Exceptions pass through the framework exception handler before becoming HTTP responses.
