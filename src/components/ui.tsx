import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { whatsapp } from "@/lib/site";
import { Icon } from "./icon";

export function Arrow() {
  return (
    <span aria-hidden="true" className="arrow">
      <Icon />
    </span>
  );
}
export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`text-link${light ? " light" : ""}`}>
      {children}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro wrap">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      {children && <div className="intro-copy">{children}</div>}
    </section>
  );
}
export function EditorialImage({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`editorial-image ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 760px) 100vw, 70vw"
        priority={priority}
      />
    </div>
  );
}
export function Conversion({ context = "orçamento" }: { context?: string }) {
  return (
    <section className="conversion wrap">
      <div>
        <Eyebrow>Vamos dar forma à sua ideia</Eyebrow>
        <h2>
          Seu próximo projeto
          <br />
          começa com uma conversa.
        </h2>
      </div>
      <div className="conversion-actions">
        <Link className="button button-dark" href="/contato">
          Solicitar orçamento <Arrow />
        </Link>
        <a
          className="text-link"
          href={whatsapp(context)}
          target="_blank"
          rel="noreferrer"
        >
          Falar com a Ebony <Arrow />
        </a>
      </div>
    </section>
  );
}
