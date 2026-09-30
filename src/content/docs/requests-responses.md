---
title: "Requests & Responses"
description: "Read implemented request inputs and return the response types currently supported by Gungnir."
slug: "requests-responses"
group: "The Basics"
groupOrder: 3
order: 4
status: preview
---

## Request Input

The request API exposes route parameters, query input, URL-encoded form input, JSON bodies, cookies, normalized headers, and common HTTP metadata.

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

Body input takes precedence over query input in the flat input helpers.

Use `request.json()` when nested JSON structure must remain typed.

## Headers and Cookies

~~~gungnir
const authorization = request.header("authorization");
const theme = request.cookie("theme");
~~~

The native request API also exposes content type, host, user agent, bearer authorization metadata, and content negotiation.

## Route Parameters

~~~gungnir
const id = request.parameter("id");
~~~

## Responses

Common response forms include:

~~~gungnir
return text("Created", 201);
return json(user);
return view("users/show", { "user": user });
return response("", 204);
~~~

The native response API also supports HTML, redirects, downloads, and response cookies.

## File Upload Boundary

Multipart uploaded-file parsing is not documented as a completed high-level Request workflow yet. Upload parsing and filesystem persistence remain separate concerns.

## Error Responses

Framework exceptions are handled centrally. Common defaults include validation `422`, authentication `401`, authorization `403`, missing model `404`, and unexpected server error `500`.
