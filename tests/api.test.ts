import { test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/leads/route";
const valid = {
  name: "Pessoa Teste",
  email: "teste@example.com",
  phone: "61999999999",
  type: "comercial",
  organization: "",
  location: "",
  stage: "",
  message: "Projeto comercial para avaliação.",
  consent: true,
  website: "",
  source: "/contato",
};
function request(
  body: unknown = valid,
  extra: Record<string, string> = {},
  identity = "test",
) {
  return new NextRequest("http://localhost:3000/api/leads", {
    method: "POST",
    headers: {
      host: "localhost:3000",
      origin: "http://localhost:3000",
      "content-type": "application/json",
      "x-nf-client-connection-ip": identity,
      ...extra,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
test("API rejects cross-origin requests", async () => {
  assert.equal(
    (await POST(request(valid, { origin: "https://other.example" }))).status,
    403,
  );
});
test("API enforces JSON, field validation, and payload limit", async () => {
  assert.equal(
    (await POST(request(valid, { "content-type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await POST(request({ ...valid, consent: false }, {}, "invalid"))).status,
    422,
  );
  assert.equal(
    (await POST(request("invalid json", {}, "malformed"))).status,
    400,
  );
  assert.equal(
    (await POST(request("x".repeat(17000), {}, "oversize"))).status,
    413,
  );
});
test("API rejects honeypot without pretending to accept the enquiry", async () => {
  assert.equal(
    (await POST(request({ ...valid, website: "spam" }, {}, "honeypot"))).status,
    400,
  );
});
test("API reports unconfigured CRM with no successful receipt", async () => {
  const response = await POST(request(valid, {}, "unavailable"));
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.code, "INTEGRATION_UNAVAILABLE");
  assert.equal(body.received, undefined);
  assert.equal(response.headers.get("cache-control"), "no-store");
});
test("API limits repeated requests in the current process", async () => {
  for (let n = 0; n < 5; n++)
    assert.equal((await POST(request(valid, {}, "rate-limit"))).status, 503);
  const response = await POST(request(valid, {}, "rate-limit"));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
});
