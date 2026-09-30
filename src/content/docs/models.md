---
title: "Models & ORM"
description: "Define persistence metadata in models and use Gungnir's model-centric ORM contract."
slug: "models"
group: "Framework"
groupOrder: 4
order: 1
status: preview
---

## Model Declaration

~~~gnr
model User {
    table = 'users';
    primaryKey = 'id';

    fillable = [
        'name',
        'email'
    ];

    timestamps = true;

    posts() {
        return hasMany('posts');
    }
}
~~~

Models describe persistence metadata and relationships.

**Database schema belongs to migrations**, not model declarations.

## Querying

~~~gnr
const users = User::where('active', true)
    .with('profile')
    .orderBy('name')
    .paginate(25);
~~~

The ORM contract is model-centric and distinguishes a query from a materialized collection.

## ORM Contract

The canonical ORM contract covers:

- querying and filtering;
- aggregates;
- pagination;
- CRUD;
- soft deletes;
- eager loading;
- relationships;
- many-to-many operations;
- transactions;
- locks;
- serialization;
- model hydration;
- lifecycle behavior.

## Relationships

Relationships are declared as model behavior:

~~~gnr
posts() {
    return hasMany('posts');
}
~~~

Gungnir's ORM is intended to keep relationship semantics explicit while avoiding N+1 behavior through eager loading.
