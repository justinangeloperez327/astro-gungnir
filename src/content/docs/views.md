---
title: "Views"
description: "Render server-side HTML templates with escaped output and explicit raw rendering."
slug: "views"
group: "Framework"
groupOrder: 3
order: 8
status: preview
---

Gungnir views are server-rendered HTML templates under the configured view root.

## Interpolation

~~~html
<h1>{{ title }}</h1>
~~~

Double braces escape output by default:

~~~html
{{ value }}
~~~

Raw output is explicit:

~~~html
{{{ trustedHtml }}}
~~~

Only trusted HTML should use raw output.

## Loops

~~~html
{{#each users}}
    <p>{{ name }}</p>
{{/each}}
~~~

## Returning a View

~~~gnr
return view('users/index', {
    'users': User::orderBy('name').get()
});
~~~
