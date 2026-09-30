---
title: "Testing & Production"
description: "Test the real framework path and deploy native Gungnir applications with explicit runtime lifecycle behavior."
slug: "testing-production"
group: "Testing & Deployment"
groupOrder: 9
order: 1
status: preview
---

## Testing Strategy

Gungnir testing is intended to exercise the real framework path.

The project strategy includes:

- HTTP/router tests;
- dependency overrides;
- database isolation;
- queue, mail, and storage test adapters;
- lexer/parser tests;
- Syntax AST tests;
- semantic tests;
- Validated AST tests;
- generated C++ compile tests;
- backend integration tests.

## Native Build

Gungnir requires C++23 and CMake 3.25 or newer.

Typical native framework build:

~~~sh
cmake -S . -B build
cmake --build build
~~~

Application projects use the Gungnir CLI for normal builds and runs.

## Production Lifecycle

The runtime provides foundations for health/readiness, cancellation, graceful shutdown, and application lifecycle.

Deployment orchestration, service management, secrets management, and infrastructure policy remain deployment responsibilities.
