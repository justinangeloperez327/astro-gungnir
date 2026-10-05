---
title: "MySQL Adapter"
description: "MySQL Adapter: current Gungnir APIs, usage, configuration, and documented limits."
slug: "mysql"
group: "Database & ORM"
groupOrder: 7
order: 17
status: development
sourcePath: "docs/mysql.md"
---

> **Status: Development.** This guide describes the current implementation and documented limits. The 1.0 compatibility contract is not frozen yet.

## Current behavior

The optional adapter requires MariaDB Connector/C or a compatible MySQL C client. Build and link it explicitly:

```sh
cmake -S . -B build -DGUNGNIR_WITH_MYSQL=ON
cmake --build build --config Release
```

```cmake
target_link_libraries(app PRIVATE gungnir::mysql)
```

Register before configuring database connections:

```cpp
gungnir::database::register_mysql(app.database_drivers());
app.configure_database();
```

Select `DB_CONNECTION=mysql` and configure the server/database/credentials through the common Settings contract. Include `<gungnir/database/mysql.hpp>` for registration. Raw query parameter representation: ?.

Live integration tests use `GUNGNIR_MYSQL_INTEGRATION_TESTS=ON` and need a reachable correctly configured server. Enabling a build flag does not connect to a database.

## Limits and planned work

DECIMAL/NEWDECIMAL currently map to Double; use explicit conversion where exact decimal semantics matter.

## Implementation references

- [include/gungnir/database/mysql.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/database/mysql.hpp)
- [CMakeLists.txt](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/CMakeLists.txt)
- [include/gungnir/database/settings.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/database/settings.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/mysql.md).
