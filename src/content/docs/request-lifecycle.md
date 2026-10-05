---
title: "Application Lifecycle"
description: "Application Lifecycle: current Gungnir APIs, usage, configuration, and documented limits."
slug: "request-lifecycle"
group: "Architecture Concepts"
groupOrder: 3
order: 10
status: development
sourcePath: "docs/application-lifecycle.md"
---

## Overview
The implemented stages are `created`, `registering`, `booting`, `ready`, `running`, `stopping` and `stopped`. There is no `configuring` enum stage.

Application exposes `create`, `provider`, `boot`, `shutdown`, `run`, `listen`, `stop`, and lifecycle inspection. Hooks are registered through `on_boot`, `on_ready` and `on_shutdown`. Providers expose `register_services`, `boot`, `ready` and `shutdown` hooks. Startup reaches `ready` only after every ready hook succeeds. A startup failure shuts down registered providers in reverse order, including a partially registered provider, then rethrows the original error. Shutdown attempts every cleanup hook and exposes collected exceptions through `shutdown_errors()`. A stopped or failed application is not reusable; construct a new instance.

Applications own their routing, container, database and view contexts. Use `app.activate()` around native work; request dispatch and framework task/executor paths carry their owning context. HTTP resources are initialized when listening starts, so constructing an application for a CLI task does not start an HTTP runtime.

## Scope
Dependency-graph ordering, automatic ownership of every background service and full deadline-bounded draining are design requirements rather than universal guarantees. Configure readiness checks and runtime supervision explicitly.



- [include/gungnir/core/application.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/core/application.hpp)
- [include/gungnir/core/lifecycle.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/core/lifecycle.hpp)
- [include/gungnir/core/provider.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/core/provider.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/application-lifecycle.md).
