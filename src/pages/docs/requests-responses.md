---
layout: ../../layouts/DocsLayout.astro
title: Requests & Responses
description: Read HTTP input through one request API and return clear framework responses.
---

The `Request` object exposes route parameters, query input, form input, JSON input, cookies, and headers without forcing controllers to work with HTTP parser details.

## Reading input

~~~gungnir
Response store(Request request)
{
    const name = request.input("name");

    if (!request.has("email")) {
        return text("Email is required", 422);
    }

    const values = request.only(["name", "email"]);

    return json(values);
}
~~~

Body input takes precedence over query input when using the flat input helpers.

## Selecting fields

Use the request helpers to keep controller input explicit:

~~~gungnir
const data = request.all();
const selected = request.only(["name", "email"]);
const filtered = request.except(["password"]);
~~~

Use `request.json()` when nested JSON values need to retain their typed structure.

## Headers and cookies

~~~gungnir
const token = request.header("authorization");
const theme = request.cookie("theme");
~~~

## Route parameters

~~~gungnir
const id = request.parameter("id");
~~~

## JSON responses

Models, collections, maps, ranges, and scalar values can be serialized through the JSON response helper:

~~~gungnir
return json(user);
return json(users, 200);
~~~

## Status codes

Pass an HTTP status code when the default is not appropriate:

~~~gungnir
return text("Created", 201);
return response("", 204);
~~~

Framework exceptions provide centralized handling for common HTTP failure cases such as validation, authentication, authorization, missing models, and unexpected errors.
