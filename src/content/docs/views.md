---
title: "Views"
description: "Render the current server-side template syntax with escaped output, loops, models, and collections."
slug: "views"
group: "The Basics"
groupOrder: 3
order: 5
status: preview
---

## Returning a View

~~~gungnir
Response index()
{
    const users = User::all();

    return view("users/index", {
        "users": users,
        "title": "Users"
    });
}
~~~

View names resolve beneath the configured view root.

## Escaped Output

~~~html
<h1>{{ title }}</h1>
<p>{{ user.name }}</p>
~~~

Double braces HTML-escape values by default.

## Raw Output

Triple braces render trusted raw HTML:

~~~html
{{{ trustedHtml }}}
~~~

Do not use raw output for untrusted user input.

## Loops

~~~html
<ul>
{{#each users}}
    <li>{{ name }}</li>
{{/each}}
</ul>
~~~

Models and ORM collections can be passed into view data through the implemented model attribute contract.

## Current Template Scope

The current view engine intentionally remains small. It does **not yet document layouts, includes, or reusable template components as implemented features**.

View path traversal outside the configured view root is rejected, and normal interpolation is escaped by default.
