---
title: "Expressions"
description: "Learn how to use expressions in your Gungnir application."
slug: "expressions"
group: "Language"
groupOrder: 2
order: 6
sourcePath: "docs/expressions.md"
---

Expressions produce values for bindings, arguments and return statements.

## Values and operators

Use string, number, boolean and null literals; lists and objects; member access;
indexing; calls; arithmetic; comparisons; and boolean operators.
Parentheses control evaluation order.

```gnr
function string label(bool enabled) {
    return enabled ? "Enabled" : "Disabled";
}

function string fallback(string? value) {
    return value ?? "Default";
}
```

## Callbacks

Arrow callbacks are used by collections, migrations and other services:

```gnr
const active = users.filter((user) => user.active);
const names = active.map((user) => user.name);
```

Collection and migration operations supply the callback's parameter types.
Referenced outer values are captured by value.

## Optional access

Use a null check to handle optional values before accessing their contents.
Safe field access and null coalescing are available; safe optional method calls
are not supported. Bind an awaited result separately before using it with `??`.

String interpolation is not supported; concatenate strings with `+`.
See [Types](/docs/language-types/), [Statements](/docs/statements/) and [Collections](/docs/collections/).
