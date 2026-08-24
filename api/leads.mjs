const MAX_BODY_BYTES = 10_000;
const MIN_FORM_TIME_MS = 1_500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]{7,24}$/;

function json(data, status, headers = {}) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...headers }
  });
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return json({ ok: false, error: "Method not allowed" }, 405, { Allow: "POST" });
    }
    if (!isSameOrigin(request)) return json({ ok: false, error: "Invalid origin" }, 403);

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large" }, 413);
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return json({ ok: false, error: "Unsupported content type" }, 415);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid request" }, 400);
    }

    // Silently accept honeypot submissions so automated spam does not retry.
    if (clean(body.website, 200)) return json({ ok: true }, 201);

    const name = clean(body.name, 80);
    const email = clean(body.email, 160).toLowerCase();
    const phone = clean(body.phone, 24);
    const language = ["en", "es", "de"].includes(body.language) ? body.language : "es";
    const startedAt = Number(body.startedAt);
    const submittedTooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FORM_TIME_MS;
    const isValid = name.length >= 2
      && EMAIL_PATTERN.test(email)
      && PHONE_PATTERN.test(phone)
      && body.consent === true
      && !submittedTooFast;

    if (!isValid) return json({ ok: false, error: "Invalid contact details" }, 400);

    const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    const webhookSecret = process.env.PRIME_HEALTH_LEADS_SECRET;
    if (!webhookUrl || !webhookSecret) {
      return json({ ok: false, error: "Lead service unavailable" }, 503);
    }

    try {
      const upstream = await fetch(webhookUrl, {
        method: "POST",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: webhookSecret,
          submissionId: crypto.randomUUID(),
          source: "prime-health-website",
          submittedAt: new Date().toISOString(),
          name,
          email,
          phone,
          language,
          consent: true
        }),
        signal: AbortSignal.timeout(12_000)
      });

      const result = await upstream.json().catch(() => null);
      if (!upstream.ok || !result?.ok) return json({ ok: false, error: "Lead service failed" }, 502);
      return json({ ok: true }, 201);
    } catch {
      return json({ ok: false, error: "Lead service failed" }, 502);
    }
  }
};
