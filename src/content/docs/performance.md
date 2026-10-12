---
title: "Application Load and Performance"
description: "Learn how to use application load and performance in your Gungnir application."
slug: "performance"
group: "Testing & Deployment"
groupOrder: 7
order: 6
sourcePath: "docs/application-performance.md"
---

Measure throughput, latency, memory and CPU with the installed Linux
application-load tool. Use an SDK containing SQLite, a C++23 compiler,
CMake 3.25+, Ninja and Python 3.10+.

## Run a measurement

With an SDK installed in `load-sdk`:

```sh
python3 load-sdk/share/gungnir/benchmarks/application_load.py \
  --sdk "$PWD/load-sdk" \
  --output application-load.json --summary application-load.md
```

For a longer measurement:

```sh
python3 load-sdk/share/gungnir/benchmarks/application_load.py \
  --sdk "$PWD/load-sdk" \
  --concurrency 1,8,32,64 --duration 10 --samples 5 \
  --warmup 1 --soak-duration 120
```

The tool builds and runs a temporary application on loopback and removes it
afterward. It writes JSON, Markdown and an application/build log.

## Workloads

| Profile | Request | Work |
| --- | --- | --- |
| `json` | `GET /json` | Authentication, routing and JSON serialization |
| `orm-read` | `GET /items/{item}` | Model binding, SQLite lookup and JSON |
| `orm-write` | `PUT /items/{item}` | Model binding, validation and SQLite persistence |

## Interpret the results

Inspect successful responses, failures, latency percentile bounds, process RSS
and CPU. RSS samples can miss short peaks, and generator CPU can limit measured
throughput. Compare runs only with equivalent hardware, SDK adapters, compiler,
database durability, workload and concurrency.

These loopback workloads use one server and local SQLite. They do not establish
production capacity or compare Gungnir with other frameworks. Measure your own
endpoints, proxy/TLS configuration, databases and workers before selecting
production limits. See [Linux Deployment](/docs/production-deployment/).
