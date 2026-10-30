export const leadTypes = [
  "residencial",
  "comercial",
  "corporativo",
  "arquitetos",
  "corretores",
  "garantia",
] as const;
export type LeadType = (typeof leadTypes)[number];
export type Lead = {
  name: string;
  email: string;
  phone: string;
  type: LeadType;
  organization: string;
  location: string;
  stage: string;
  message: string;
  consent: boolean;
  website: string;
  source: string;
};
export type LeadErrors = Partial<Record<keyof Lead, string>>;
export function validateLead(value: unknown): {
  valid: boolean;
  errors: LeadErrors;
  data: Lead | null;
} {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return {
      valid: false,
      errors: { name: "Confira os dados do formulário." },
      data: null,
    };
  const input = value as Record<string, unknown>;
  const text = (key: string) =>
    typeof input[key] === "string" ? (input[key] as string).trim() : "";
  const data = {
    name: text("name"),
    email: text("email").toLowerCase(),
    phone: text("phone"),
    type: text("type") as LeadType,
    organization: text("organization"),
    location: text("location"),
    stage: text("stage"),
    message: text("message"),
    consent: input.consent === true,
    website: text("website"),
    source: text("source"),
  };
  const errors: LeadErrors = {};
  if (data.name.length < 2 || data.name.length > 120)
    errors.name = "Informe seu nome, entre 2 e 120 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
    errors.email = "Informe um e-mail válido.";
  const digits = data.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13 || /[a-z]/i.test(data.phone))
    errors.phone = "Informe um telefone com DDD.";
  if (!leadTypes.includes(data.type))
    errors.type = "Selecione o tipo de solicitação.";
  if (data.organization.length > 160)
    errors.organization = "Use até 160 caracteres.";
  if (data.location.length > 160) errors.location = "Use até 160 caracteres.";
  if (data.stage.length > 80) errors.stage = "Use até 80 caracteres.";
  if (data.message.length < 10 || data.message.length > 3000)
    errors.message = "Conte um pouco mais: entre 10 e 3.000 caracteres.";
  if (!data.consent)
    errors.consent =
      "É necessário concordar com o uso dos dados para este contato.";
  if (data.source.length > 160 || !data.source.startsWith("/"))
    errors.source = "Origem inválida. Recarregue a página.";
  return { valid: Object.keys(errors).length === 0, errors, data };
}
