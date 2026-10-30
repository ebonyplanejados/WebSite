"use client";
import { Icon } from "@/components/icon";
import { useState } from "react";
import { categories, filterProjects, type Category } from "@/content/projects";
import { ProjectCard } from "./project-card";
import Link from "next/link";
export function Portfolio() {
  const [active, setActive] = useState<Category>("Todos");
  const selected = filterProjects(active);
  return (
    <section className="wrap portfolio">
      <div
        className="filter-row"
        role="group"
        aria-label="Filtrar projetos por categoria"
      >
        {categories.map((category) => (
          <button
            key={category}
            aria-pressed={active === category}
            onClick={() => setActive(category)}
          >
            {category}
            {active === category && (
              <span aria-hidden="true">
                {" "}
                · {selected.length.toString().padStart(2, "0")}
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {selected.length} ambientes na categoria {active}.
      </p>
      {selected.length ? (
        <div className="project-grid">
          {selected.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="eyebrow">Um novo olhar, em breve</p>
          <h2>O próximo ambiente pode ser o seu.</h2>
          <p>
            Estamos preparando esta seleção. Enquanto isso, converse com a
            equipe sobre soluções para o seu projeto.
          </p>
          <Link href="/contato?tipo=corporativo" className="text-link">
            Conversar sobre meu projeto{" "}
            <span aria-hidden="true">
              <Icon direction="diagonal" />
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
