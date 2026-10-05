---
title: "Errors"
description: "Errors: current Gungnir APIs, usage, configuration, and documented limits."
slug: "errors"
group: "Language"
groupOrder: 2
order: 18
status: development
sourcePath: "docs/errors.md"
---

## Overview
Compiler diagnostics carry stable code, level, message, source location and a half-open source span. Structured compilation enriches diagnostics with the original source line and normalized end position before results leave the compiler. `gungnirc` uses the shared diagnostic renderer, showing source context and a span underline, and exits nonzero on errors. Diagnostic ordering is deterministic across multi-file compilation.

Generated C++ carries `#line` directives at callable and statement boundaries when line directives are enabled. Native compiler diagnostics are therefore mapped back to the closest originating `.gnr` statement instead of only the generated C++ file.

Native errors and exceptions cover HTTP, validation, ORM, database, view and storage failures. `ExceptionHandler` defines HTTP rendering at the router boundary.

## Scope
The structured compiler has an authoritative `ValidatedProject` gate for the supported language profile. Native compilation can still report backend/toolchain failures, but ordinary supported-language errors must be diagnosed before lowering. Multi-line diagnostic rendering currently emphasizes the first source line of the span; richer secondary labels and cross-backend native diagnostic normalization remain future work. Exception rendering must still be configured appropriately for production.



- [include/gungnir/language/diagnostic.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/diagnostic.hpp)
- [include/gungnir/language/diagnostic_renderer.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/language/diagnostic_renderer.hpp)
- [include/gungnir/http/exception_handler.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/http/exception_handler.hpp)
- [include/gungnir/errors/error.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/errors/error.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/errors.md).
