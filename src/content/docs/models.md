---
title: "Models & Relationships"
description: "Use the implemented model conventions, ORM queries, relationships, eager loading, timestamps, and soft deletes."
slug: "models"
group: "ORM"
groupOrder: 7
order: 1
status: preview
---

## Defining a Model

~~~gungnir
model User
{
    string name;
    string email;
    string? nickname;
    bool active = true;
}
~~~

A model receives ORM behavior through the Gungnir frontend.

By convention, `User` maps to the `users` table, uses an incrementing integer `id`, and has timestamps enabled.

## Model Configuration

~~~gungnir
model AuditUser
{
    table = "legacy_users";
    connection = "reporting";
    timestamps = false;
    softDeletes = true;

    string name;
}
~~~

Framework-managed timestamp and soft-delete fields are not intended to be mass-assigned from arbitrary request input.

## Querying

Implemented application-language aliases include forms such as:

~~~gungnir
const user = User::findOrFail(id);

const users = User::whereIn("id", ids)
    .orderBy("name")
    .withTrashed()
    .get();
~~~

The language lowers expressive method names to the native ORM API.

## Relationships

~~~gungnir
model User
{
    string name;

    posts()
    {
        return hasMany<Post>();
    }

    profile()
    {
        return hasOne<Profile>();
    }

    roles()
    {
        return belongsToMany<Role>();
    }
}
~~~

Implemented relationship shapes include:

- `hasOne`
- `hasMany`
- `belongsTo`
- `belongsToMany`
- has-one-through
- has-many-through

## Eager Loading

The ORM supports explicit eager loading and batches relationship keys to avoid one query per parent.

Gungnir intentionally does **not** silently lazy-load an unloaded relationship by default. Accessing an unloaded relationship reports that it has not been loaded.

## Many-to-Many Mutations

The native ORM includes parent-aware attach, detach, and transactional sync operations for relational many-to-many pivot tables.

## Not Yet Supported

Polymorphic relationships are not currently declared as supported.
