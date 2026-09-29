---
layout: ../../layouts/DocsLayout.astro
title: Models & Relationships
description: Define convention-first models, query records, persist data, and work with explicit relationships and eager loading.
---

## Defining Models

A Gungnir model receives ORM behavior automatically:

~~~gungnir
model User
{
    string name;
    string email;
    string? nickname;
    bool active = true;
}
~~~

By convention, `User` maps to the `users` table and uses an incrementing integer `id` primary key. Timestamp attributes are enabled by default.

## Model Configuration

Override conventions only when the application needs to:

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

## Querying Models

Use model query methods to retrieve application records:

~~~gungnir
const user = User::findOrFail(id);

const users = User::where("active", true)
    .orderBy("name")
    .get();
~~~

Common expressive aliases include operations such as `findOrFail`, `whereIn`, `orderBy`, and soft-delete scopes.

## Creating Records

~~~gungnir
const user = User::create({
    "name": "Ada",
    "email": "ada@example.com"
});
~~~

Validated request data can be passed into model creation when the model's assignable fields match the validated payload.

## Relationships

Define relationships directly on the model:

~~~gungnir
model User
{
    string name;
    string email;

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

Relationship foundations include `hasOne`, `hasMany`, `belongsTo`, `belongsToMany`, and through relationships.

Conventional foreign keys, local keys, and pivot names are inferred where the relationship allows it. Explicit values can override the convention.

## Eager Loading

Load relationships explicitly when they will be used with a collection of parent records.

Gungnir intentionally avoids silently issuing hidden lazy-loading queries by default. Hidden relationship queries make N+1 behavior difficult to detect and reason about.

## Many-to-Many Relationships

Many-to-many relationships keep pivot metadata explicit. Attach, detach, and sync operations should be treated as database-backed relationship mutations, not merely in-memory collection changes.

## Timestamps and Soft Deletes

Timestamp-enabled models maintain `created_at` and `updated_at` during persistence.

Models configured with `softDeletes = true` gain soft-delete behavior and a `deleted_at` attribute. Framework-managed timestamp and soft-delete fields are not intended to be mass-assigned from arbitrary request input.
