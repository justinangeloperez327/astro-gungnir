---
title: "Database & Migrations"
description: "Configure the current database layer, optional concrete adapters, transactions, and migration commands without assuming an adapter is automatically installed."
slug: "database"
group: "Database"
groupOrder: 6
order: 1
status: preview
---

## Database Layer

The database runtime provides the execution foundation used by ORM queries and migrations.

Connections execute parameterized statements. Bindings are passed separately from SQL.

## Concrete Adapters

Gungnir currently provides optional concrete adapters for:

| Backend | Build dependency |
| --- | --- |
| PostgreSQL | libpq |
| MySQL / MariaDB | native MySQL-compatible C client |
| SQL Server | ODBC |
| MongoDB | libmongoc |

These adapters are **optional build targets**. They must be enabled and registered. Setting `DB_CONNECTION` alone does not install or register them.

## Transactions

The database manager provides synchronous transaction handling with commit-on-success and rollback-on-exception behavior.

Current transaction closures are intentionally **synchronous and thread-affine**. Gungnir does not claim coroutine-safe asynchronous database transactions yet.

## Creating a Migration

The current CLI generator emits the compatible migration class form:

~~~gungnir
class CreateUsersTable : Migration
{
    void up()
    {
        Table::create("users", [](Column& column) {
            column.id();
            column.string("name");
            column.string("email").unique();
            column.timestamps();
        });
    }

    void down()
    {
        Table::drop_if_exists("users");
    }
}
~~~

## Migration Commands

~~~text
gungnir migrate
gungnir migrate:rollback
gungnir migrate:reset
gungnir migrate:status
gungnir migrate:plan
~~~

`migrate:plan` compiles backend-specific plans without opening a database connection. Execution commands require a real registered driver.

## Migration Operations

The current migration layer supports table create/alter/rename/drop operations, common column types, indexes, foreign keys, timestamps, soft deletes, column rename/drop, and index/foreign-key removal.

MongoDB migration behavior remains document-native rather than pretending to provide relational DDL semantics.
