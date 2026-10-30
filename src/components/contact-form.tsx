"use client";
import { Icon } from "@/components/icon";
import { useId, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  validateLead,
  type LeadErrors,
  type LeadType,
} from "@/lib/lead-validation";
import { whatsapp } from "@/lib/site";
export function ContactForm({
  defaultType = "residencial",
  partner = false,
}: {
  defaultType?: LeadType;
  partner?: boolean;
}) {
  const id = useId();
  const path = usePathname();
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("");
    const f = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(f),
      consent: f.get("consent") === "on",
      source: path,
    };
    const checked = validateLead(data);
    setErrors(checked.errors);
    if (!checked.valid) {
      const field = Object.keys(checked.errors)[0];
      (form.current?.elements.namedItem(field) as HTMLElement)?.focus();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checked.data),
      });
      const result = await res.json();
      if (res.ok && result.received === true && result.receiptId) {
        setStatus(
          "Solicitação recebida. A equipe poderá retornar pelos contatos informados.",
        );
        form.current?.reset();
      } else {
        setErrors(result.errors || {});
        setStatus(
          result.error ||
            "Não foi possível concluir o envio. Use o WhatsApp para falar com a equipe.",
        );
      }
    } catch {
      setStatus(
        "Não foi possível conectar ao atendimento. Nenhum envio foi confirmado. Fale com a Ebony pelo WhatsApp.",
      );
    } finally {
      setBusy(false);
      setTimeout(() => responseRef.current?.focus(), 0);
    }
  }
  function field(
    name: string,
    label: string,
    type = "text",
    required = true,
    autocomplete?: string,
  ) {
    const key = name as keyof LeadErrors;
    return (
      <div className="field">
        <label htmlFor={`${id}-${name}`}>
          {label}
          {required ? " *" : " (opcional)"}
        </label>
        <input
          id={`${id}-${name}`}
          name={name}
          type={type}
          autoComplete={autocomplete}
          required={required}
          maxLength={name === "email" ? 254 : 160}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${id}-${name}-error` : undefined}
        />
        {errors[key] && (
          <p id={`${id}-${name}-error`} className="field-error">
            {errors[key]}
          </p>
        )}
      </div>
    );
  }
  return (
    <form
      className="contact-form"
      ref={form}
      onSubmit={submit}
      noValidate
      aria-label={
        partner ? "Formulário de parceria" : "Formulário de orçamento"
      }
    >
      <p className="form-note">
        O envio pelo site está em preparação. Você pode preencher para conferir
        os dados, mas nenhum contato será enviado ao CRM nesta versão. Para
        atendimento, converse pelo WhatsApp.
      </p>
      <div className="form-grid">
        {field("name", "Seu nome", "text", true, "name")}
        {field("phone", "WhatsApp com DDD", "tel", true, "tel")}
        {field(
          "email",
          partner ? "E-mail profissional" : "E-mail",
          "email",
          true,
          "email",
        )}
        {field(
          "organization",
          partner ? "Escritório ou imobiliária" : "Empresa ou escritório",
          "text",
          false,
          "organization",
        )}
        <div className="field">
          <label htmlFor={`${id}-type`}>Como podemos ajudar? *</label>
          <select
            id={`${id}-type`}
            name="type"
            defaultValue={defaultType}
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? `${id}-type-error` : undefined}
          >
            <option value="residencial">Orçamento residencial</option>
            <option value="comercial">Orçamento comercial</option>
            <option value="corporativo">Orçamento corporativo</option>
            <option value="arquitetos">
              Parceria para arquitetos e designers
            </option>
            <option value="corretores">Parceria para corretores</option>
            <option value="garantia">Condições de garantia</option>
          </select>
          {errors.type && (
            <p id={`${id}-type-error`} className="field-error">
              {errors.type}
            </p>
          )}
        </div>
        {field("location", "Localização aproximada", "text", false)}
        <div className="field field-full">
          <label htmlFor={`${id}-stage`}>
            {partner ? "Seu interesse" : "Em que momento está seu projeto?"}
          </label>
          <select name="stage" id={`${id}-stage`} defaultValue="">
            <option value="">Selecione (opcional)</option>
            {(partner
              ? [
                  "Conhecer a parceria",
                  "Apresentar um projeto",
                  "Agendar uma conversa técnica",
                ]
              : [
                  "Buscando referências",
                  "Projeto em desenvolvimento",
                  "Projeto pronto para avaliação",
                  "Obra em andamento",
                ]
            ).map((stage) => (
              <option key={stage}>{stage}</option>
            ))}
          </select>
        </div>
        <div className="field field-full">
          <label htmlFor={`${id}-message`}>
            Conte um pouco sobre sua necessidade *
          </label>
          <textarea
            name="message"
            id={`${id}-message`}
            maxLength={3000}
            required
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? `${id}-message-error` : undefined
            }
          />
          {errors.message && (
            <p className="field-error" id={`${id}-message-error`}>
              {errors.message}
            </p>
          )}
        </div>
      </div>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Não preencha este campo</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
        />
        <span>
          Li o <Link href="/privacidade">aviso de privacidade</Link> e concordo
          com o uso dos dados para responder a esta solicitação. *
        </span>
      </label>
      {errors.consent && (
        <p className="field-error" id={`${id}-consent-error`}>
          {errors.consent}
        </p>
      )}
      <button
        type="submit"
        className="button button-dark form-submit"
        disabled={busy}
      >
        {busy
          ? "Verificando disponibilidade…"
          : "Verificar disponibilidade de envio"}
        <span aria-hidden="true">
          <Icon direction="diagonal" />
        </span>
      </button>
      {status && (
        <div
          className="form-response"
          role="status"
          tabIndex={-1}
          ref={responseRef}
        >
          <p>{status}</p>
          <a
            href={whatsapp(defaultType)}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Continuar pelo WhatsApp{" "}
            <span aria-hidden="true">
              <Icon direction="diagonal" />
            </span>
          </a>
        </div>
      )}
    </form>
  );
}
