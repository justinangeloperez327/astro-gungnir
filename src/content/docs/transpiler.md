---
title: "Compatibility Transpiler"
description: "Compatibility Transpiler: current Gungnir APIs, usage, configuration, and documented limits."
slug: "transpiler"
group: "Compiler Reference"
groupOrder: 11
order: 14
status: development
sourcePath: "docs/transpiler.md"
---

> **Status: Development.** This guide describes the current implementation and documented limits. The 1.0 compatibility contract is not frozen yet.

The canonical path is `language::Compiler` and is used by `gungnirc` by default:

```text
.gnr
  -> SyntaxParser
  -> ProgramValidator
  -> ValidatedProject
  -> CppIrLowerer
  -> CppIrProject
  -> CppEmitter
```

Use `gungnirc --compat` only for source that intentionally depends on the earlier native-C++ compatibility grammar.

## Current compatibility behavior

`CompatibilityTranspiler` tokenizes source, parses the legacy `Program`, runs compatibility semantic diagnostics, invokes specialized lowerers and applies `SourceEdit` replacements to the original source.

The historical `Transpiler` C++ name remains as an alias to `CompatibilityTranspiler` while compatibility migration continues.

## Rules for new compiler work

The compatibility pipeline is frozen for new language semantics.

Do not add new Gungnir language behavior to:

- `ModelLowerer`;
- `ControllerLowerer`;
- `MiddlewareLowerer`;
- `MigrationLowerer`;
- `AsyncLowerer`;
- `ValidationLowerer`;
- `ViewLowerer`;
- generic `SourceEdit` rewriting.

New syntax and framework semantics belong in the structured parser, semantic validator, validated compiler structures and C++ IR lowering. The final emitter must remain semantic-free.

Compatibility fixes remain limited to explicitly opted-in legacy/native-compatible behavior; new structured semantics belong in the canonical compiler pipeline.

## Remaining migration work

Structured application declarations use validated-only emission, and structured project routes are parsed into route nodes, semantically checked against the project index, and emitted directly without SourceEdit. The remaining SourceEdit lowerers are confined to explicit `--compat` use and legacy/native-C++ fixture coverage.

## Implementation references

- [Structured compiler](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/compiler.hpp)
- [Compatibility API](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/transpiler.hpp)
- [Compatibility implementation](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/src/language/transpiler.cpp)

See [Compiler Correctness](/docs/compiler-correctness/), [Compiler Conformance](/docs/compiler-conformance/), and [Compiler Profiles](/docs/compiler-profiles/).
