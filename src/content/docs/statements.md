---
title: "Statements"
description: "Statements: current Gungnir APIs, usage, configuration, and documented limits."
slug: "statements"
group: "Language"
groupOrder: 2
order: 15
status: development
sourcePath: "docs/statements.md"
---

## Overview
MethodStatement represents returns, bindings, expression statements, blocks, conditionals, loops, break and continue. Semantics checks selected scope, mutability, condition, return and loop-control rules.

## Scope
The target grammar is stricter and more complete than current parsing. Full definite assignment and all-path return analysis are not guaranteed for arbitrary native escape forms.



- [include/gungnir/language/ast.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/ast.hpp)
- [src/language/parser.cpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/src/language/parser.cpp)
- [src/language/semantic.cpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/src/language/semantic.cpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/statements.md).
