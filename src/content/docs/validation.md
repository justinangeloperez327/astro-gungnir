---
title: "Validation"
description: "Validate request data using the rule set implemented by the current validator."
slug: "validation"
group: "The Basics"
groupOrder: 3
order: 6
status: preview
---

## Validating a Request

~~~gungnir
Response store(Request request)
{
    const data = request.validate({
        "name": "required|string|min:2|max:80",
        "email": "required|email",
        "age": "nullable|integer|min:18"
    });

    return json(data);
}
~~~

Successful validation returns the fields declared by the rule set.

## Implemented Rules

The current core rule set includes:

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
- `length`
- `min`
- `max`
- `in`
- `same`
- `confirmed`

## Check Without Throwing

The native validation layer exposes both result-oriented checking and exception-oriented validation.

`Request::check` returns validation results without throwing. `Request::validate` uses the exception flow.

## Validation Failure

A request validation exception maps to HTTP `422` by default.

## Not Yet Implemented

Database-backed validation rules such as:

~~~text
unique
exists
~~~

are **not currently implemented**.

A native `ValidatedRequest` foundation exists, but the `make:request` CLI generator is intentionally unavailable until source-language lowering for dedicated request classes is complete.
