---
layout: ../../layouts/DocsLayout.astro
title: Events, Queues & Mail
description: Coordinate application events, background work, mail, and notification delivery through explicit service boundaries.
---

Gungnir separates in-process events, queued work, and delivery transports so each concern has clear behavior.

## Events

Application events notify listeners synchronously on the current execution path.

Use events when other parts of the application need to react to something that has already happened without coupling the originating code directly to each listener.

Listeners execute in priority order and exceptions are not silently swallowed.

## Queues

Queues are for work that should be processed outside the immediate request path.

A queued job has:

- a stable job name
- a serialized payload
- an identifier
- retry metadata

Queue drivers define push, pop, acknowledge, release, and failure operations. Development or test drivers should not be mistaken for production queue infrastructure.

## Mail

Mail separates message construction from transport:

~~~cpp
mail::Message message;
message.to("user@example.com");
message.subject("Welcome");
message.text("Your account is ready.");
~~~

Configure a real transport for production delivery. SMTP or provider transports are responsible for TLS, credentials, timeouts, provider errors, and retry behavior.

## Notifications

Notifications declare which channels should receive a message. Channel implementations provide the actual provider behavior for email, SMS, push, chat, or another delivery mechanism.

## Deferred delivery

When mail or notifications should be delivered later, enqueue a stable job payload rather than making the transport itself pretend to be asynchronous.
