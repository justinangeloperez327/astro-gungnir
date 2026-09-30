---
title: "Sessions & Cache"
description: "Use the session and cache runtime foundations that support Gungnir applications."
slug: "sessions-cache"
group: "Runtime & Infrastructure"
groupOrder: 8
order: 1
status: preview
---

Gungnir includes runtime foundations for both sessions and cache.

## Sessions

Sessions provide request/application state across browser requests and support authentication workflows.

Session storage is a runtime concern rather than part of the Gungnir language syntax itself.

## Cache

The cache layer provides a storage abstraction for application values and reusable cached work.

Concrete cache backends and operational guarantees depend on the selected runtime adapters.

## Application Contract

Controllers and services should depend on framework/session/cache abstractions rather than backend-specific client plumbing.
