import { test } from "node:test";
import assert from "node:assert/strict";
import { validateLead } from "../src/lib/lead-validation";
import {
  leadAdapter,
  hubSpotPayload,
  IntegrationUnavailable,
  IntegrationFailed,
} from "../src/lib/leads";
import { filterProjects, projects } from "../src/content/projects";
import { whatsapp } from "../src/lib/site";
const valid = {
  name: "Pessoa Teste",
  email: "TESTE@example.com",
  phone: "(61) 99999-9999",
  type: "residencial",
  organization: "",
  location: "Brasília",
  stage: "",
  message: "Gostaria de avaliar uma cozinha sob medida.",
  consent: true,
  website: "",
  source: "/contato",
};
test("validates and normalizes a legitimate enquiry", () => {
  const result = validateLead(valid);
  assert.equal(result.valid, true);
  assert.equal(result.data?.email, "teste@example.com");
});
test("rejects malformed fields and missing consent", () => {
  const result = validateLead({
    ...valid,
    email: "errado",
    phone: "oi",
    type: "unknown",
    consent: false,
    message: "a",
  });
  assert.equal(result.valid, false);
  for (const key of ["email", "phone", "type", "consent", "message"] as const)
    assert.ok(result.errors[key]);
});
test("rejects invalid payload and excessive content", () => {
  assert.equal(validateLead(null).valid, false);
  assert.equal(validateLead([]).valid, false);
  assert.equal(
    validateLead({ ...valid, message: "x".repeat(3001) }).valid,
    false,
  );
});
test("unconfigured adapter never returns fake delivery success", async () => {
  const previous = process.env.HUBSPOT_FORM_GUID;
  delete process.env.HUBSPOT_FORM_GUID;
  const result = validateLead(valid);
  assert.ok(result.data);
  await assert.rejects(leadAdapter.submit(result.data), IntegrationUnavailable);
  if (previous) process.env.HUBSPOT_FORM_GUID = previous;
});
test("maps form content without classifying a visitor as a partner", () => {
  const result = validateLead({
    ...valid,
    type: "arquitetos",
    stage: "Conhecer a parceria",
  });
  assert.ok(result.data);
  const payload = hubSpotPayload(result.data, "https://ebonyplanejados.com");
  assert.equal(payload.context.pageUri, "https://ebonyplanejados.com/contato");
  assert.equal(
    payload.fields
      .find((x) => x.name === "message")
      ?.value.includes("Parceria para arquitetos e designers"),
    true,
  );
  assert.equal(
    payload.fields.some((x) => x.name === "ebony_categoria_parceiro"),
    false,
  );
  assert.equal(
    payload.fields.find((x) => x.name === "email")?.value,
    "teste@example.com",
  );
});
test("only an accepted HubSpot response confirms delivery", async () => {
  const oldId = process.env.HUBSPOT_FORM_GUID;
  const oldUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const oldFetch = globalThis.fetch;
  process.env.HUBSPOT_FORM_GUID = "00000000-0000-0000-0000-000000000001";
  process.env.NEXT_PUBLIC_SITE_URL = "https://ebonyplanejados.com";
  const lead = validateLead(valid).data!;
  try {
    globalThis.fetch = async (input, init) => {
      assert.match(
        String(input),
        /api\.hsforms\.com\/submissions\/v3\/integration\/submit\/51830034\//,
      );
      const body = JSON.parse(String(init?.body));
      assert.equal(
        body.fields.find((x: { name: string }) => x.name === "email").value,
        "teste@example.com",
      );
      return new Response("{}", { status: 200 });
    };
    assert.match((await leadAdapter.submit(lead)).receiptId, /^[0-9a-f-]{36}$/);
    globalThis.fetch = async () => new Response("rejected", { status: 400 });
    await assert.rejects(leadAdapter.submit(lead), IntegrationFailed);
  } finally {
    globalThis.fetch = oldFetch;
    if (oldId === undefined) delete process.env.HUBSPOT_FORM_GUID;
    else process.env.HUBSPOT_FORM_GUID = oldId;
    if (oldUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = oldUrl;
  }
});
test("filters portfolio without invented corporate projects", () => {
  assert.equal(filterProjects("Todos").length, projects.length);
  assert.ok(
    filterProjects("Residencial").every((p) => p.category === "Residencial"),
  );
  assert.equal(filterProjects("Corporativo").length, 0);
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
});
test("WhatsApp links contain only fixed context messages", () => {
  for (const context of [
    "orçamento",
    "arquitetos",
    "corretores",
    "comercial",
  ]) {
    const url = new URL(whatsapp(context));
    assert.equal(url.hostname, "wa.me");
    assert.equal(url.pathname, "/5561985291277");
    assert.ok(url.searchParams.get("text")?.startsWith("Olá, Ebony."));
    assert.equal([...url.searchParams].length, 1);
  }
});
