---
title: "Testing & Production"
description: "Compiler checks, generated application tests, and deployment contracts."
slug: "testing-production"
group: "Testing & Deployment"
groupOrder: 9
order: 1
status: development
---

## Validate and build an application

```sh
gungnirc app/controllers/HomeController.gnr --check
gungnir build
gungnir build --release
```

`--check` performs parsing and semantic/framework validation. Native compilation and adapter integration tests provide additional coverage. Read [Testing](/docs/testing/) and [Compiler Correctness](/docs/compiler-correctness/).

## Deploy a native application

Use the release application build with its required native dependencies and explicitly configured production adapters. Register readiness checks, configure HTTP limits and timeouts, and choose TLS or a reverse proxy.

Read [Production](/docs/production/), [Production Resilience](/docs/production-resilience/), and [Security Hardening](/docs/security-hardening/).

## Development contract

Gungnir remains Development with experimental compatibility. Pin the framework commit used by the application. Version 1.0 requires a fully satisfied completeness audit.

Read [Development Status](/docs/status/), [Stability](/docs/stability/), and [Upgrading](/docs/upgrading/).
