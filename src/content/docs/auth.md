---
title: "Authentication & Authorization"
description: "Establish the request identity, manage session-backed authentication, protect browser requests, and enforce application abilities."
slug: "auth"
group: "Security"
groupOrder: 5
order: 1
status: preview
---


## Authentication and Authorization

Authentication determines **who** is making the request. Authorization determines **what** that identity may do.

Gungnir keeps those responsibilities separate.

## Request Authentication

Once authentication middleware establishes an identity, controller code can read it from the request:

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

Authentication state belongs to the request execution context rather than global state.

## Guards

A guard resolves an application credential into an identity. The credential may come from a session, opaque token, signed token, or another application-specific authentication scheme.

The core authentication API deliberately does not assume one credential format for every application.

## Session Authentication

For browser applications, register middleware in the order required by the request lifecycle:

~~~text
session middleware
→ CSRF middleware
→ session authentication
→ application routes
~~~

Session authentication stores only the stable identity identifier. The current identity can then be resolved again on each request so roles and attributes do not become permanently stale inside the session.

## Login and Logout

Login and logout update the request authentication context. Session-backed authentication rotates the session identifier when authentication state changes.

Use a full session invalidation when logout should also clear unrelated session data.

## CSRF Protection

State-changing browser routes using session authentication should use CSRF protection. The CSRF token is tied to the session lifecycle and rotates when the session identity is regenerated or invalidated.

## Authorization Abilities

Authorization policies return an explicit decision:

~~~cpp
auth::Authorization authorization;

authorization.define("posts.update", [](const auth::Identity& user) {
    return user.role("editor")
        ? auth::Decision::allow()
        : auth::Decision::deny("Editor role required");
});
~~~

Undefined abilities are denied by default.

## Policies

Keep resource-specific permission rules in policies or explicit ability registrations rather than scattering role checks throughout controllers.

## Passwords

Use a vetted password hashing backend such as Argon2id or bcrypt. A generic cryptographic hash is not a password-storage strategy, and Gungnir does not provide a home-grown password hashing algorithm.
