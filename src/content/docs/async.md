---
title: "Async and Await"
description: "Async and Await: current Gungnir APIs, usage, configuration, and documented limits."
slug: "async"
group: "Language"
groupOrder: 2
order: 13
status: development
sourcePath: "docs/async.md"
---

## Overview
The async lowerer handles supported explicitly typed methods and rewrites async/await into native coroutine forms. Native runtime uses Task<T>.

## Scope
Async is not evidence of non-blocking I/O. The target implicit framework return contracts, typed arrow async closures, structured concurrency and fully validated awaitability remain compiler/runtime work.



- [src/language/async_lowering.cpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/src/language/async_lowering.cpp)
- [include/gungnir/core/task.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/core/task.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/async.md).
