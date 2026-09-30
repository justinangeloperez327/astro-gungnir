---
title: "Authentication & Policies"
description: "Use Gungnir authentication helpers and policy-driven authorization."
slug: "auth"
group: "Security"
groupOrder: 5
order: 1
status: preview
---

## Authentication

Authentication resolves request identity.

The canonical application-facing helpers include:

~~~gnr
Auth::check();
Auth::user();
Auth::attempt(credentials);
Auth::logout();
~~~

## Authorization

Authorization is policy-driven:

~~~gnr
authorize('update', post);
~~~

Authentication answers **who the current user is**. Authorization answers **what that user may do**.

## Policy Declaration

~~~gnr
policy PostPolicy {
    public update(User user, Post post) {
        return user.id == post.user_id;
    }
}
~~~

Policies are first-class Gungnir declarations in the target language.

## Sessions and Security

Session-backed authentication, CSRF protection, and HTTP security belong to the runtime/security layer. Password hashing and credential-storage policy should rely on vetted cryptographic implementations rather than custom framework cryptography.
