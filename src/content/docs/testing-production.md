---
title: "Testing & Production"
description: "Test application behavior through the real routing stack, build release artifacts, and configure production lifecycle concerns explicitly."
slug: "testing-production"
group: "Testing & Deployment"
groupOrder: 8
order: 1
status: preview
---


## HTTP Testing

Gungnir provides HTTP testing helpers over the real router and request/response types. Tests can dispatch requests without opening a network socket, allowing route and middleware behavior to be exercised directly.

Use tests to cover application behavior such as:

- response status codes and bodies;
- route and middleware behavior;
- validation failures;
- authenticated and guest requests;
- authorization decisions;
- model queries and persistence;
- rendered views;
- queued jobs, events, mail, and notifications.

## Response Assertions

Testing helpers can assert status codes, body fragments, and headers. Failed assertions raise focused errors suitable for the project's native test runner.

## Test Isolation

The testing layer does not silently reset external state. Database transactions, cache stores, sessions, queues, and other resources should be isolated explicitly by the test environment.

## Release Builds

Build a production-oriented application artifact with:

~~~text
gungnir build --release
~~~

The resulting application is a native artifact and should be deployed with the runtime libraries and adapters required by the application's selected database, TLS, queue, mail, storage, and other integrations.

## Production Environment

Set production behavior through the environment:

~~~text
APP_ENV=production
APP_DEBUG=false
APP_HOST=0.0.0.0
APP_PORT=8000
~~~

Do not commit production secrets to source control or expose them through error pages and logs.

## Health and Readiness

Gungnir distinguishes process liveness from application readiness. Register readiness checks for dependencies that must be available before an instance receives traffic.

Keep health endpoints inexpensive enough for the frequency at which infrastructure probes them.

## Graceful Shutdown

The HTTP runtime supports cooperative draining. On shutdown, the listener stops accepting new work, active requests are given time to finish, and remaining request cancellation tokens can be signaled when the configured deadline expires.

Queue workers and the scheduler expose cooperative shutdown behavior as well. Production hosting can coordinate them through the framework's supervision/runtime-host facilities.

## Reverse Proxies

Forwarded headers must not be trusted simply because they are present. Applications deployed behind a reverse proxy should configure a clear trust policy for forwarded client, host, and protocol information.

## HTTPS and TLS

Gungnir can terminate HTTPS directly when built with optional TLS support. TLS integration uses OpenSSL and remains opt-in so the default core build does not require OpenSSL.

Whether TLS terminates in Gungnir or at a reverse proxy is a deployment decision. Validate connection limits, timeouts, shutdown behavior, and throughput under representative production load.
