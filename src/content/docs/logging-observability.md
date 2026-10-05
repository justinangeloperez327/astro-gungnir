---
title: "Logging and Observability"
description: "Logging and Observability: current Gungnir APIs, usage, configuration, and documented limits."
slug: "logging-observability"
group: "Runtime & Infrastructure"
groupOrder: 8
order: 15
status: development
sourcePath: "docs/logging-observability.md"
---

## Overview
Logging, tracing and metrics have native APIs and memory sinks. Framework paths record HTTP/database/messaging-related instrumentation where integrated. An optional OTLP HTTP exporter is built with `GUNGNIR_WITH_OTLP` and exported as `gungnir::otlp`.

Configure sinks/exporters explicitly; bound buffering and exclude credentials and sensitive payloads.

## Scope
An exporter is not automatically configured by enabling its build flag. Do not promise complete distributed context propagation or telemetry coverage for every coroutine/native callback without validating that path.



- [include/gungnir/logging/logger.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/logging/logger.hpp)
- [include/gungnir/observability/trace.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/observability/trace.hpp)
- [include/gungnir/observability/metrics.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/observability/metrics.hpp)
- [include/gungnir/observability/otlp_http_exporter.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/observability/otlp_http_exporter.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/logging-observability.md).
