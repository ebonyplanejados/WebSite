import { Icon } from "@/components/icon";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className={`project-card card-${index % 2}`}
    >
      <div className="project-image">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
        />
        <span className="project-open" aria-hidden="true">
          <Icon direction="diagonal" />
        </span>
      </div>
      <div className="project-info">
        <div>
          <p className="eyebrow">
            {project.category} <span>— Marcenaria sob medida</span>
          </p>
          <h3>{project.title}</h3>
        </div>
        <span className="project-index" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
    </Link>
  );
}
