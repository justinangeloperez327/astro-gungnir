---
layout: ../../layouts/DocsLayout.astro
title: Views
description: Render server-side HTML with safe interpolation and application data.
---

Return a view directly from a controller:

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

Views resolve from the application's configured `views` directory.

## Template expressions

Use double braces for escaped output:

~~~html
<h1>{{ title }}</h1>
<p>{{ user.name }}</p>
~~~

HTML escaping is enabled by default.

Use triple braces only for trusted raw HTML:

~~~html
{{{ trustedHtml }}}
~~~

## Loops

Iterate over arrays or ORM collections with `#each`:

~~~html
<ul>
{{#each users}}
    <li>{{ name }}</li>
{{/each}}
</ul>
~~~

Models are exposed through their generated model attributes, and collections are converted into iterable view values.

## View data

Pass values using object-style syntax:

~~~gungnir
return view("users/show", {
    "user": user,
    "canEdit": canEdit
});
~~~

## Safety

Template paths must remain under the configured view root. Parent traversal, absolute paths, and unsafe symlink resolution are rejected by the view engine.
