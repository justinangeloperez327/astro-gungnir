const text = (value) => ({ type: "text", value });
const element = (tagName, properties, children) => ({
  type: "element",
  tagName,
  properties,
  children,
});
// Render the toolbar and table container before sending HTML to avoid layout shifts.
export default function docElements() {
  return (tree) => {
    const visit = (parent) => {
      if (!parent.children) return;
      parent.children = parent.children.map((node) => {
        visit(node);
        if (node.type !== "element") return node;
        if (node.tagName === "table")
          return element(
            "div",
            {
              className: ["table-scroll"],
              tabIndex: 0,
              role: "region",
              "aria-label": "Scrollable documentation table",
            },
            [node],
          );
        if (node.tagName !== "pre") return node;
        const code = node.children.find((child) => child.tagName === "code");
        if (!code) return node;
        node.properties = {
          ...node.properties,
          tabIndex: 0,
          "aria-label": "Code example",
        };
        const language =
          code.properties?.className
            ?.find((name) => name.startsWith("language-"))
            ?.slice(9) ?? "text";
        const label =
          { gnr: "GNR", cpp: "C++", sh: "SHELL", bash: "SHELL" }[language] ??
          language.toUpperCase();
        return element("div", { className: ["code-frame"] }, [
          element("div", { className: ["code-toolbar"] }, [
            element("span", { className: ["code-language"] }, [text(label)]),
            element(
              "button",
              {
                type: "button",
                className: ["code-copy"],
                "data-code-copy": "",
                "aria-label": `Copy ${label} code`,
              },
              [text("Copy")],
            ),
          ]),
          element(
            "div",
            {
              className: ["code-scroll"],
              tabIndex: 0,
              role: "region",
              "aria-label": "Scrollable code example",
            },
            [node],
          ),
        ]);
      });
    };
    visit(tree);
  };
}
