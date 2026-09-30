---
title: "Request & Response"
description: "Use Gungnir's request input helpers and application-facing response helpers."
slug: "requests-responses"
group: "Framework"
groupOrder: 4
order: 6
status: preview
---

## Request Input

Request objects expose application-oriented accessors:

~~~gnr
const page = request.integer('page');
const token = request.bearerToken();
~~~

Request handling is intended to keep transport details out of application code.

## Responses

Common response helpers include:

~~~gnr
return json(user);

return view('users/show', {
    'user': user
});

return response(null, 204);
~~~

Controllers return the logical response they want the framework to send.

## Transport Boundary

Native HTTP parsing, serialization, cookies, body limits, connection management, and cancellation belong to the runtime.

Application code should work with Request and Response abstractions rather than socket or protocol plumbing.
