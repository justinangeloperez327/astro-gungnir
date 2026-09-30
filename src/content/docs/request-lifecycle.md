---
title: "Application Lifecycle"
description: "Understand application boot, service registration, readiness, request handling, and shutdown."
slug: "request-lifecycle"
group: "Architecture Concepts"
groupOrder: 8
order: 1
status: preview
---

Gungnir applications have an explicit lifecycle from creation through shutdown.

## Lifecycle

At a high level:

~~~text
Application creation
→ environment / configuration
→ provider and service registration
→ framework boot
→ ready
→ HTTP/runtime execution
→ stopping
→ stopped
~~~

## Requests

The HTTP runtime receives a request, applies middleware, resolves routing/controller behavior, and serializes the resulting response.

## Async and Cancellation

Asynchronous application work is backed by the native runtime. Request cancellation and graceful shutdown belong to runtime infrastructure, not to application-level socket management.

## Production

Health/readiness and graceful shutdown are part of the runtime contract so applications can integrate with deployment infrastructure without reimplementing process lifecycle behavior.
