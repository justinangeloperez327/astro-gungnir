---
title: "Language Overview"
description: "Learn the application-oriented syntax and type model used by .gnr source files."
slug: "language"
group: "Language"
groupOrder: 2
order: 1
status: preview
---

Gungnir's `.gnr` language is deliberately smaller than C++ and focused on web/application development.

Normal application code should not need native pointer, reference, allocator, template, or coroutine syntax.

## Scalar Types

~~~gnr
const string name = 'Gungnir';
const int limit = 25;
const bool active = true;
~~~

Both single-quoted and double-quoted literals are strings.

## Optional Types

Optional values use `T?`:

~~~gnr
const User? user = User::find(id);
const string? nickname = null;
~~~

## Collections

Typed collections use application-oriented generic types:

~~~gnr
const List<string> roles = ['admin', 'editor'];
~~~

A query object and a materialized collection are different concepts:

~~~text
Query<User>
    ↓ get()
Collection<User>
~~~

## Control Flow

Gungnir provides ordinary application control flow including conditionals, loops, return values, expressions, calls, lists, maps/objects, and async/await.

## Native Boundary

Generated C++ may use RAII, templates, optional/native containers, namespaces, coroutines, and runtime task types.

Those are implementation details and do not define the normal `.gnr` syntax.
