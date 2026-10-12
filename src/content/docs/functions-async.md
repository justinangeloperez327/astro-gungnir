---
title: "Functions"
description: "Learn how to use functions in your Gungnir application."
slug: "functions-async"
group: "Language"
groupOrder: 2
order: 4
sourcePath: "docs/functions.md"
---

Declare a function with a result type, name and typed parameters:

```gnr
function int add(int left, int right = 2) {
    return left + right;
}

function int total() {
    return add(left: 3, right: 4);
}
```

## Parameters and results

Functions require a declared result type. Default arguments currently require
literal constants. Calls accept positional or named arguments, and supplied
arguments are evaluated in source order.

Return a value compatible with the declared result. Use `void` when a function
does not return a value. Controllers and other framework declarations can omit
a method's result type when its framework role determines the result.

## Asynchronous functions

```gnr
async function int answer() {
    return 42;
}

async function int result() {
    return await answer();
}
```

Await asynchronous calls inside an asynchronous function or method.
See [Async and Await](/docs/async/) and [Controllers](/docs/controllers/).
