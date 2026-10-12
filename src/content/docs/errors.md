---
title: "Errors and Diagnostics"
description: "Learn how to use errors and diagnostics in your Gungnir application."
slug: "errors"
group: "Language"
groupOrder: 2
order: 9
sourcePath: "docs/errors.md"
---

Gungnir reports language and framework errors with a diagnostic code,
message, source location and source span.

## Check an application file

```sh
gungnirc app/controllers/HomeController.gnr --check
```

The compiler reports errors in `.gnr` source and exits with a nonzero
status. Fix those errors before running `gungnir build`. Native
compilation can also report missing C++ toolchains, headers or
optional SDK adapters.

## HTTP and application errors

Runtime failures can arise from validation, routes, database connections,
ORM operations, views, storage and external services. Configure the HTTP
`ExceptionHandler` so clients receive appropriate error responses rather
than uncaught native exceptions.

For production applications, keep stack traces and sensitive internal
details out of public responses and send diagnostic details to
[Logging and Observability](/docs/logging-observability/).

See [Validation](/docs/validation/), [Responses](/docs/responses/) and
[Production](/docs/production/).
