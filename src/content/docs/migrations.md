---
title: "Migrations"
description: "Define database schema changes with Gungnir's first-class migration declaration."
slug: "migrations"
group: "Framework"
groupOrder: 3
order: 2
status: preview
---

Database schema belongs in migrations.

## Migration Declaration

~~~gnr
migration CreateUsersTable {
    up() {
        Table::create('users', (table) => {
            table.id();
            table.string('name');
            table.string('email').unique();
            table.timestamps();
        });
    }

    down() {
        Table::dropIfExists('users');
    }
}
~~~

A migration defines a forward `up()` operation and a reverse `down()` operation.

## Schema Intent

Migration source should express application schema intent. Backend-specific SQL or document commands belong to database compilers/adapters rather than application migration code.

## Backend Differences

Relational databases and MongoDB do not share identical schema semantics. Gungnir keeps those capability differences explicit rather than pretending all backends behave like SQL.
