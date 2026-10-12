---
title: "Async and Await"
description: "Learn how to use async and await in your Gungnir application."
slug: "async"
group: "Language"
groupOrder: 2
order: 5
sourcePath: "docs/async.md"
---

Gungnir supports asynchronous application methods with `async` and
`await`. Async methods compile to C++23 coroutine-based tasks.

## Write an asynchronous handler

```gnr
controller ReportController {
    async index() {
        const report = await reports.generate();
        return json(report);
    }
}
```

`await` suspends the current coroutine while an awaitable operation runs.
The awaited operation must have a supported task/result type. Route handlers
still return ordinary framework responses.

## What to consider

Async does not automatically make blocking database drivers or arbitrary
native calls non-blocking. Use the async services supported by your selected
adapters, propagate cancellation, and avoid holding references to
request-lifetime objects beyond their scope.

See [Language](/docs/language/), [Functions](/docs/functions-async/) and [Controllers](/docs/controllers/).
