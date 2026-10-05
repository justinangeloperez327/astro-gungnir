---
title: "Functions"
description: "Functions: current Gungnir APIs, usage, configuration, and documented limits."
slug: "functions-async"
group: "Language"
groupOrder: 2
order: 12
status: development
sourcePath: "docs/functions.md"
---

## Overview
Use `function int add(int left, int right = 2) { return left + right; }` with `gungnirc --strict`. Functions require declared return types. Calls support literal defaults and named arguments; supplied arguments are evaluated in source order. Framework methods infer their documented response/decision/void contracts. Public, protected and private members are checked.

## Scope
Defaults currently require literal constants. Native overload resolution, variadic functions and general class inheritance are outside this profile. Async calls require explicit `await` inside an async callable.



- [Structured compiler API](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/compiler.hpp)
- [Structured compiler tests](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/tests/structured_language.cpp)

- [include/gungnir/language/ast.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/ast.hpp)
- [src/language/parser.cpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/src/language/parser.cpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/functions.md).
