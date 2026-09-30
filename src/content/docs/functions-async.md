---
title: "Functions & Async"
description: "Define typed functions and asynchronous functions without exposing C++ coroutine wrapper types."
slug: "functions-async"
group: "Language"
groupOrder: 2
order: 2
status: preview
---

## Functions

Functions declare application-facing parameter and return types:

~~~gnr
function string fullName(
    string first,
    string last
) {
    return first + ' ' + last;
}
~~~

## Async Functions

Async functions expose their **logical return type**:

~~~gnr
async function User loadUser(int id) {
    return await users.find(id);
}
~~~

Application code does not spell native coroutine wrappers such as `Task<User>`.

The compiler may generate coroutine-backed C++ internally, but the application contract remains `User`.

## Controller Async

The same rule applies inside controllers:

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

Async is semantic rather than decorative: `await` represents an operation that may suspend.
