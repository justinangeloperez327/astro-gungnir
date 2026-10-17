import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("homepage examples support clicks and keyboard navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Expressive code.Native applications.",
  );
  await page.getByRole("tab", { name: "Data", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Project::where");
  await page
    .getByRole("tab", { name: "Data", exact: true })
    .press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Views", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText('view("welcome"');
  await page.getByRole("tab", { name: "Views", exact: true }).press("Home");
  await expect(
    page.getByRole("tab", { name: "HTTP", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".sdk-note")).toContainText("current source");
  expect(errors).toEqual([]);
});
test("theme choice persists across navigation and storage failure is tolerated", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.getByRole("link", { name: "Start building", exact: true }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});
test("search finds current guides and ignores cleared or closed queries", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Search documentation", exact: true })
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Search documentation",
    exact: true,
  });
  const input = dialog.getByRole("searchbox");
  await input.fill("Spear");
  await expect(dialog.locator("[data-search-results] a").first()).toBeVisible();
  await expect(dialog.locator("[data-search-results]")).toContainText("Spear");
  await input.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page
    .getByRole("button", { name: "Search documentation", exact: true })
    .click();
  await expect(input).toHaveValue("");
  await expect(dialog.locator("[data-search-results] a")).toHaveCount(0);
  await input.fill("routing");
  await input.fill("");
  await expect(dialog.locator("[data-search-results] a")).toHaveCount(0);
});
test("documentation navigation, copy buttons and removed pages", async ({
  page,
  request,
  isMobile,
}) => {
  await page.goto("/docs/getting-started/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Getting Started",
  );
  if (isMobile) {
    const button = page.getByRole("button", { name: "Browse documentation" });
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const nav = page.getByRole("dialog", {
      name: "Documentation",
      exact: true,
    });
    await nav
      .getByRole("link", { name: "Views and Spear", exact: true })
      .click();
  } else
    await page
      .locator("aside")
      .getByRole("link", { name: "Views and Spear", exact: true })
      .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Views and Spear",
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async (value: string) => {
          (window as any).__copied = value;
        },
      },
      configurable: true,
    }),
  );
  await page.getByRole("button", { name: "Copy GNR code" }).first().click();
  await expect(page.locator("[data-copy-status]")).toHaveText(
    "Code copied to clipboard.",
  );
  expect(await page.evaluate(() => (window as any).__copied)).toContain(
    "view(",
  );
  expect((await request.get("/docs/compiler-correctness/")).status()).toBe(404);
});
for (const route of ["/", "/docs/", "/docs/validation/"]) {
  test(`responsive layout and WCAG AA checks: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    for (const theme of ["dark", "light"]) {
      await page.evaluate(
        (theme) =>
          document.documentElement.classList.toggle("dark", theme === "dark"),
        theme,
      );
      await page.evaluate(async () => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await Promise.all(
          document
            .getAnimations()
            .map((animation) => animation.finished.catch(() => {})),
        );
      });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map((node) => ({
            target: node.target,
            details: node.failureSummary,
          })),
        })),
      ).toEqual([]);
    }
  });
}
test("site remains readable when browser storage is blocked", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw Error("Storage blocked");
    };
    Storage.prototype.setItem = () => {
      throw Error("Storage blocked");
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  expect(errors).toEqual([]);
});
