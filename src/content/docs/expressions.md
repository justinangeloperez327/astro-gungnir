---
title: "Expressions"
description: "Expressions: current Gungnir APIs, usage, configuration, and documented limits."
slug: "expressions"
group: "Language"
groupOrder: 2
order: 14
status: development
sourcePath: "docs/expressions.md"
---

## Overview
The structured frontend parses typed literals, calls, members, indexing, lists, objects, arrows, unary/binary operators, ternaries, `await`, safe field access and null coalescing. Arrows receive callback parameter types from migration/collection contexts and capture referenced outer values by value. Optional values can be narrowed by simple null comparisons in if/else branches.

## Scope
String interpolation, general native operators, safe optional method calls and general flow-sensitive narrowing are not supported. Await expressions inside null coalescing require a separate binding. Native APIs must be declared through compiler bindings. Framework compatibility expressions continue through the legacy parser.



- [Structured compiler API](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/compiler.hpp)
- [Structured compiler tests](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/tests/structured_language.cpp)

- [include/gungnir/language/ast.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/ast.hpp)
- [src/language/parser.cpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/src/language/parser.cpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/expressions.md).
