const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const EXPECTED_PLATFORMS = [
  "GitHub", "LinkedIn", "Unstop", "LeetCode", "HackerRank",
  "Kaggle", "Discord", "WhatsApp", "Phone"
];

test.describe("KAI-NEXUS production website", () => {
  test("production URL responds and the main document renders", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "networkidle" });
    expect(response, "A navigation response should exist").not.toBeNull();
    expect(response.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/KAI\s*NEXUS/i);
    await expect(page.locator("h1")).toContainText("KAMALESH");
    await expect(page.locator(".center-node")).toBeVisible();
    await expect(page.locator("#network")).toBeVisible();
    await expect(page.locator(".site-footer")).toBeVisible();
  });

  test("all nine configured platform nodes are generated", async ({ page }) => {
    await page.goto("/");
    const nodes = page.locator(".platform-node");
    await expect(nodes).toHaveCount(EXPECTED_PLATFORMS.length);
    for (const name of EXPECTED_PLATFORMS) {
      await expect(nodes.filter({ has: page.locator(".platform-node-name", { hasText: name }) })).toHaveCount(1);
    }
  });

  test("platform icons load successfully", async ({ page }) => {
    await page.goto("/");
    const images = page.locator(".platform-node img");
    await expect(images).toHaveCount(EXPECTED_PLATFORMS.length);
    const imageResults = await images.evaluateAll(imgs =>
      imgs.map(img => ({
        src: img.getAttribute("src"),
        loaded: img.complete && img.naturalWidth > 0
      }))
    );
    expect(imageResults.filter(x => !x.loaded), JSON.stringify(imageResults, null, 2)).toEqual([]);
  });

  test("network connection lines are generated for every platform", async ({ page }) => {
    await page.goto("/");
    await expect.poll(() => page.locator("#connectionLayer line.network-line").count()).toBe(EXPECTED_PLATFORMS.length);
    await expect(page.locator("#particleLayer .data-particle")).toHaveCount(EXPECTED_PLATFORMS.length);
  });

  test("selecting every platform updates the profile panel", async ({ page }) => {
    await page.goto("/");
    const nodes = page.locator(".platform-node");
    for (const name of EXPECTED_PLATFORMS) {
      const node = nodes.filter({ has: page.locator(".platform-node-name", { hasText: name }) });
      await node.click();
      await expect(page.locator("#profileState")).toBeVisible();
      await expect(page.locator("#profileName")).toHaveText(name);
      await expect(node).toHaveClass(/active/);
      await expect(page.locator("#profileDescription")).not.toBeEmpty();
      await expect(page.locator("#profileStats")).not.toBeEmpty();
      await expect(page.locator("#profileStatus")).not.toBeEmpty();
    }
  });

  test("only the latest selected platform remains active", async ({ page }) => {
    await page.goto("/");
    const nodes = page.locator(".platform-node");
    await nodes.nth(0).click();
    await nodes.nth(1).click();
    await nodes.nth(2).click();
    await expect(nodes.nth(2)).toHaveClass(/active/);
    await expect(page.locator(".platform-node.active")).toHaveCount(1);
    await expect(page.locator("#profileName")).toHaveText("Unstop");
  });

  test("keyboard Enter and Space activate platform nodes", async ({ page }) => {
    await page.goto("/");
    const github = page.locator(".platform-node").filter({
      has: page.locator(".platform-node-name", { hasText: "GitHub" })
    });
    await github.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#profileName")).toHaveText("GitHub");

    const linkedin = page.locator(".platform-node").filter({
      has: page.locator(".platform-node-name", { hasText: "LinkedIn" })
    });
    await linkedin.focus();
    await page.keyboard.press("Space");
    await expect(page.locator("#profileName")).toHaveText("LinkedIn");
  });

  test("interactive nodes expose button semantics and accessible labels", async ({ page }) => {
    await page.goto("/");
    const nodes = page.locator(".platform-node");
    for (let i = 0; i < await nodes.count(); i++) {
      await expect(nodes.nth(i)).toHaveAttribute("role", "button");
      await expect(nodes.nth(i)).toHaveAttribute("tabindex", "0");
      await expect(nodes.nth(i)).toHaveAttribute("aria-label", /^Select .+/);
    }
  });

  test("initial empty state and selected profile visibility are mutually exclusive", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#emptyState")).toBeVisible();
    await expect(page.locator("#profileState")).toBeHidden();
    await page.locator(".platform-node").first().click();
    await expect(page.locator("#emptyState")).toBeHidden();
    await expect(page.locator("#profileState")).toBeVisible();
  });

  test("footer year is the current year", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#currentYear")).toHaveText(String(new Date().getFullYear()));
  });

  test("all platform nodes remain within the network bounds", async ({ page }) => {
    await page.goto("/");
    const result = await page.locator("#network").evaluate(network => {
      const outer = network.getBoundingClientRect();
      return [...network.querySelectorAll(".platform-node")].map(node => {
        const r = node.getBoundingClientRect();
        return {
          name: node.dataset.platform,
          inside: r.left >= outer.left - 1 && r.top >= outer.top - 1 &&
                  r.right <= outer.right + 1 && r.bottom <= outer.bottom + 1
        };
      });
    });
    expect(result.filter(x => !x.inside), JSON.stringify(result, null, 2)).toEqual([]);
  });

  for (const viewport of [
    { name: "mobile narrow", width: 320, height: 720 },
    { name: "mobile", width: 375, height: 812 },
    { name: "large mobile", width: 430, height: 932 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "laptop", width: 1366, height: 768 },
    { name: "desktop", width: 1920, height: 1080 }
  ]) {
    test(`responsive layout: ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");
      await expect(page.locator(".hero")).toBeVisible();
      await expect(page.locator("#network")).toBeVisible();
      await expect(page.locator(".site-footer")).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth
      }));
      expect(dimensions.document, `Unexpected horizontal overflow: ${JSON.stringify(dimensions)}`)
        .toBeLessThanOrEqual(dimensions.viewport + 1);
    });
  }

  test("profile status settles after selecting a platform", async ({ page }) => {
    await page.goto("/");
    await page.locator(".platform-node").first().click();
    await expect(page.locator("#profileStatus")).not.toContainText("VERIFYING");
    await expect(page.locator("#profileStatus")).toContainText(/LINK VERIFIED|NETWORK OFFLINE|CONNECTION INVALID|CONNECTION MISSING/);
  });

  test("rapid platform switching does not leave stale profile content", async ({ page }) => {
    await page.goto("/");
    const nodes = page.locator(".platform-node");
    for (let i = 0; i < EXPECTED_PLATFORMS.length; i++) await nodes.nth(i).click();
    await expect(page.locator("#profileName")).toHaveText("Phone");
    await page.waitForTimeout(650);
    await expect(page.locator("#profileName")).toHaveText("Phone");
    await expect(page.locator(".platform-node.active")).toHaveCount(1);
  });

  test("no uncaught page errors or failed same-origin assets", async ({ page }) => {
    const pageErrors = [];
    const failedLocal = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    page.on("requestfailed", request => {
      if (request.url().startsWith("https://kamalesh-suresh-kumar.github.io/")) {
        failedLocal.push(`${request.url()} :: ${request.failure()?.errorText}`);
      }
    });
    await page.goto("/");
    await page.locator(".platform-node").first().click();
    await page.waitForTimeout(650);
    expect(pageErrors).toEqual([]);
    expect(failedLocal).toEqual([]);
  });

  test("basic accessibility audit with axe-core", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const serious = results.violations.filter(v => ["critical", "serious"].includes(v.impact));
    expect(serious.map(v => ({
      id: v.id, impact: v.impact, description: v.description,
      nodes: v.nodes.map(n => n.target)
    })), "Serious/critical accessibility violations").toEqual([]);
  });

  test("Open Platform uses the selected configured destination (web profiles)", async ({ page }) => {
    await page.goto("/");
    const expected = {
      GitHub: "https://github.com/Kamalesh-Suresh-Kumar",
      LinkedIn: "https://www.linkedin.com/in/kamalesh-suresh-kumar/",
      Unstop: "https://unstop.com/u/kamalkum3987",
      LeetCode: "https://leetcode.com/u/kamalesh_s_p/",
      HackerRank: "https://www.hackerrank.com/profile/kamalesh_s_p",
      Kaggle: "https://www.kaggle.com/kamaleshsp",
      Discord: "https://discordapp.com/users/1256675555294838998",
      WhatsApp: "https://wa.me/916369638817"
    };
    for (const [name, url] of Object.entries(expected)) {
      const node = page.locator(".platform-node").filter({
        has: page.locator(".platform-node-name", { hasText: name })
      });
      await node.click();
      const popupPromise = page.context().waitForEvent("page");
      await page.locator("#openButton").click();
      const popup = await popupPromise;
      await popup.waitForLoadState("domcontentloaded").catch(() => {});
      expect(popup.url()).toBe(url);
      await popup.close();
    }
  });

  test("phone profile is classified as call-ready without invoking the dialler", async ({ page }) => {
    await page.goto("/");
    await page.locator(".platform-node").filter({
      has: page.locator(".platform-node-name", { hasText: "Phone" })
    }).click();
    await expect(page.locator("#profileName")).toHaveText("Phone");
    await expect(page.locator("#profileStatus")).toContainText(/CALL READY|NETWORK OFFLINE/);
    // Deliberately do not click OPEN PLATFORM: that would invoke the OS dialler.
  });
});