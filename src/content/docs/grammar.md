---
title: "Grammar"
description: "Grammar: current Gungnir APIs, usage, configuration, and documented limits."
slug: "grammar"
group: "Language"
groupOrder: 2
order: 17
status: development
sourcePath: "docs/grammar.md"
---

Gungnir source uses declarations, typed parameters, expression values and statement
blocks. Statements end with semicolons; declaration and callable bodies use braces.
Single and double quotes create strings.

## Declarations and types

```ebnf
function = [ "async" ], "function", type, identifier, parameters, block ;
parameters = "(", [ parameter, { ",", parameter } ], ")" ;
parameter = type, identifier, [ "=", literal ] ;
type = qualifiedName, [ "<", type, { ",", type }, ">" ], [ "?" ] ;
block = "{", { statement }, "}" ;
```

Framework declarations include `controller`, `model`, `migration`, `middleware`,
`event`, `listener`, `job`, `policy`, `notification` and `mail`. Their bodies
contain fields and methods according to each declaration's contract. Model
configuration uses `name = value;`. Relationships have a dedicated form:

```ebnf
relationship = [ "public" ], identifier, "(", ")", "{", "return",
    helper, "<", type, [ ",", type ], ">", "(", [ keys ], ")", ";", "}" ;
helper = "hasOne" | "hasMany" | "belongsTo" | "belongsToMany"
       | "hasOneThrough" | "hasManyThrough" ;
```

Relationship keys are string literals, optionally preceded by their argument
name and a colon. See [Relationships](/docs/relationships/) for ordering and defaults.

## Expressions and statements

Expressions include literals, lists, objects, names, member access, calls,
indexing, arithmetic, comparisons, boolean operations and conditional values.
Calls can use positional arguments followed by named arguments. Arrow callbacks
use `(parameters) => expression` or `(parameters) => { statements }`.

`const` declares an immutable binding; `let` declares a mutable binding.
Blocks support `return`, `throw`, `if`/`else`, loops, `break` and `continue`.
`await` appears inside an async callable.

Imports use a dotted module name and an optional alias:

```gnr
import app.models.User as Models;
```

An alias qualifies declarations with `::`, such as `Models::User`.
See [Types](/docs/language-types/), [Expressions](/docs/expressions/),
[Statements](/docs/statements/), [Functions](/docs/functions-async/) and [Modules](/docs/modules/)
for the detailed language rules.
