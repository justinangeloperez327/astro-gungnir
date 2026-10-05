---
title: "PostgreSQL Adapter"
description: "PostgreSQL Adapter: current Gungnir APIs, usage, configuration, and documented limits."
slug: "postgresql"
group: "Database & ORM"
groupOrder: 7
order: 16
status: development
sourcePath: "docs/postgresql.md"
---

> **Status: Development.** This guide describes the current implementation and documented limits. The 1.0 compatibility contract is not frozen yet.

## Current behavior

The optional adapter requires libpq. Build and link it explicitly:

```sh
cmake -S . -B build -DGUNGNIR_WITH_POSTGRESQL=ON
cmake --build build --config Release
```

```cmake
target_link_libraries(app PRIVATE gungnir::postgresql)
```

Register before configuring database connections:

```cpp
gungnir::database::register_postgresql(app.database_drivers());
app.configure_database();
```

Select `DB_CONNECTION=postgresql` and configure the server/database/credentials through the common Settings contract. Include `<gungnir/database/postgresql.hpp>` for registration. Raw query parameter representation: $1, $2, ....

Live integration tests use `GUNGNIR_POSTGRESQL_INTEGRATION_TESTS=ON` and need a reachable correctly configured server. Enabling a build flag does not connect to a database.

## Limits and planned work

Check NUMERIC/DECIMAL conversions and backend capability reporting before depending on exact decimal semantics.

## Implementation references

- [include/gungnir/database/postgresql.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/database/postgresql.hpp)
- [CMakeLists.txt](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/CMakeLists.txt)
- [include/gungnir/database/settings.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/database/settings.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/postgresql.md).
