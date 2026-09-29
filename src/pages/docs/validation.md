---
layout: ../../layouts/DocsLayout.astro
title: Validation
description: Validate incoming request data with concise rule declarations before passing it to application or model code.
---

## Validating a Request

Validate request input directly in the controller:

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

Successful validation returns the fields declared by the validation rules.

## Available Rules

The core validation rules include:

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

## Validation Failures

`request.validate()` uses the exception-oriented flow. A failed validation raises the framework validation exception and is mapped to HTTP `422` by default.

## Checking Without Throwing

The validation subsystem also provides a result-oriented check flow for code that wants to inspect validation errors without using exceptions.

Use the exception flow for normal HTTP request validation and the result flow when the caller needs direct control over error handling.

## Dedicated Validation Requests

As validation grows, move repeated rule sets into validation-oriented request classes. This keeps controllers focused on application actions instead of duplicating long rule declarations.

## Database-Aware Validation

Database-backed rules should use the shared database abstraction rather than issuing ad-hoc SQL from the HTTP layer. Treat backend-dependent validation as database integration, not as a special case hidden inside the basic validator.
