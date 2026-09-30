---
title: "Routing"
description: "Define application endpoints, route parameters, controller actions, and middleware."
slug: "routing"
group: "The Basics"
groupOrder: 3
order: 1
status: preview
---


## Basic Routing

Web routes are normally defined in `routes/web.gnr`.

~~~gungnir
Route::get("/", HomeController::index);
Route::get("/users", UserController::index);
Route::post("/users", UserController::store);
Route::delete("/users/{id}", UserController::destroy);
~~~

A route maps an HTTP method and path to a controller action. Controllers are resolved through the application container when the route is dispatched.

## Route Parameters

Dynamic path segments use braces:

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

Route parameters are request-owned and repopulated for each dispatch.

## Route Middleware

Attach middleware to a route when the endpoint requires additional request processing:

~~~gungnir
Route::get("/dashboard", DashboardController::index)
    .middleware(AuthMiddleware);
~~~

Global middleware executes before route middleware. A middleware may return a response immediately or continue the request to the next middleware/controller.

## Route Groups

Use route groups when several endpoints share a common concern such as a URL prefix or middleware set. Grouping keeps repeated route configuration in one place while leaving controller actions focused on application behavior.

## Named Routes

Named routes provide stable application-level identifiers for URLs. Prefer a route name when code should refer to a destination without depending on the route's literal path.

## Controllers and Routes

Keep route declarations small. If a route begins accumulating input handling, database access, or business rules, move that logic into a controller or application service and keep the route responsible only for dispatch configuration.
