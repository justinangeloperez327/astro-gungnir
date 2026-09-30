---
title: "Database Backends"
description: "Understand Gungnir's database backend contract and how backend-specific capabilities stay outside normal application syntax."
slug: "database"
group: "Database & ORM"
groupOrder: 6
order: 1
status: preview
---

The database runtime is separated from ORM and application-language semantics.

## Backends

The Gungnir backend contract includes or targets:

- SQLite
- PostgreSQL
- MySQL / MariaDB-compatible clients
- SQL Server
- MongoDB

Backend capability differences remain explicit.

MongoDB, for example, remains document-native rather than pretending to expose relational semantics.

## Application Boundary

Normal model and ORM code should not depend on backend-specific driver syntax.

Backend adapters, native client libraries, connection behavior, and capabilities belong to the database runtime.

## ORM Integration

Models and ORM queries use the same application-facing contract while the runtime/compiler selects backend-appropriate behavior.

## Migration Integration

Migrations describe schema intent at the application level. Backend-specific SQL or document commands belong to backend compilers/adapters.
