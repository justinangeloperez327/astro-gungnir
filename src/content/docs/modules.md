---
title: "Modules"
description: "Organize .gnr source through static modules and explicit imports."
slug: "modules"
group: "Language"
groupOrder: 2
order: 3
status: preview
---

Gungnir modules are **static source-language modules**.

They are not C++ headers, C++20 modules, or runtime package loaders.

## File Mapping

A file such as:

~~~text
app/models/user.gnr
~~~

maps conventionally to:

~~~text
app.models.user
~~~

## Imports

Imports are explicit:

~~~gnr
import app.models.user;
import app.services.billing as Billing;
~~~

Aliases are part of the source-language import contract.

## Compilation Role

Module resolution belongs to the compiler. Dependencies are resolved before semantic validation and structural lowering.

Application code should not use native include mechanics to represent ordinary Gungnir module relationships.
