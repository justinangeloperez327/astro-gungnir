---
title: "Routing"
description: "Define routes with the HTTP verbs, parameters, middleware, grouping, naming, and constraints implemented by the current router."
slug: "routing"
group: "The Basics"
groupOrder: 3
order: 1
status: preview
---

## Basic Routes

Routes map an HTTP method and path to a handler or controller action.

~~~gungnir
Route::get("/users", UserController::index);
Route::post("/users", UserController::store);
Route::put("/users/{id}", UserController::update);
Route::patch("/users/{id}", UserController::update);
Route::delete("/users/{id}", UserController::destroy);
~~~

The router also supports `OPTIONS` and `HEAD`.

## Route Parameters

Dynamic path segments use braces:

~~~gungnir
Route::get("/users/{id}", UserController::show);
~~~

Read the matched parameter from the request:

~~~gungnir
Response show(Request request)
{
    return text(request.parameter("id"));
}
~~~

Parameters are repopulated for each dispatch.

## Middleware

A route can attach middleware:

~~~gungnir
Route::get("/dashboard", DashboardController::index)
    .middleware(AuthMiddleware);
~~~

Global middleware executes before route middleware.

## Groups, Names, and Constraints

The runtime router supports:

- route groups with shared path prefixes and middleware;
- named routes;
- reverse URL generation;
- regular-expression parameter constraints;
- numeric parameter constraints;
- UUID parameter constraints;
- fallback handlers.

These capabilities are part of the router API. Not every convenience has dedicated Gungnir source-language sugar yet, so native runtime calls may still appear in advanced route configuration.

## Route-Model Binding

A binding registry exists as the foundation for typed route binding.

Automatic ORM-backed controller parameters such as:

~~~text
show(User user)
~~~

are **not yet a completed feature**. Use the route parameter and perform the model lookup explicitly until typed model-binding semantics are finished.
