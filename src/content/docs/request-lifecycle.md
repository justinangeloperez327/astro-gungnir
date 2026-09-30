---
title: "Request Lifecycle"
description: "See how application boot, middleware, routing, controller dispatch, and exception handling fit together."
slug: "request-lifecycle"
group: "Architecture Concepts"
groupOrder: 2
order: 1
status: preview
---

## Application Lifecycle

A Gungnir application moves through explicit lifecycle phases: creation, registration, boot, ready, running, stopping, and stopped.

A normal bootstrap begins with:

~~~gungnir
app = Application::create();
~~~

Environment and configuration are loaded before the application begins serving requests. Providers and framework services participate in registration and boot before the application reaches the ready state.

## HTTP Request Flow

At a high level:

~~~text
incoming request
→ HTTP request parsing and limits
→ global middleware
→ route match
→ route middleware
→ controller resolution
→ controller action
→ response or exception
→ HTTP serialization
~~~

Middleware may stop the request before controller dispatch by returning a response.

## Controller Resolution

Controller instances are resolved through the application container. Declared controller dependencies can therefore use container construction instead of being manually created inside route files.

## Exceptions

The framework exception layer maps common application failures such as validation, authentication, authorization, missing models, and HTTP exceptions to HTTP responses.

Unexpected exceptions become server errors without exposing internal exception messages by default.

## Shutdown

Production shutdown is cooperative. The HTTP runtime stops accepting new work and gives already-dispatched requests time to finish according to the configured shutdown deadline.
