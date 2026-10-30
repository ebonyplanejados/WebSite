import { Icon } from "@/components/icon";
import Link from "next/link";
export default function NotFound() {
  return (
    <section className="not-found wrap">
      <p className="eyebrow">404 · Um caminho diferente</p>
      <h1>
        Vamos voltar
        <br />
        ao essencial.
      </h1>
      <p>
        Não encontramos esta página. Explore o portfólio ou converse com a
        Ebony.
      </p>
      <Link className="button button-dark" href="/projetos">
        Explorar projetos{" "}
        <span aria-hidden="true">
          <Icon direction="diagonal" />
        </span>
      </Link>
    </section>
  );
}
