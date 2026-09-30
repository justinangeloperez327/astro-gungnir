---
title: "Current Status"
description: "Understand the difference between Gungnir's canonical target contract and the implementation state of the pre-1.0 compiler and runtime."
slug: "status"
group: "Getting Started"
groupOrder: 1
order: 3
status: preview
---

Gungnir is **pre-1.0** and under active development.

The source language, compiler architecture, runtime APIs, and generated-code ABI may still change while the framework moves toward a coherent stable contract.

## Canonical Documentation

The Gungnir documentation defines the **target language and framework behavior**.

That means documentation can describe the intended canonical syntax before every compiler or runtime path has completed migration to it.

> Do not assume every documented target-language feature is already fully implemented by the current compiler.

## Current Migration

Gungnir is moving away from earlier compatibility and source-rewrite behavior toward a compiler with explicit frontend and semantic phases.

The target pipeline is:

~~~text
.gnr source
→ Lexer
→ Tokens
→ Parser
→ Syntax AST
→ Module / Symbol Resolution
→ Semantic + Type Analysis
→ Control-Flow / Framework Validation
→ Validated AST
→ Framework Lowering
→ C++23 IR
→ C++23 Emitter
→ Native C++ Compiler
→ Application
~~~

The guiding rule is:

> Parse once, resolve once, validate once, then lower deterministic compiler structures.

## Stability

Until Gungnir reaches a stable compatibility policy, pin the exact version or commit used by an application.

The website documents the canonical Gungnir contract; repository tests and release notes remain the authority for whether a particular compiler build implements every documented construct.
