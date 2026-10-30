import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { validateLead } from "@/lib/lead-validation";
import { leadAdapter, IntegrationUnavailable } from "@/lib/leads";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const requests = new Map<string, { count: number; until: number }>();
const WINDOW = 60_000;
const response = (
  body: object,
  status: number,
  headers: Record<string, string> = {},
) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
export async function POST(request: NextRequest) {
  // No cross-origin browser submission. Reverse proxy must preserve Origin/Host.
  const origin = request.headers.get("origin");
  let sameOrigin = false;
  try {
    const parsed = new URL(origin || "");
    // Next's internal URL can use 0.0.0.0 or a platform worker host. Compare
    // with the browser-facing Host, without trusting arbitrary forwarded hosts.
    sameOrigin =
      ["https:", "http:"].includes(parsed.protocol) &&
      parsed.host === request.headers.get("host");
  } catch {
    /* Reject absent or malformed origins. */
  }
  if (!sameOrigin || request.headers.get("sec-fetch-site") === "cross-site")
    return response({ error: "Origem de solicitação inválida." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return response({ error: "Formato inválido." }, 415);
  const now = Date.now();
  for (const [key, value] of requests)
    if (value.until < now) requests.delete(key);
  // Ephemeral hashed address only; not a durable or distributed abuse system.
  // Netlify's verified client header takes precedence; forwarded fallback is
  // best effort for local use. The form also has a honeypot and HubSpot spam checks.
  const identity =
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    "local";
  const key = createHash("sha256").update(identity).digest("hex");
  const count = requests.get(key) || { count: 0, until: now + WINDOW };
  if (count.count >= 5 || requests.size >= 10_000)
    return response(
      {
        error:
          "Muitas tentativas. Aguarde um minuto antes de tentar novamente.",
      },
      429,
      { "Retry-After": "60" },
    );
  count.count++;
  requests.set(key, count);
  try {
    const reader = request.body?.getReader();
    if (!reader) return response({ error: "Formulário vazio." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16_384) {
        await reader.cancel();
        return response(
          { error: "O formulário excede o limite permitido." },
          413,
        );
      }
      chunks.push(value);
    }
    const checked = validateLead(
      JSON.parse(Buffer.concat(chunks).toString("utf8")),
    );
    if (!checked.valid || !checked.data)
      return response(
        { error: "Confira os campos destacados.", errors: checked.errors },
        422,
      );
    if (checked.data.website)
      return response(
        { error: "Não foi possível processar esta solicitação." },
        400,
      );
    const receipt = await leadAdapter.submit(checked.data);
    return response({ received: true, receiptId: receipt.receiptId }, 201);
  } catch (error) {
    if (error instanceof SyntaxError)
      return response({ error: "Formato de formulário inválido." }, 400);
    if (error instanceof IntegrationUnavailable)
      return response(
        {
          error:
            "Não foi possível enviar a solicitação agora. Fale com a equipe pelo WhatsApp.",
          code: "INTEGRATION_UNAVAILABLE",
        },
        503,
      );
    return response(
      {
        error:
          "Não foi possível concluir o envio. Tente novamente mais tarde ou fale pelo WhatsApp.",
      },
      500,
    );
  }
}
