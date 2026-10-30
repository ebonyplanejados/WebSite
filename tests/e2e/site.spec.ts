import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("small screens, tablets and wide displays retain usable layouts", async ({
  page,
}) => {
  for (const width of [320, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/projetos", "/contato"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("all public routes render, with canonical metadata and no horizontal overflow", async ({
  page,
}) => {
  const routes = [
    "/",
    "/projetos",
    "/projetos/espaco-comercial",
    "/projetos/balcao-e-exposicao",
    "/projetos/cozinha-sob-medida",
    "/projetos/estantes-curvas",
    "/solucoes",
    "/solucoes/residencial",
    "/solucoes/comercial",
    "/solucoes/corporativo",
    "/o-atelier",
    "/para-arquitetos",
    "/para-corretores",
    "/contato",
    "/privacidade",
  ];
  for (const route of routes) {
    const result = await page.goto(route);
    expect(result?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(canonical!).href).toBe(
      new URL(route, "http://localhost:3000").href,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  }
});

test("portfolio filters, empty state and gallery keyboard controls work", async ({
  page,
}) => {
  await page.goto("/projetos");
  await page.getByRole("button", { name: "Residencial", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Corporativo", exact: true }).click();
  await expect(
    page.getByText("O próximo ambiente pode ser o seu."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.locator(".project-card").first().click();
  await page
    .getByRole("button", { name: /Ampliar:/ })
    .first()
    .click();
  const dialog = page.getByRole("dialog", { name: "Galeria de fotografias" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText("2 / 2")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("contact validation and confirmed backend submission", async ({
  page,
}) => {
  await page.route("**/api/leads", (route) =>
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ received: true, receiptId: "test-receipt" }),
    }),
  );
  await page.goto("/contato?tipo=comercial");
  await expect(page.getByLabel("Como podemos ajudar?")).toHaveValue(
    "comercial",
  );
  await page.getByRole("button", { name: "Enviar solicitação" }).click();
  await expect(
    page.getByText("Informe seu nome, entre 2 e 120 caracteres."),
  ).toBeVisible();
  await page.getByLabel("Seu nome").fill("Pessoa Teste");
  await page.getByLabel("WhatsApp com DDD").fill("61999999999");
  await page.getByLabel("E-mail", { exact: false }).fill("teste@example.com");
  await page
    .getByLabel("Conte um pouco")
    .fill("Quero avaliar um projeto de marcenaria comercial.");
  await page.getByRole("checkbox").check();
  const response = page.waitForResponse((r) => r.url().endsWith("/api/leads"));
  await page.getByRole("button", { name: "Enviar solicitação" }).click();
  expect((await response).status()).toBe(201);
  await expect(page.getByRole("status")).toContainText("Solicitação recebida");
  await expect(
    page.getByRole("link", { name: "Continuar pelo WhatsApp" }),
  ).toHaveCount(0);
});

test("accessible pages, dialog and responsive navigation", async ({
  page,
}, testInfo) => {
  for (const route of [
    "/",
    "/projetos",
    "/contato",
    "/para-arquitetos",
    "/privacidade",
  ]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
    await expect(dialog).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await dialog.getByRole("link", { name: "Projetos" }).click();
    await expect(page).toHaveURL(/\/projetos$/);
    await expect(dialog).not.toBeVisible();
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Abrir menu" }),
    ).toBeFocused();
  }
});

test("local navigation targets, 404 and crawl controls", async ({
  page,
  request,
}) => {
  const paths = new Set<string>();
  for (const route of [
    "/",
    "/solucoes",
    "/para-arquitetos",
    "/para-corretores",
    "/projetos",
  ]) {
    await page.goto(route);
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
    hrefs.forEach((h) => paths.add(h.split("#")[0]));
  }
  for (const href of paths)
    expect((await request.get(href)).status(), href).toBe(200);
  expect((await request.get("/projetos/inexistente")).status()).toBe(404);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "/projetos/cozinha-sob-medida",
  );
});

test("capture homepage with loaded images", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.querySelectorAll("img").forEach((i) => {
      i.loading = "eager";
    });
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    );
  });
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
