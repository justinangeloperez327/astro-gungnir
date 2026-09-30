---
title: "Testing & Production"
description: "Test through the real router, build release artifacts, and use the production lifecycle features currently implemented by Gungnir."
slug: "testing-production"
group: "Testing & Deployment"
groupOrder: 8
order: 1
status: preview
---

## HTTP Testing

The native testing layer provides an HTTP test client over the real router and request/response types.

It dispatches requests without opening a network socket, so route and middleware behavior can be exercised directly.

Current convenience methods include GET, POST, and generic request sending.

Response helpers can assert status codes, body fragments, and headers.

## Test Isolation

The testing layer does not silently reset databases, cache, sessions, queues, or other external state. Tests must isolate those resources explicitly.

## Release Builds

~~~text
gungnir build --release
~~~

The result is a native application build. Deploy the runtime libraries and optional adapters required by your application.

## Health and Readiness

The production runtime provides liveness plus explicit application readiness callbacks.

Readiness checks should represent dependencies that must be usable before the instance receives traffic.

## Graceful Shutdown

The HTTP runtime supports cooperative draining. New work stops first, already-dispatched requests are given time to finish, and remaining request cancellation tokens are signalled after the configured shutdown deadline.

Queue workers and the scheduler also expose cooperative stop/cancellation behavior.

The native production layer includes supervisor/runtime-host primitives for coordinating multiple runtimes under one shutdown source.

## Optional Runtime Capabilities

Some production capabilities depend on build options and native dependencies. Applications should validate the exact framework commit and build flags they deploy rather than assuming every optional protocol or adapter is in the minimal core build.

## Deployment Boundary

Service managers, container orchestration, hard process termination policy, log shipping, and infrastructure-level zero-downtime deployment remain deployment responsibilities. Gungnir provides lifecycle integration points rather than replacing those systems.
