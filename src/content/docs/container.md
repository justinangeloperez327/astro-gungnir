---
title: "Service Container"
description: "Use Gungnir's implemented transient, singleton, instance, and scoped dependency lifetimes."
slug: "container"
group: "Architecture Concepts"
groupOrder: 2
order: 2
status: preview
---

The Gungnir container is the runtime dependency-resolution boundary.

## Lifetimes

The container supports:

- **transient** — a new value for each resolution;
- **singleton** — one value reused by the container;
- **instance** — an existing value registered directly;
- **scoped** — one value reused inside an explicit request or operation scope.

Resolving a scoped service outside an active scope is rejected.

## Controller Injection

Gungnir controller source can declare a dependency with `inject`:

~~~gungnir
controller AuditController
{
    inject Logger logger;

    Response index()
    {
        logger.info("Audit page requested");
        return text("Audit");
    }
}
~~~

The frontend generates container-aware construction for the controller.

## Concrete Construction

Unregistered concrete services can be auto-constructed when they are default constructible or accept the container according to the native container contract.

## Circular Dependencies

Recursive service graphs are detected and reported instead of recursing indefinitely.

## Request Scope

HTTP integration owns request scopes. Controllers and middleware should consume scoped dependencies rather than manually opening and closing request scopes.
