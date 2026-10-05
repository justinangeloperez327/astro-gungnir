---
title: "Runtime & Infrastructure"
description: "HTTP serving, cancellation, service lifetimes, health, and observability."
slug: "runtime"
group: "Runtime & Infrastructure"
groupOrder: 8
order: 2
status: development
---

## HTTP and async execution

HTTP/1.1 is the core protocol. TLS and HTTP/2 are optional builds with native dependencies; HTTP/2 requires TLS. Request lifetimes carry cancellation into cooperative async work, streams, and WebSocket handlers.

Read [HTTP Runtime](/docs/http-runtime/) and [Async Runtime](/docs/async-runtime/).

## Application lifecycle

Applications move through created, registering, booting, ready, running, stopping, and stopped stages. Applications own routing, container, database, and view contexts. Background workers and schedules require explicit startup.

Read [Application Lifecycle](/docs/request-lifecycle/), [Queues](/docs/queues/), and [Scheduler](/docs/scheduler/).

## Services and storage

Register dependency factories and adapters before resolving generated artifacts. Request-scoped dependencies belong to request service scopes. Configure local or S3-compatible disks for storage.

Read [Dependency Injection](/docs/container/), [Cache](/docs/cache/), and [Storage](/docs/storage/).

## Observability

Logging, tracing, and metrics have native APIs and memory sinks. The optional OTLP HTTP exporter requires explicit configuration; a build flag does not install an exporter or establish complete distributed tracing.

Read [Logging and Observability](/docs/logging-observability/).

## Production behavior

Health checks, overload admission, supervision, and graceful HTTP drain support production operation. Applications configure their probes, limits, dependencies, and process supervision. Cancellation remains cooperative.

Read [Production](/docs/production/) and [Production Resilience](/docs/production-resilience/).
