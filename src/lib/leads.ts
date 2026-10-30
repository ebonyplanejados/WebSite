import type { Lead } from "./lead-validation";
import { randomUUID } from "node:crypto";
export type LeadReceipt = { received: true; receiptId: string };
export interface LeadAdapter {
  submit(lead: Lead): Promise<LeadReceipt>;
}
export class IntegrationUnavailable extends Error {
  constructor() {
    super("A integração de atendimento ainda não foi configurada.");
  }
}
export class IntegrationFailed extends Error {
  constructor() {
    super("O HubSpot não confirmou o recebimento da solicitação.");
  }
}

const typeLabels: Record<Lead["type"], string> = {
  residencial: "Orçamento residencial",
  comercial: "Orçamento comercial",
  corporativo: "Orçamento corporativo",
  arquitetos: "Parceria para arquitetos e designers",
  corretores: "Parceria para corretores",
  garantia: "Condições de garantia",
};

export function hubSpotPayload(lead: Lead, siteUrl: string) {
  const [firstName, ...lastName] = lead.name.split(/\s+/);
  const details = [
    `Solicitação: ${typeLabels[lead.type]}`,
    ...(lead.stage ? [`Momento/interesse: ${lead.stage}`] : []),
    ...(lead.location ? [`Localização aproximada: ${lead.location}`] : []),
    `Página: ${lead.source}`,
    "",
    lead.message,
  ];
  return {
    fields: [
      { name: "email", value: lead.email },
      { name: "firstname", value: firstName },
      ...(lastName.length
        ? [{ name: "lastname", value: lastName.join(" ") }]
        : []),
      { name: "phone", value: lead.phone },
      ...(lead.organization
        ? [{ name: "company", value: lead.organization }]
        : []),
      { name: "message", value: details.join("\n") },
    ],
    context: {
      pageUri: new URL(lead.source, siteUrl).toString(),
      pageName: "Contato | Ebony Planejados",
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "Li o aviso de privacidade e concordo com o uso dos dados para responder a esta solicitação.",
      },
    },
  };
}

export const leadAdapter: LeadAdapter = {
  async submit(lead) {
    const formId = process.env.HUBSPOT_FORM_GUID;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!formId || !siteUrl) throw new IntegrationUnavailable();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    try {
      const result = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/51830034/${encodeURIComponent(formId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hubSpotPayload(lead, siteUrl)),
          signal: controller.signal,
        },
      );
      // HubSpot returns 2xx only after accepting the form submission. Never
      // show a receipt for validation errors, spam blocks or upstream failures.
      if (!result.ok) throw new IntegrationFailed();
      return { received: true, receiptId: randomUUID() };
    } catch {
      throw new IntegrationFailed();
    } finally {
      clearTimeout(timeout);
    }
  },
};
