---
layout: ../../layouts/DocsLayout.astro
title: Database & Migrations
description: Configure database access and evolve application storage through explicit migrations.
---

Database configuration is normally supplied through the application environment:

~~~text
DB_CONNECTION=postgresql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=my_app
DB_USERNAME=postgres
DB_PASSWORD=
~~~

Gungnir defines framework contracts for PostgreSQL, MySQL/MariaDB, SQL Server, and MongoDB adapters. A concrete backend adapter must be available and registered for the selected connection.

## Migrations

Create migrations through the CLI:

~~~text
gungnir make:migration create_users_table
~~~

Migration code uses table and column terminology:

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

## Migration operations

The migration layer supports common operations including:

- table create, alter, rename, and drop
- scalar, text, JSON, UUID, and temporal columns
- indexes and composite indexes
- foreign keys and referential actions
- timestamps and soft deletes
- column rename and removal
- index and foreign-key removal

Backend-specific SQL belongs to the database compiler rather than application migrations.

## Migration lifecycle

The migration runner provides pending migration execution, rollback of the latest batch, reset, and status reporting.

DDL transaction guarantees depend on the selected database engine. MongoDB schema evolution is treated according to document database semantics rather than pretending it has relational DDL behavior.
