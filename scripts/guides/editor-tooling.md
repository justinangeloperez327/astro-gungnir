Use an editor with a Language Server Protocol client to work with `.gnr` files.

## Configure the language server

Set the server command to `gungnir`, its argument to `lsp`, and the workspace
root to your application directory. The server communicates over stdin/stdout.

It provides diagnostics, document symbols, definitions, hover, basic completion
and formatting. Unsaved buffers are used when checking open modules.
Save dependent files or enable watched-file notifications to refresh imports.
Hover and navigation require valid application source; some symbols and
completion remain available while a file is being edited.

## Format a file

```sh
gungnirc app/controllers/HomeController.gnr --format
gungnirc app/controllers/HomeController.gnr --strict --format -o formatted.gnr
gungnirc app/controllers/HomeController.gnr --format --check
```

`--format --check` reports whether the file is already formatted without writing
it. `--strict --format` validates structured syntax first. Formatting uses four
spaces and preserves literal and comment contents. Use a C++ formatter for
native bootstrap files.

See [CLI Commands](cli-codegen.md) and [Errors](errors.md).
