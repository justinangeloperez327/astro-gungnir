---
layout: ../../layouts/DocsLayout.astro
title: Models & ORM
description: Define application models with conventions for fields, queries, relationships, timestamps, and persistence.
---

A Gungnir model automatically receives ORM behavior.

~~~gungnir
model User
{
    string name;
    string email;
    string? nickname;
    bool active = true;
}
~~~

By convention, the model uses the `users` table, an incrementing integer `id` primary key, and timestamp attributes.

## Model configuration

Override conventions when needed:

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

## Querying

Use expressive model query methods:

~~~gungnir
const user = User::findOrFail(id);

const users = User::where("active", true)
    .orderBy("name")
    .get();
~~~

Additional query helpers include operations such as `whereIn`, ordering, soft-delete scopes, and record creation or persistence.

## Creating records

~~~gungnir
const user = User::create({
    "name": "Ada",
    "email": "ada@example.com"
});
~~~

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

Supported relationship foundations include `hasOne`, `hasMany`, `belongsTo`, `belongsToMany`, and through relationships.

## Eager loading

Prefer explicit eager loading when related data is required. Gungnir intentionally avoids silently hiding database queries behind implicit lazy loading because that makes N+1 problems difficult to detect.

## Timestamps and soft deletes

Timestamp-enabled models maintain `created_at` and `updated_at`. Models configured with `softDeletes = true` gain soft-delete behavior and a `deleted_at` attribute.
