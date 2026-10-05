---
title: "Sessions & Cache"
description: "Request session state and JSON-compatible caching with explicitly configured stores."
slug: "sessions-cache"
group: "Runtime & Infrastructure"
groupOrder: 8
order: 1
status: development
---

## Sessions

Session middleware attaches session state to requests. Gungnir provides memory and Redis stores, flash state, and session lifecycle APIs. Session authentication requires a configured guard and identity restoration.

Read [Sessions](/docs/sessions/) and [Authentication](/docs/auth/).

## Cache

Inject `Cache` to read and write JSON-compatible values using the configured store. `get` returns `Json?`; expiration values use whole seconds. A `remember` factory is synchronous and concurrent misses may invoke it more than once.

Read [Cache](/docs/cache/) for examples, expiration behavior, and backend configuration.

## Store selection

Memory stores serve development and tests. Shared deployments require appropriate shared or persistent adapters configured through the native bootstrap. Session state and cached values have different lifetimes and consistency requirements.
