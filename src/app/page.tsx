import { Icon } from "@/components/icon";
import Link from "next/link";
import Image from "next/image";
import { Eyebrow, TextLink, Conversion } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/projects";
import { solutions } from "@/content/solutions";
import { site } from "@/lib/site";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            logo: new URL("/brand/ebony.png", site.url).href,
            telephone: "+5561985291277",
            sameAs: [site.instagram],
            areaServed: "Brasília, Distrito Federal",
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="hero-visual">
          <Image
            src="/images/interior-comercial.webp"
            alt="Ambiente comercial do portfólio Ebony, com marcenaria e balcão sob medida"
            fill
            priority
            sizes="100vw"
            className="hero-photo"
          />
          <div className="hero-shade" />
        </div>
        <div className="hero-content wrap">
          <Eyebrow>Ebony · Ambientes Planejados · Brasília</Eyebrow>
          <h1 id="hero-title">
            Onde o traço
            <br />
            encontra a <em>matéria.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Marcenaria sob medida. Precisão técnica,
              <br className="desktop-break" /> sensibilidade e respeito a cada
              intenção.
            </p>
            <Link href="/projetos" className="hero-cta">
              Explorar projetos{" "}
              <span className="circle-arrow" aria-hidden="true">
                <Icon direction="diagonal" />
              </span>
            </Link>
          </div>
        </div>
        <div className="hero-caption">
          <span>01 / 04</span>
          <span>Uma seleção do nosso portfólio</span>
          <a href="#manifesto" aria-label="Rolar para o manifesto">
            Explore{" "}
            <span aria-hidden="true">
              <Icon direction="down" />
            </span>
          </a>
        </div>
      </section>
      <section id="manifesto" className="manifesto wrap">
        <div className="section-label">
          <span className="section-index">01 — A ESSÊNCIA</span>
          <span className="small-line" />
        </div>
        <div className="manifesto-main">
          <Eyebrow>Da intenção à execução</Eyebrow>
          <h2>
            Mais do que executar.
            <br />
            <span>Interpretar intenções.</span>
          </h2>
          <div className="manifesto-copy">
            <p>
              Por trás de cada linha, existe uma forma de viver. Um gesto, uma
              escolha, uma intenção que merece ser preservada.
            </p>
            <div>
              <p>
                Somos a extensão desse traço. Unimos rigor técnico e cuidado
                artesanal para materializar ambientes sob medida, com atenção à
                matéria-prima e a cada detalhe do acabamento.
              </p>
              <TextLink href="/o-atelier">Conheça o Ateliê</TextLink>
            </div>
          </div>
        </div>
        <div className="material-signature" aria-hidden="true">
          <span>TRAÇO</span>
          <i />
          <span>MATÉRIA</span>
        </div>
      </section>
      <section className="selected-projects wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>02 — Ambientes em perspectiva</Eyebrow>
            <h2>
              O detalhe faz
              <br />
              parte do todo.
            </h2>
          </div>
          <TextLink href="/projetos">Todos os projetos</TextLink>
        </div>
        <div className="project-grid">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
        <p className="portfolio-caption">
          Ambientes do portfólio institucional. Marcenaria Ebony; autoria
          arquitetônica preservada.
        </p>
      </section>
      <section className="solutions-home dark-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>03 — Soluções sob medida</Eyebrow>
              <h2>
                Diferentes espaços.
                <br />O mesmo cuidado.
              </h2>
            </div>
            <p>
              Uma execução atenta à identidade
              <br />e às necessidades de cada projeto.
            </p>
          </div>
          <div className="solution-rows">
            {solutions.map((s) => (
              <Link
                key={s.slug}
                href={`/solucoes/${s.slug}`}
                className="solution-row"
              >
                <span className="solution-num">{s.number}</span>
                <h3>{s.title}</h3>
                <p>{s.phrase}</p>
                <span className="circle-arrow" aria-hidden="true">
                  <Icon direction="diagonal" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="process-home wrap">
        <div className="process-photo">
          <Image
            src="/images/estantes-curvas.webp"
            alt="Curvas e iluminação no mobiliário apresentado no portfólio Ebony"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span>O encontro entre a forma e a função.</span>
        </div>
        <div className="process-copy">
          <Eyebrow>04 — O rigor por trás da forma</Eyebrow>
          <h2>
            A diferença está
            <br />
            no que se observa
            <br />
            <span>de perto.</span>
          </h2>
          <p>
            Da escolha dos materiais ao ajuste final, cada decisão faz parte da
            entrega. O processo começa na escuta e continua no detalhamento, na
            fabricação e na montagem.
          </p>
          <div className="process-tags">
            <span>Matéria-prima</span>
            <span>Precisão</span>
            <span>Acabamento</span>
          </div>
          <TextLink href="/o-atelier#processo">Nosso processo</TextLink>
        </div>
      </section>
      <section className="architects-home">
        <div className="architects-image">
          <Image
            src="/images/cafe-marcenaria.webp"
            alt="Marcenaria de balcão e nichos em um espaço comercial"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
        <div className="architects-copy">
          <Eyebrow>Para arquitetos e designers</Eyebrow>
          <h2>
            Seu traço merece
            <br />
            uma execução
            <br />à altura.
          </h2>
          <p>
            Apoio técnico, diálogo e respeito à autoria. Uma parceria para
            aproximar a intenção criativa das possibilidades da matéria.
          </p>
          <TextLink href="/para-arquitetos">Construir uma parceria</TextLink>
        </div>
      </section>
      <section className="guarantee wrap">
        <div className="guarantee-number">
          5<span>ANOS DE GARANTIA</span>
        </div>
        <div>
          <Eyebrow>Cuidado que permanece</Eyebrow>
          <h2>Confiança em cada entrega.</h2>
          <p>
            O portfólio Ebony apresenta cinco anos de garantia. A cobertura, os
            cuidados de uso e as condições aplicáveis são definidos em contrato.
          </p>
          <TextLink href="/contato?assunto=garantia">
            Converse sobre as condições
          </TextLink>
        </div>
      </section>
      <Conversion />
    </>
  );
}
