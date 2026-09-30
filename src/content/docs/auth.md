---
title: "Authentication & Authorization"
description: "Use Gungnir's implemented request identity, session authentication, guards, and authorization decision APIs without assuming missing token or password features."
slug: "auth"
group: "Security"
groupOrder: 5
order: 1
status: preview
---

## Authentication State

Authentication establishes the identity associated with the current request.

After authentication middleware has resolved an identity:

~~~gungnir
Response profile(Request request)
{
    if (!request.authenticated()) {
        return text("Unauthorized", 401);
    }

    const user = request.user();

    return json(user);
}
~~~

Authentication state belongs to the request execution context rather than process-global state.

## Guards

The native authentication manager supports named guards. A guard resolves an application credential into an identity.

The core does not assume whether that credential is a session identifier, opaque API token, signed token, or another application-specific mechanism.

## Session Authentication

Cookie-authenticated browser applications can compose:

~~~text
session middleware
→ CSRF middleware
→ session authentication
→ application route
~~~

Only the stable identity ID is stored in session state. The identity resolver runs again on authenticated requests so roles and attributes do not become permanently stale inside the session.

## Authorization

The authorization runtime uses named abilities and explicit allow/deny decisions. Undefined abilities are denied by default.

Resource-specific authorization should be implemented through explicit policies or ability registration rather than implicit runtime type-name magic.

## Passwords

Gungnir does **not** provide a home-grown password hashing algorithm. Applications should use a vetted password-hashing backend such as Argon2id or bcrypt.

## Token Boundary

Complete token issuance, revocation, storage, expiry, rotation, and hashing are **not supplied as a finished authentication product** by the current core.
