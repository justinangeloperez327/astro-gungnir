---
title: "Modules"
description: "Organize application code in modules and import the declarations you need."
slug: "modules"
group: "Language"
groupOrder: 2
order: 8
sourcePath: "docs/modules.md"
---

Organize application code in `.gnr` modules. A dotted module name maps to its
path relative to the project root.

For `math.gnr`:

```gnr
module math;

function int add(int left, int right) {
    return left + right;
}
```

For another module:

```gnr
import math as Math;

function int result() {
    return Math::add(2, 3);
}
```

## Imports and names

An explicit `module` declaration must match the file's path. Top-level
declarations are exported by default; `export` can also be written explicitly.
Use import aliases to distinguish declarations with the same name.
Missing imports, import cycles, duplicate aliases and ambiguous names are errors.

## Application builds

Run `gungnir build` to build the application, including its routes and imported
modules. The CLI reuses unchanged build output during development.
For standalone language modules, `gungnirc ROOT --project` checks and compiles
modules together; application routes and bootstrap belong to `gungnir build`.

See [CLI Commands](/docs/cli/) and [Routing](/docs/routing/).
