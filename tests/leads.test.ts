import { test } from "node:test";
import assert from "node:assert/strict";
import { validateLead } from "../src/lib/lead-validation";
import { leadAdapter, IntegrationUnavailable } from "../src/lib/leads";
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
  const result = validateLead(valid);
  assert.ok(result.data);
  await assert.rejects(leadAdapter.submit(result.data), IntegrationUnavailable);
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
