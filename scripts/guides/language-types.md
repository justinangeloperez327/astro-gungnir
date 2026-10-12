Use declared types for function parameters, results and application fields.
Local bindings can infer their type from an initial value.

## Common types

| Type | Use |
| --- | --- |
| `string` | Text; single and double quotes both create strings |
| `bool` | `true` or `false` |
| `int` | Signed integer values |
| `uint64` | Unsigned 64-bit integer values |
| `double`, `decimal` | Floating-point numeric values |
| `Decimal` | Exact stored decimal values created from strings |
| `Json` | Structured application data |
| `T?` | An optional value of type `T` |
| `List<T>`, `Map<K, V>` | Typed lists and maps |
| `Collection<Model>` | A collection of model records |
| `Request`, `Response` | HTTP input and output |

Models and other application declarations can also be used as types.

## Optional values

An optional value can contain a value or `null`. Check it before using it:

```gnr
function string displayName(string? name) {
    if (name == null) {
        return "Guest";
    }
    return name;
}
```

Use `??` for a fallback. Combining a concrete value with `null` produces an
optional value.

## Numeric values

Integer literals must fit their type. Decimal, hexadecimal and binary integer
literals and digit separators are accepted. Automatic numeric widening supports
`int` to `double`, `int` to `decimal`, and `uint64` to `decimal`.
Signed/unsigned mixing, `uint64` to `double`, and implicit conversion between
`double` and `decimal` are rejected.

The lowercase `decimal` numeric type uses double precision. Use `Decimal` for
exact stored values: `exactDecimal('123.4500')` preserves the string's decimal
representation. `string()` preserves that representation; `toDouble()` explicitly
converts it to floating point. Exact stored decimals have no implicit arithmetic
conversion. Model `decimal` casts use the exact stored value.

See [Models](model.md), [Collections](collection.md) and [Functions](functions.md).
