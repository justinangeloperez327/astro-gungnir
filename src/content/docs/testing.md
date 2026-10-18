---
title: "Testing Gungnir Applications"
description: "Check application source, test HTTP behavior and verify persistence and services."
slug: "testing"
group: "Testing & Deployment"
groupOrder: 7
order: 2
sourcePath: "docs/testing.md"
---

Check source, exercise HTTP endpoints and verify the services your application
uses before deployment.

## Check and build

```sh
gungnirc app/controllers/HomeController.gnr --check
gungnir build
```

Source checks catch language and framework errors. A full build verifies that
your application compiles with the selected SDK and toolchain.

## Exercise HTTP endpoints

Start the application:

```sh
gungnir run
```

In another terminal, inspect an endpoint's response:

```sh
curl -i http://127.0.0.1:8000/
```

Verify route parameters, middleware, status codes, bodies, validation failures
and authorization decisions for your application's endpoints.
Native application tests can use `testing::Http` to dispatch through the router
without opening a network listener. It provides `get`, `post`, `send` and
response assertions.

## Isolate service tests

Use memory-backed mail transports, queues, stores and log sinks where external
services are unnecessary. Use a dedicated test database and apply migrations
before querying it. Configure the real adapter when testing persistence,
transactions or communication between independent server and worker processes.

Run your application's project-specific test commands. Verify session
persistence, database rollback, background jobs, health probes and shutdown with
the same adapters you plan to deploy.

See [Validation](/docs/validation/), [Authentication](/docs/auth/),
[Database](/docs/database/), [Queues](/docs/queues/) and [Production](/docs/production/).
