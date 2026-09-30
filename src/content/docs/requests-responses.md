---
title: "Requests & Responses"
description: "Read HTTP input through the Request API and return text, JSON, views, or custom status responses."
slug: "requests-responses"
group: "The Basics"
groupOrder: 3
order: 4
status: preview
---


## Request Input

The request object keeps query strings, form bodies, JSON, cookies, headers, and route parameters behind a compact application-facing API.

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

When using flat input helpers, body input takes precedence over query input.

## Selecting Input

Use selection helpers to make the controller's expected input explicit:

~~~gungnir
const all = request.all();
const selected = request.only(["name", "email"]);
const filtered = request.except(["password"]);
~~~

Use `request.json()` when nested JSON data needs to retain its typed structure.

## Headers and Cookies

~~~gungnir
const token = request.header("authorization");
const theme = request.cookie("theme");
~~~

## Route Parameters

~~~gungnir
const id = request.parameter("id");
~~~

Route parameters come from the path matched by the router.

## JSON Responses

The JSON response helper can serialize common application values, including models and ORM collections:

~~~gungnir
return json(user);
return json(users, 200);
~~~

## Text and Generic Responses

~~~gungnir
return text("Created", 201);
return response("Accepted", 202);
return response("", 204);
~~~

## View Responses

For server-rendered HTML:

~~~gungnir
return view("users/show", {
    "user": user
});
~~~

See [Views](/docs/views/) for template syntax and escaping behavior.

## Exceptions and Error Responses

Common framework exceptions have default HTTP mappings:

| Failure | Default status |
| --- | ---: |
| Validation | 422 |
| Authentication | 401 |
| Authorization | 403 |
| Model not found | 404 |
| Unexpected server error | 500 |

Requests that prefer JSON receive a JSON error representation from the framework exception layer.
