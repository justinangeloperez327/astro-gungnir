---
title: "Dependency Injection"
description: "Use Gungnir's dependency container and application-facing inject declarations."
slug: "container"
group: "Architecture Concepts"
groupOrder: 8
order: 2
status: preview
---

Gungnir includes dependency-injection runtime foundations and application-facing injection syntax.

## Injection

~~~gnr
controller UserController {
    inject UserService users;

    public index() {
        return json(users.all());
    }
}
~~~

Application code declares dependencies; the runtime container owns resolution and lifetime behavior.

## Runtime Role

The container supports framework/application construction without forcing controllers and middleware to instantiate infrastructure dependencies manually.

Dependency resolution is a runtime concern while `inject` is the application-language surface.
