---
layout: ../../layouts/DocsLayout.astro
title: Events, Queues & Mail
description: Coordinate application events, background work, scheduled tasks, mail, and notification delivery through explicit service boundaries.
---

## Events

Events allow one part of the application to announce that something has happened without directly calling every interested component.

Gungnir's application event dispatcher is synchronous and in-process. Listeners run on the caller's execution path, and listener exceptions are not silently swallowed.

Use events for immediate application reactions. Use a queue when work should happen later or outside the request path.

## Queues and Jobs

Queued work is represented by an explicit envelope containing a stable job name, serialized payload, identifier, and retry metadata.

A queue driver defines the lifecycle operations needed to push, reserve/pop, acknowledge, release, and fail jobs.

The important application rule is to serialize stable job data rather than trying to persist arbitrary C++ object memory.

## Mail

Mail separates message construction from message delivery.

~~~cpp
mail::Message message;
message.to("user@example.com");
message.subject("Welcome");
message.text("Your account is ready.");
~~~

A configured transport owns SMTP or provider-specific behavior such as TLS, credentials, timeouts, provider errors, and retry policy.

Development/test transports should not be treated as production delivery infrastructure.

## Notifications

Notifications declare a stable notification and the channels through which it should be delivered. Concrete channels implement the provider behavior for mail, SMS, push, chat, or another delivery mechanism.

Provider credentials should remain at the transport/channel boundary rather than inside notification payloads.

## Deferred Delivery

When mail or a notification should be delivered later, place a stable job payload on a queue instead of making a synchronous transport pretend to be asynchronous.

## Scheduling

The scheduler is intended for recurring application work. Keep scheduled tasks explicit and operationally observable, and coordinate scheduler shutdown with the rest of the application runtime in production.
