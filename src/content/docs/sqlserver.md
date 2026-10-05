---
title: "SQL Server Adapter"
description: "SQL Server Adapter: current Gungnir APIs, usage, configuration, and documented limits."
slug: "sqlserver"
group: "Database & ORM"
groupOrder: 7
order: 18
status: development
sourcePath: "docs/sqlserver.md"
---

> **Status: Development.** This guide describes the current implementation and documented limits. The 1.0 compatibility contract is not frozen yet.

## Current behavior

The optional adapter requires an ODBC manager plus an installed SQL Server ODBC driver. Build and link it explicitly:

```sh
cmake -S . -B build -DGUNGNIR_WITH_SQLSERVER=ON
cmake --build build --config Release
```

```cmake
target_link_libraries(app PRIVATE gungnir::sqlserver)
```

Register before configuring database connections:

```cpp
gungnir::database::register_sqlserver(app.database_drivers());
app.configure_database();
```

Select `DB_CONNECTION=sqlserver` and configure the server/database/credentials through the common Settings contract. Include `<gungnir/database/sqlserver.hpp>` for registration. Raw query parameter representation: ?.

Live integration tests use `GUNGNIR_SQLSERVER_INTEGRATION_TESTS=ON` and need a reachable correctly configured server. Enabling a build flag does not connect to a database.

## Limits and planned work

ODBC manager discovery does not install a database driver. Configure encryption and certificate trust explicitly; validate DECIMAL/NUMERIC conversion.

## Implementation references

- [include/gungnir/database/sqlserver.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/database/sqlserver.hpp)
- [CMakeLists.txt](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/CMakeLists.txt)
- [include/gungnir/database/settings.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/database/settings.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/sqlserver.md).
