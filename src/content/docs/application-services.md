---
title: "Events, Queues, Mail & Scheduling"
description: "Understand the runtime services that exist today and which of them still lack a complete dedicated .gnr workflow."
slug: "application-services"
group: "Digging Deeper"
groupOrder: 4
order: 1
status: preview
---

These subsystems are implemented primarily as **native runtime APIs** today. Do not assume that every runtime type has a finished first-class `.gnr` declaration, generator, or application convention.

## Events

The event dispatcher provides synchronous in-process application events.

Listeners execute on the caller's path, in priority order, and exceptions are not swallowed.

The event subsystem does not pretend synchronous dispatch is background work. Work that must happen later belongs on a queue.

## Queues

The queue runtime defines job envelopes, drivers, workers, retries, acknowledgement, release, and failure handling.

`MemoryDriver` is for development and tests.

An optional Redis queue driver is implemented with visibility leases, delayed jobs, expired-lease recovery, stale-reservation protection, lease renewal, retries, and failed-job retention.

The current CLI still rejects:

~~~text
gungnir make:job
~~~

because queue-job source-language lowering is not complete.

## Mail

The mail runtime separates message construction from delivery.

`MemoryTransport` is available for tests.

A real optional libcurl-backed SMTP transport is implemented when SMTP support is enabled. It supports STARTTLS, implicit TLS, and explicitly unsecured local/test relay mode. Attachments and DKIM are not currently implemented.

## Notifications

A notification manager and channel boundary exist in the runtime. Concrete SMS, push, chat, or provider behavior must be supplied by explicit adapters.

## Scheduler

The scheduler supports interval tasks, five-field cron expressions, UTC/fixed-offset/recurring timezone behavior, long-running execution, cancellation, and explicit locking policies.

A Redis-backed distributed lock store is available when Redis support is enabled.

## Application-Language Boundary

Until dedicated lowering is complete, this documentation does not present `event`, `listener`, `notification`, `mail`, or queued-job declarations as a complete normal `.gnr` application workflow.
