---
title: "Request Lifecycle"
description: "Understand how a Gungnir application boots and how an HTTP request moves through the framework."
slug: "request-lifecycle"
group: "Architecture Concepts"
groupOrder: 2
order: 1
status: preview
---


## Application Bootstrap

A normal application begins with:

~~~gungnir
app = Application::create();
~~~

Application creation establishes the base path, loads environment and configuration values, prepares framework services, and makes the application container available before requests are served.

The high-level lifecycle is:

~~~text
create application
→ load environment and configuration
→ register services and providers
→ boot framework services
→ mark application ready
→ run HTTP server
→ stop and release resources
~~~

## Incoming Requests

When an HTTP request arrives, Gungnir resolves it through the application request pipeline:

~~~text
HTTP request
→ global middleware
→ route matching
→ route middleware
→ controller resolution
→ controller action
→ response
→ exception / response handling
~~~

Route parameters and request-owned state are populated for the current request before the controller action runs.

## Middleware

Global middleware runs before middleware attached to an individual route. A middleware may:

- inspect or modify the request;
- stop the request and return a response immediately;
- continue to the next middleware or controller;
- perform response-side work after the downstream handler completes.

## Controller Resolution

Controllers are resolved through the service container. This allows controller dependencies declared with `inject` to be resolved without manually constructing the controller inside the route definition.

## Exceptions

Exceptions raised by middleware or controllers pass through the framework exception handler. Common application failures map to HTTP responses such as:

| Failure | Default status |
| --- | ---: |
| Validation | 422 |
| Authentication | 401 |
| Authorization | 403 |
| Model not found | 404 |
| Unexpected server error | 500 |

## Shutdown

When the application is asked to stop, the runtime stops accepting new work and coordinates shutdown with active requests and registered services. Production deployments should configure an appropriate graceful-shutdown deadline.
