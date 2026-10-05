---
title: "Validated AST"
description: "Validated AST: current Gungnir APIs, usage, configuration, and documented limits."
slug: "validated-ast"
group: "Compiler Reference"
groupOrder: 11
order: 12
status: development
sourcePath: "docs/validated-ast.md"
---

> **Status: Development.** This guide describes the current implementation and documented limits. The 1.0 compatibility contract is not frozen yet.

## Current behavior

The structured `Compiler` resolves syntax into `ValidatedProject`. The validated object can only be created by `ProgramValidator`; its syntax, symbol IDs, type IDs, bound arguments, captures and module order are exposed through const accessors. Callable resolution also records whether structured control-flow analysis proves that the callable cannot fall through. `CppEmitter` accepts this object rather than unchecked syntax. Failed validation emits no C++.

## Limits and planned work

The legacy `Transpiler` remains a separate compatibility path. Native APIs require explicit `CompilerOptions` bindings in the structured frontend; it does not infer arbitrary C++ declarations.

## Implementation references

- [Structured compiler API](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/compiler.hpp)
- [Structured compiler tests](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/tests/structured_language.cpp)

- [include/gungnir/language/ast.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/ast.hpp)
- [include/gungnir/language/semantic.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/semantic.hpp)
- [src/language/transpiler.cpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/src/language/transpiler.cpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/validated-ast.md).
