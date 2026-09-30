---
title: "Controllers"
description: "Define public request actions with dependency injection and an implicit response contract."
slug: "controllers"
group: "Framework"
groupOrder: 4
order: 3
status: preview
---

## Controller Declaration

~~~gnr
controller UserController {
    inject UserService users;

    public index() {
        return view('users/index', {
            'users': User::orderBy('name').get()
        });
    }

    public async show(int id) {
        const user = await users.find(id);

        if (user == null) {
            return response(null, 404);
        }

        return json(user);
    }
}
~~~

Controller actions have an implicit **Response contract**.

Application code does not need to expose native controller inheritance or C++ coroutine task wrappers.

## Dependency Injection

Declare a dependency with `inject`:

~~~gnr
inject UserService users;
~~~

Dependencies are resolved through the application container.

## Public Actions

Controller methods intended for routing are explicit public actions:

~~~gnr
public index() {
    return json(User::all());
}
~~~

## Async Actions

Use `public async` when the action awaits asynchronous work:

~~~gnr
public async show(int id) {
    const user = await users.find(id);
    return json(user);
}
~~~
