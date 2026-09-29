---
layout: ../../layouts/DocsLayout.astro
title: Testing & Production
description: Keep application behavior testable and build native release artifacts for deployment.
---

Gungnir provides testing foundations around HTTP behavior and application services while retaining ordinary native build output.

## Application tests

Focus tests on observable application behavior:

- route responses and status codes
- validation failures
- authenticated and guest behavior
- authorization decisions
- model queries and persistence
- rendered views
- queued jobs, events, mail, and notifications

Use in-memory or test-specific adapters only when their semantics match what the test is intended to prove.

## Framework CLI

Build the application through the framework CLI:

~~~text
gungnir build
~~~

For production:

~~~text
gungnir build --release
~~~

The CLI manages generated native source and the CMake integration under `.gungnir/`.

## Production configuration

Set production configuration through environment variables rather than committing secrets into source control.

Typical production settings include:

~~~text
APP_ENV=production
APP_DEBUG=false
APP_HOST=0.0.0.0
APP_PORT=8000
~~~

Configure the production database, session, cache, queue, mail, and storage adapters appropriate to the deployment.

## Health and observability

Production applications should expose health behavior appropriate to the environment and configure structured logs, request identifiers, timing, and operational telemetry through the framework's observability facilities.

## Deployment model

A Gungnir application builds to a native application artifact. Deployment therefore follows the target operating system and runtime dependencies of the selected database, TLS, queue, mail, storage, and other native adapters.

Pin and validate the Gungnir version used for a deployment until the framework publishes a stable public API policy.
