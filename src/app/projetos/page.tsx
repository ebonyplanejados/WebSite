import type { Metadata } from "next";
import { PageIntro, Conversion } from "@/components/ui";
import { Portfolio } from "@/components/portfolio";
export const metadata: Metadata = {
  title: "Projetos de marcenaria sob medida",
  description:
    "Conheça a seleção de ambientes residenciais e comerciais do portfólio Ebony. Marcenaria que respeita a intenção de cada projeto.",
  alternates: { canonical: "/projetos" },
};
export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        label="Portfólio · Um olhar sobre a execução"
        title="A matéria ganha intenção."
      >
        <p>
          Ambientes que revelam possibilidades da marcenaria sob medida. Explore
          uma seleção do nosso portfólio institucional.
        </p>
      </PageIntro>
      <Portfolio />
      <Conversion />
    </>
  );
}
