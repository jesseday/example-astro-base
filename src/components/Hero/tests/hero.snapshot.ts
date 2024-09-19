import { test, expect } from "@playwright/test";

test.describe("hero", () => {
  test("default", async ({ page }) => {
    await page.goto("/isolation/components/hero/default");
    await expect(page).toHaveScreenshot();
  });
});
