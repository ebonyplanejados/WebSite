"use client";
import { Icon } from "@/components/icon";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const links = [
  ["/projetos", "Projetos"],
  ["/solucoes", "Soluções"],
  ["/o-atelier", "O Ateliê"],
  ["/para-arquitetos", "Parcerias"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      menu.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      menu.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <header className="site-header">
        <Link href="/" aria-label="Ebony — página inicial" className="brand">
          <Image
            src="/brand/ebony.png"
            alt="Ebony Ambientes Planejados"
            width={206}
            height={79}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([href, title]) => (
            <Link
              href={href}
              key={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
            >
              {title}
            </Link>
          ))}
        </nav>
        <Link href="/contato" className="header-contact">
          Vamos conversar{" "}
          <span aria-hidden="true">
            <Icon direction="diagonal" />
          </span>
        </Link>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        id="mobile-menu"
        className="mobile-menu"
        ref={menu}
        onCancel={close}
        onClose={() => setOpen(false)}
        aria-label="Menu de navegação"
      >
        <div className="mobile-menu-top">
          <span>EBONY / NAVEGAÇÃO</span>
          <button onClick={close} aria-label="Fechar menu">
            Fechar{" "}
            <span aria-hidden="true">
              <Icon direction="close" />
            </span>
          </button>
        </div>
        <nav aria-label="Navegação móvel">
          {[
            ["/", "Início"],
            ...links,
            ["/para-corretores", "Para corretores"],
            ["/contato", "Contato"],
          ].map(([href, title], index) => (
            <Link href={href} onClick={close} key={href}>
              <span className="menu-number">0{index + 1}</span>
              {title}
              <span aria-hidden="true">
                <Icon direction="diagonal" />
              </span>
            </Link>
          ))}
        </nav>
        <p>Marcenaria sob medida · Brasília, DF</p>
      </dialog>
    </>
  );
}
