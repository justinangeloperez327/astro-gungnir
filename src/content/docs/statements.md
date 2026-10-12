---
title: "Statements"
description: "Learn how to use statements in your Gungnir application."
slug: "statements"
group: "Language"
groupOrder: 2
order: 7
sourcePath: "docs/statements.md"
---

Statements control the flow of a function or framework action.

## Bindings

Use `const` for a value that cannot be reassigned and `let` for a mutable binding:

```gnr
function int increment(int initial) {
    const step = 1;
    let result = initial;
    result = result + step;
    return result;
}
```

## Conditions

Conditions must be boolean values:

```gnr
function string status(bool enabled) {
    if (enabled) {
        return "Active";
    } else {
        return "Inactive";
    }
}
```

## Loops

Use `for` and `while` to repeat work. `break` exits a loop; `continue` skips to
its next iteration.

```gnr
function int sum(int count) {
    let total = 0;
    for (let i = 0; i < count; i = i + 1) {
        total = total + i;
    }
    return total;
}
```

## Returning and failing

Use `return` to complete a function. `throw` reports a failure to the caller.
Return values must match the function's result type. See [Functions](/docs/functions-async/)
and [Errors](/docs/errors/).
