import { Icon } from "@/components/icon";
import Link from "next/link";
import Image from "next/image";
import { site, whatsapp } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main wrap">
        <div className="footer-brand">
          <Link href="/" aria-label="Ebony — início">
            <Image
              src="/brand/ebony.png"
              alt="Ebony Ambientes Planejados"
              width={240}
              height={92}
            />
          </Link>
          <p>
            O cuidado está nos detalhes.
            <br />A identidade, em cada ambiente.
          </p>
          <span className="eyebrow">Brasília · Distrito Federal</span>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/projetos">Projetos</Link>
          <Link href="/solucoes">Soluções</Link>
          <Link href="/o-atelier">O Ateliê</Link>
        </div>
        <div>
          <h2>Conexões</h2>
          <Link href="/para-arquitetos">Arquitetos e designers</Link>
          <Link href="/para-corretores">Corretores e imobiliárias</Link>
          <Link href="/contato">Solicitar orçamento</Link>
        </div>
        <div>
          <h2>Converse com a Ebony</h2>
          <a href={whatsapp()} target="_blank" rel="noreferrer">
            {site.phone} <Icon direction="diagonal" />
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram <Icon direction="diagonal" />
          </a>
          <p>Atendimento mediante agendamento.</p>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} Ebony Ambientes Planejados</span>
        <span>Onde o traço encontra a matéria.</span>
        <Link href="/privacidade">Privacidade</Link>
      </div>
    </footer>
  );
}
