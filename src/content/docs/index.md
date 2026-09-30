---
title: "Introduction"
description: "Gungnir is an expressive web framework built in C++23 with a focused .gnr application language."
slug: ""
group: "Getting Started"
groupOrder: 1
order: 1
status: preview
---

**Gungnir is an expressive web framework built in C++23.**

Application code is written in Gungnir's focused `.gnr` language and compiles to ordinary, inspectable C++23.

Gungnir is designed around expressive application syntax, convention over boilerplate, strongly typed application code, native performance, and C++ interoperability.

## Application Code

~~~gnr
model User {
    table = 'users';

    fillable = [
        'name',
        'email'
    ];

    posts() {
        return hasMany('posts');
    }
}
~~~

~~~gnr
controller UserController {
    inject UserService users;

    public async show(int id) {
        const user = await users.find(id);

        if (user == null) {
            return response(null, 404);
        }

        return json(user);
    }
}
~~~

~~~gnr
Route::get('/users/{user}', UserController::show)
    .middleware(AuthMiddleware)
    .name('users.show');
~~~

## Framework Direction

Gungnir treats models, controllers, middleware, migrations, policies, events, listeners, notifications, and mail as first-class application concepts.

The language intentionally does **not** try to reproduce all of C++. Native pointers, references, allocator syntax, template plumbing, and coroutine machinery belong to generated/runtime C++, not normal application source.

## Pre-1.0 Status

Gungnir is under active development and is **pre-1.0**.

The canonical documentation describes the target language and framework contract. Some compiler/runtime areas are still being migrated toward that contract, so a documented target feature is not automatically proof that the current compiler implements every detail.

Read [Current Status](/docs/status/) before relying on a feature in production.
