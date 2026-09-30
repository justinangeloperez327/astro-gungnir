---
title: "Validation"
description: "Validate request data with declarative rules that can be normalized by the compiler/runtime."
slug: "validation"
group: "Framework"
groupOrder: 3
order: 7
status: preview
---

## Request Validation

~~~gnr
const data = request.validate({
    'name': 'required|string',
    'email': 'required|email'
});
~~~

Validation belongs at the request/application boundary.

## Compiler Contract

Validation rules are intended to be normalized into structured compiler/runtime metadata rather than repeatedly reparsed during later lowering phases.

This supports a compiler that understands validation structurally before native code is emitted.

## Pre-1.0 Note

The canonical validation syntax is part of the target Gungnir contract. Rule availability and deeper database-aware validation behavior may continue to evolve before 1.0.
