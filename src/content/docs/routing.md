---
title: "Routing"
description: "Define HTTP routes, controller actions, middleware, names, groups, constraints, resources, and binding contracts."
slug: "routing"
group: "Framework"
groupOrder: 4
order: 4
status: preview
---

## Basic Routes

~~~gnr
Route::get('/users', UserController::index);
~~~

Routes use explicit HTTP methods and controller actions.

## Parameters

~~~gnr
Route::get(
    '/users/{user}',
    UserController::show
);
~~~

## Middleware and Names

Routes can be fluently configured:

~~~gnr
Route::get(
    '/users/{user}',
    UserController::show
)
    .middleware(AuthMiddleware)
    .name('users.show');
~~~

## Routing Contract

The canonical Gungnir routing contract includes:

- route parameters;
- named routes;
- middleware;
- constraints;
- groups;
- resource routes;
- model binding;
- scoped bindings.

Because Gungnir is pre-1.0, consult the current compiler/runtime implementation before assuming every part of this target routing contract is complete in a particular build.
