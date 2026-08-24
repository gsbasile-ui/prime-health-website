import assert from "node:assert/strict";
import test from "node:test";
import leads from "../api/leads.mjs";

const originalFetch = globalThis.fetch;
const validLead = {
  name: "Test Lead",
  email: "lead@example.com",
  phone: "+39 353 000 0000",
  consent: true,
  website: "",
  language: "es",
  startedAt: Date.now() - 3000
};

function request(body = validLead, options = {}) {
  return new Request("https://prime-health-co.vercel.app/api/leads", {
    method: options.method || "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: options.origin || "https://prime-health-co.vercel.app"
    },
    body: options.method === "GET" ? undefined : JSON.stringify(body)
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  delete process.env.PRIME_HEALTH_LEADS_SECRET;
});

test("rejects methods other than POST", async () => {
  const response = await leads.fetch(request(validLead, { method: "GET" }));
  assert.equal(response.status, 405);
});

test("rejects cross-origin submissions", async () => {
  const response = await leads.fetch(request(validLead, { origin: "https://example.com" }));
  assert.equal(response.status, 403);
});

test("rejects incomplete contact details", async () => {
  const response = await leads.fetch(request({ ...validLead, phone: "12" }));
  assert.equal(response.status, 400);
});

test("accepts honeypot spam without calling the webhook", async () => {
  globalThis.fetch = () => {
    throw new Error("Webhook should not be called");
  };
  const response = await leads.fetch(request({ ...validLead, website: "spam" }));
  assert.equal(response.status, 201);
});

test("returns unavailable when Google automation is not configured", async () => {
  const response = await leads.fetch(request());
  assert.equal(response.status, 503);
});

test("forwards a validated lead without exposing the secret", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL = "https://script.google.com/test";
  process.env.PRIME_HEALTH_LEADS_SECRET = "test-secret";
  let forwarded;
  globalThis.fetch = async (_url, options) => {
    forwarded = JSON.parse(options.body);
    return Response.json({ ok: true });
  };

  const response = await leads.fetch(request());
  const publicBody = await response.json();
  assert.equal(response.status, 201);
  assert.deepEqual(publicBody, { ok: true });
  assert.equal(forwarded.name, validLead.name);
  assert.equal(forwarded.secret, "test-secret");
  assert.equal("secret" in publicBody, false);
});
