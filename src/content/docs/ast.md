---
title: "Abstract Syntax Tree"
description: "Abstract Syntax Tree: current Gungnir APIs, usage, configuration, and documented limits."
slug: "ast"
group: "Compiler Reference"
groupOrder: 11
order: 10
status: development
sourcePath: "docs/ast.md"
---

> **Status: Development.** This guide describes the current implementation and documented limits. The 1.0 compatibility contract is not frozen yet.

## Current behavior

`SyntaxProject` owns declaration, expression and statement arenas with source origins and stable arena IDs. It represents modules/imports, ordinary functions, framework declarations, generic/optional types, fields, metadata, methods, named calls, arrows and control flow.

## Limits and planned work

The previous flat `Program` API remains available for compatibility. General classes, interfaces, enums, native preprocessor directives and arbitrary native C++ expressions are outside the structured grammar.

## Implementation references

- [Structured compiler API](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/compiler.hpp)
- [Structured compiler tests](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/tests/structured_language.cpp)

- [include/gungnir/language/ast.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/ast.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/ast.md).
