---
title: "Packages and Extensions"
description: "Packages and Extensions: current Gungnir APIs, usage, configuration, and documented limits."
slug: "extensions"
group: "Architecture Concepts"
groupOrder: 3
order: 12
status: development
sourcePath: "docs/extensions.md"
---

## Overview
Providers register services and participate in application boot/shutdown. The extension Registry stores explicit Plugin instances by package name and rejects duplicate registrations. A plugin supplies package metadata and a provider.

## Scope
This interface does not implement dynamic library discovery/loading, dependency solving or a package manager. Header/interface presence alone is not a tested installable plugin workflow. Validate a plugin against the exact framework commit and native toolchain.



- [include/gungnir/core/provider.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/core/provider.hpp)
- [include/gungnir/extensions/plugin.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/extensions/plugin.hpp)
- [include/gungnir/extensions/extensions.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/extensions/extensions.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/extensions.md).
