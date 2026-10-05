---
title: "Security"
description: "Security: current Gungnir APIs, usage, configuration, and documented limits."
slug: "security"
group: "Security"
groupOrder: 5
order: 12
status: development
sourcePath: "docs/security.md"
---

## Overview
Native security building blocks include HTTP security middleware, trusted proxy configuration, session/CSRF integration, random identifiers and authorization decisions. Views escape ordinary interpolation and database APIs support parameter bindings.

Gungnir hardens the HTTP trust boundary: ambiguous HTTP/1 request framing is rejected, request/response headers are validated, Host values are canonicalized, trusted-proxy chains are resolved from the socket peer inward, request IDs are bounded before reflection, CORS preflight is policy-driven, process-local rate-limit state is bounded, and secure cookie prefixes are enforced. Secure requests also receive HSTS from the default security-header middleware.

Configure the trusted proxy boundary, host validation, CORS, rate limits, session cookies and body/header limits for the actual application. Enforce authorization at the operation boundary. See [Security Hardening](/docs/security-hardening/) for the tested Gungnir contract.

## Scope
These mechanisms do not establish a blanket security audit. Raw view output bypasses escaping; model view conversion does not promise hidden-field filtering; session authentication needs application credential verification. Validate all trust boundaries with the selected runtime configuration.



- [include/gungnir/http/security.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/http/security.hpp)
- [include/gungnir/security/random.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/security/random.hpp)
- [include/gungnir/session/middleware.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/session/middleware.hpp)
- [include/gungnir/auth/authorization.hpp](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/include/gungnir/auth/authorization.hpp)

See the [documentation index](/docs/), [getting started](/docs/getting-started/), and [target design](https://github.com/justinangeloperez327/gungnir/blob/d21b71cb6ce62edc0f706ca4296716b9d2dd4d70/docs/design/security.md).
