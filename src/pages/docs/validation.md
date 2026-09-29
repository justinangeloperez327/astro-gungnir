---
layout: ../../layouts/DocsLayout.astro
title: Validation
description: Validate incoming request data close to the controller action using concise rules.
---

Validate request input directly:

~~~gungnir
Response store(Request request)
{
    const data = request.validate({
        "name": "required|string|min:2|max:80",
        "email": "required|email",
        "age": "nullable|integer|min:18"
    });

    const user = User::create(data);

    return json(user, 201);
}
~~~

Successful validation returns the validated fields declared in the rule set.

## Available rules

The core validator includes rules such as:

- `required`
- `present`
- `sometimes`
- `nullable`
- `string`
- `integer`
- `numeric`
- `boolean`
- `email`
- `accepted`
- `min`
- `max`
- `length`
- `in`
- `same`
- `confirmed`

## Validation failures

Validation failures raise the framework validation exception. The HTTP exception layer maps them to a `422` response by default.

## Check without throwing

The validation subsystem also exposes a result-oriented check flow for code that needs to inspect errors without using the exception path.

## Dedicated validation requests

For larger applications, use validation-oriented request classes to centralize rule sets instead of duplicating them across controller actions.
