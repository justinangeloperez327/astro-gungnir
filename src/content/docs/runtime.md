---
title: "Runtime & Infrastructure"
description: "Overview of Gungnir's HTTP, async, cancellation, queues, scheduling, storage, logging, observability, lifecycle, and production foundations."
slug: "runtime"
group: "Runtime & Infrastructure"
groupOrder: 8
order: 2
status: preview
---

Gungnir includes runtime foundations for:

- HTTP serving;
- async execution;
- request cancellation;
- dependency injection;
- sessions;
- cache;
- queues;
- scheduling;
- storage;
- logging;
- tracing and metrics;
- application lifecycle;
- graceful shutdown;
- health and readiness.

## Runtime Boundary

These systems support application code but should not leak backend or transport details into normal `.gnr` syntax.

## Queues

Background work belongs to the queue runtime rather than pretending synchronous work is asynchronous.

## Scheduling

Scheduled application work belongs to the scheduler runtime.

## Storage

Storage is represented through framework abstractions rather than filesystem/cloud-specific syntax in normal application code.

## Observability

Logging, tracing, and metrics are runtime infrastructure and should remain usable without coupling application declarations to a specific telemetry backend.

## Production Lifecycle

The runtime owns graceful shutdown, cancellation, health, readiness, and application lifecycle integration.
