---
title: "Database & Migrations"
description: "Configure database connectivity and evolve application storage with explicit, backend-aware migrations."
slug: "database"
group: "Database"
groupOrder: 6
order: 1
status: preview
---


## Configuration

Database connection values are normally supplied through the environment:

~~~text
DB_CONNECTION=postgresql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=my_app
DB_USERNAME=postgres
DB_PASSWORD=
~~~

Gungnir defines application-level contracts for PostgreSQL, MySQL/MariaDB, SQL Server, and MongoDB adapters. The matching concrete adapter must be available in the application build.

## Database Access

Application code should depend on the framework's database abstractions rather than native client libraries. This keeps connection management, transactions, query observation, and model persistence behind one application-facing contract.

## Creating Migrations

Generate a migration through the CLI:

~~~text
gungnir make:migration create_users_table
~~~

A migration describes how storage changes when moving forward and, where appropriate, how to reverse that change.

A relational migration can define a table using Gungnir's table/column vocabulary:

~~~cpp
class CreateUsersTable : public Migration {
public:
    void up() override {
        Table::create("users", [](Column& column) {
            column.id();
            column.string("name");
            column.string("email").unique();
            column.timestamps();
        });
    }

    void down() override {
        Table::drop_if_exists("users");
    }
};
~~~

## Migration Operations

The migration layer supports common schema work including:

- table create, alter, rename, and drop operations;
- scalar, text, JSON, UUID, and temporal columns;
- indexes and composite indexes;
- foreign keys and referential actions;
- timestamps and soft deletes;
- column rename/drop operations;
- index and foreign-key removal.

Backend-specific SQL belongs to the database implementation rather than application migrations.

## Migration Lifecycle

The migration runner supports pending migrations, rollback of the latest batch, reset, and status reporting.

Migration names are persistent database identities. Do not casually rename migrations after they have been deployed.

## Backend Differences

DDL transaction guarantees vary by database engine. Gungnir does not claim atomic schema changes when the selected backend cannot provide them.

MongoDB schema evolution follows document-database semantics rather than pretending to behave like relational DDL.
