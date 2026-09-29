---
layout: ../../layouts/DocsLayout.astro
title: Views
description: Render server-side HTML templates with escaped interpolation, loops, nested values, models, and collections.
---

## Creating a View Response

Return a view from a controller with the `view` helper:

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

View names resolve underneath the application's configured `views` directory.

## Displaying Data

Use double braces for escaped output:

~~~html
<h1>{{ title }}</h1>
<p>{{ user.name }}</p>
~~~

HTML escaping is enabled by default.

## Raw HTML

Triple braces render raw output:

~~~html
{{{ trustedHtml }}}
~~~

Only use raw output for content you trust. User-controlled content should remain escaped.

## Loops

Use `#each` to iterate arrays or collections:

~~~html
<ul>
{{#each users}}
    <li>{{ name }}</li>
{{/each}}
</ul>
~~~

Inside the loop, each item becomes the current context. Nested object paths are also supported.

## Models and Collections

Models can be passed directly to a view using their exposed attributes, and ORM collections become iterable view values. Controllers do not need a separate conversion layer just to display normal model data.

~~~gungnir
return view("users/show", {
    "user": user,
    "posts": posts
});
~~~

## Template Safety

View paths must stay under the configured view root. Absolute paths, parent traversal, and unsafe symlink resolution are rejected.

Template rendering is tied to the active application/request context, including when request execution suspends and resumes through Gungnir's async runtime.
