---
layout: ../../layouts/DocsLayout.astro
title: Authentication & Authorization
description: Establish the current identity, maintain request-scoped authentication state, and enforce application abilities.
---

Authentication answers who is making the request. Authorization decides what that identity is allowed to do.

## Request authentication

Once authentication middleware establishes the request identity:

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

## Session authentication

Browser applications can combine session lifecycle middleware, CSRF protection, and session authentication. Only the stable identity identifier should be stored in the session; current identity roles and attributes can be resolved for each request.

## Login and logout

The authentication context supports login and logout flows. Session-backed login rotates the session identifier, and logout removes the authenticated identity while preserving unrelated session values unless the whole session is invalidated.

## Authorization

Define abilities against an identity:

~~~cpp
auth::Authorization authorization;

authorization.define("posts.update", [](const auth::Identity& user) {
    return user.role("editor")
        ? auth::Decision::allow()
        : auth::Decision::deny("Editor role required");
});
~~~

Authorization is default-deny. An undefined ability is not silently granted.

## Policies

Keep resource-specific authorization rules in policies or explicit ability registrations rather than embedding permission logic throughout controllers.

## Passwords

Use a vetted password hashing implementation such as Argon2id or bcrypt through an appropriate security adapter. Gungnir does not replace password hashing with a generic hash function.
