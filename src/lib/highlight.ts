const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const keywords = new Set([
  "controller",
  "model",
  "return",
  "const",
  "let",
  "inject",
  "async",
  "await",
  "true",
  "false",
  "null",
]);
const types = new Set([
  "Response",
  "Request",
  "string",
  "int",
  "bool",
  "Route",
]);
export function highlight(code: string) {
  return code
    .split("\n")
    .map(
      (line) =>
        `<span class="code-line">${(
          line.match(
            /\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b[A-Za-z_]\w*\b|\b\d+\b|[^\w\s]|\s+/g,
          ) ?? []
        )
          .map((token) => {
            const kind = token.startsWith("//")
              ? "comment"
              : /^['"]/.test(token)
                ? "string"
                : keywords.has(token)
                  ? "keyword"
                  : types.has(token)
                    ? "type"
                    : /^\d/.test(token)
                      ? "number"
                      : "";
            return kind
              ? `<span class="token-${kind}">${escape(token)}</span>`
              : escape(token);
          })
          .join("")}</span>`,
    )
    .join("\n");
}
