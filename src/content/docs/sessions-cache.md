---
title: "Sessions & Cache"
description: "Use the implemented session and cache runtime while keeping optional Redis behavior explicit."
slug: "sessions-cache"
group: "The Basics"
groupOrder: 3
order: 7
status: preview
---

## Sessions

Gungnir sessions are server-side values identified by an opaque cookie.

Once session middleware is attached, controller code can access the request-owned session:

~~~gungnir
request.session().put("user_id", "42");

const userId = request.session().get("user_id");
~~~

Use session ID regeneration after authentication or privilege changes:

~~~gungnir
request.session().regenerate();
~~~

Use invalidation for a full session reset:

~~~gungnir
request.session().invalidate();
~~~

The default session cookie is HTTP-only, secure, uses `SameSite=Lax`, and is named `gungnir_session`.

For local plain HTTP development, the secure-cookie option has to be disabled explicitly.

## Session Storage

`MemoryStore` is implemented for tests, local development, and single-process ephemeral applications.

A real Redis-backed session store is available when Gungnir is built with Redis support. Redis is optional and requires the corresponding build dependency.

## Cache

The cache runtime separates the repository API from storage adapters.

The built-in memory cache supports expiration and read-through `remember()` behavior. An optional hiredis-backed Redis cache store is also implemented.

The current Redis adapter does not claim Redis Cluster routing, TLS transport, Sentinel discovery, connection pooling, or asynchronous hiredis execution.

Memcached and database-backed cache adapters are not currently supplied.
