---
title: "Current Status"
description: "Understand which Gungnir capabilities are implemented, optional, incomplete, or not yet exposed through the normal application workflow."
slug: "status"
group: "Getting Started"
groupOrder: 1
order: 3
status: preview
---

Gungnir is version **0.1.0** and remains under active development. A header or parser node alone is not treated as a completed user feature in this documentation.

## Application Language

These areas have an implemented application-language path today:

| Capability | Current status |
| --- | --- |
| Controllers | Implemented |
| Controller routes | Implemented |
| Route parameters | Implemented |
| Middleware declarations | Implemented |
| Async / await controller flow | Implemented |
| Request input helpers | Implemented |
| Validation object syntax | Implemented |
| View responses and view data | Implemented |
| Model declarations | Implemented |
| ORM method aliases | Implemented |
| Model relationships | Implemented |
| Application create / run / listen | Implemented |

The language also accepts native C++ interoperability forms. Not every runtime subsystem has dedicated `.gnr` sugar yet.

## CLI Generators

Working generators:

~~~text
gungnir make:model User
gungnir make:controller UserController
gungnir make:middleware AuthMiddleware
gungnir make:migration create_users_table
~~~

The following are **not currently available** even though their underlying runtime foundations exist:

~~~text
gungnir make:request
gungnir make:job
~~~

The CLI implementation rejects both until their source-language lowering is implemented.

## Known Boundaries

The current framework does **not** claim the following as completed application features:

- typed route-model binding such as automatically resolving `show(User user)`;
- database validation rules such as `unique` and `exists`;
- polymorphic ORM relationships;
- implicit lazy relationship loading;
- view layouts, includes, or view components;
- a built-in password hashing algorithm;
- token issuance and revocation as a complete authentication product;
- Memcached or database-backed cache adapters;
- cloud storage adapters such as S3 or Azure Blob;
- SMTP attachments, DKIM, or provider-specific HTTP mail APIs;
- `.gnr` job/request generator lowering.

## Optional Adapters

The repository contains concrete optional adapters for PostgreSQL, MySQL/MariaDB, SQL Server, MongoDB, Redis, and SMTP. They require their build options and native dependencies; configuring an environment variable alone does not make an adapter available.

When an adapter is not registered, the framework should fail explicitly rather than silently substitute a mock backend.
