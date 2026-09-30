---
title: "Service Container"
description: "Use Gungnir's inversion-of-control container to resolve application services and controller dependencies."
slug: "container"
group: "Architecture Concepts"
groupOrder: 2
order: 2
status: preview
---


## Introduction

The service container manages object construction and service lifetimes. Controllers and middleware can depend on services without creating concrete implementations themselves.

## Controller Injection

Declare a dependency with `inject`:

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

The controller is resolved through the application container and its declared dependency is provided automatically.

## Service Lifetimes

Gungnir supports several service lifetimes:

- **Transient** — a new value is created for each resolution.
- **Singleton** — one instance is created and reused.
- **Scoped** — one instance is reused inside the current request or operation scope.
- **Instance** — an existing value is registered directly.

Scoped services are intended for request-owned or operation-owned state. Resolving a scoped service outside an active scope is rejected rather than silently changing its lifetime.

## Interfaces and Implementations

Application service contracts can be bound to implementations or factories. This allows controllers to depend on abstractions while the application decides which implementation is used.

Bindings may also be replaced for testing or environment-specific behavior.

## Circular Dependencies

The container detects recursive dependency resolution and reports circular dependency graphs instead of recursing indefinitely.

## Request Scopes

HTTP request integration owns the request scope. Controllers should not manually start or stop request scopes; use scoped services and let the request lifecycle manage their lifetime.
