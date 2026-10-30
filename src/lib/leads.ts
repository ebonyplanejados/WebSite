import type { Lead } from "./lead-validation";
export type LeadReceipt = { received: true; receiptId: string };
export interface LeadAdapter {
  submit(lead: Lead): Promise<LeadReceipt>;
}
export class IntegrationUnavailable extends Error {
  constructor() {
    super("A integração de atendimento ainda não foi configurada.");
  }
}
// No external calls, no PII logging, no fake receipt. Replace only after verifying
// the real HubSpot property schema, lawful processing and secure secret binding.
export const leadAdapter: LeadAdapter = {
  async submit() {
    throw new IntegrationUnavailable();
  },
};
