---
title: "Collections"
description: "Filter, sort, transform and iterate model collections in memory."
slug: "collections"
group: "Database & ORM"
groupOrder: 4
order: 6
sourcePath: "docs/collection.md"
---

ORM queries return `Collection<Model>`, an owned sequence of hydrated models.
Iterate the result or use callbacks to transform it in memory:

```gnr
const users = User::all();
const active = users.filter((user) => user.active).sortBy((user) => user.name);
const names = active.map((user) => user.name);
const total = active.reduce(0, (sum, user) => sum + user.id);
```

`filter` and `reject` retain `Collection<Model>`. `map` returns `List<Result>`.
`each` invokes its callback and returns `void`.

## Language operations

| Operation | Result |
| --- | --- |
| `empty`, `isEmpty`, `contains`, `every` | `bool` |
| `size`, `count` | `int` |
| `first`, `last`, `at(index)` | A model; empty or out-of-range access throws |
| `find(key)` | `Model?`, searched by the model's primary key |
| `filter`, `reject` | A collection selected by a boolean callback |
| `sortBy(projection, descending)`, `unique(projection)` | A collection ordered or deduplicated by a scalar projection |
| `take(count)`, `skip(count)` | A collection slice |
| `chunk(count)` | `List<Collection<Model>>`; chunk size must be positive |
| `sum(projection)` | The projected numeric type; integral overflow throws |
| `reduce(initial, callback)` | The initial value's type; the callback receives accumulator and model |
| `values()` | `List<Model>` |

Indexes and slice sizes must be nonnegative. `sortBy` defaults to ascending order.
Collection callbacks and traversal perform no additional database queries.

See [ORM](/docs/orm/) for database queries.
