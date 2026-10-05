---
title: "Dependency Injection"
description: "Dependency Injection: current Gungnir APIs, usage, configuration, and documented limits."
slug: "container"
group: "Architecture Concepts"
groupOrder: 3
order: 11
status: development
sourcePath: "docs/dependency-injection.md"
---

## Overview
Native Application provides `bind`, `singleton`, `scoped`, `instance` and `resolve`. The Container owns bindings and request service scopes. Controllers can use `inject Type name;` to request generated constructor/member plumbing.

Register dependencies before resolving the controller. Request-scoped dependencies should be resolved through request services.

## Scope
Register dependency factories and adapters explicitly. Generated controllers retain the owners of injected dependencies through awaited calls. Resolve request-scoped dependencies through the request service container and release them with their request scope. Application services such as `Cache` and `Storage` are configured through `ServicesProvider`.



- [include/gungnir/core/application.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/core/application.hpp)
- [include/gungnir/core/container.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/core/container.hpp)
- [Canonical validation](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/src/language/validated.cpp)
- [Structural C++ IR](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/src/language/cpp_ir.cpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/dependency-injection.md).
