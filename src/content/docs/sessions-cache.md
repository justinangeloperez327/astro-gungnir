---
title: "Sessions & Cache"
description: "Store request-associated session state and cache application values behind explicit storage adapters."
slug: "sessions-cache"
group: "The Basics"
groupOrder: 3
order: 7
status: preview
---


## Sessions

Gungnir sessions are server-side values identified by an opaque session cookie. Attach session middleware before application code that needs session state.

Application code reads and writes through the request:

~~~gungnir
request.session().put("user_id", "42");

const userId = request.session().get("user_id");
~~~

## Session Regeneration

Regenerate the session identifier after authentication or privilege changes:

~~~gungnir
request.session().regenerate();
~~~

Use invalidation for logout or a full session reset:

~~~gungnir
request.session().invalidate();
~~~

The default session cookie is HTTP-only, secure, and uses `SameSite=Lax`. Local plain-HTTP development may disable the secure flag; production deployments should keep secure cookies enabled.

## Session Storage

The in-memory session store is useful for tests, local development, and ephemeral single-process applications.

When Redis support is enabled, a Redis-backed session store can be used for multi-process deployments and server-side expiry.

## Cache

The cache repository exposes common cache operations independently of the selected storage adapter.

A typical read-through operation uses `remember`:

~~~cpp
auto value = cache.remember(
    "users.count",
    std::chrono::seconds{60},
    [] { return load_user_count(); }
);
~~~

Cache entries may be stored with or without expiration.

## Cache Storage

The built-in memory adapter is appropriate for tests and local or single-process workloads. Optional Redis support provides a concrete distributed cache backend.

Serialization of structured application values should remain explicit rather than hiding arbitrary object memory behind the cache interface.
