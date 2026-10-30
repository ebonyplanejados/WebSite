export const categories = [
  "Todos",
  "Residencial",
  "Comercial",
  "Corporativo",
] as const;
export type Category = (typeof categories)[number];
export type Project = {
  id: string;
  slug: string;
  title: string;
  category: Exclude<Category, "Todos">;
  description: string;
  image: string;
  alt: string;
  order: number;
  images: { src: string; alt: string }[];
  details: string[];
  architecture?: string;
  photography?: string;
  location?: string;
};

// Descriptive labels, not invented project names. Source: institutional portfolio.
// Architectural authorship, client identities and locations were not supplied.
export const projects: Project[] = [
  {
    id: "portfolio-60",
    slug: "espaco-comercial",
    title: "Formas de receber",
    category: "Comercial",
    order: 1,
    image: "/images/interior-comercial.webp",
    alt: "Interior comercial com balcão de atendimento, marcenaria clara e iluminação acolhedora",
    description:
      "Balcões, nichos e superfícies que organizam o atendimento e dão presença ao espaço. Uma seleção do portfólio institucional Ebony.",
    images: [
      {
        src: "/images/interior-comercial.webp",
        alt: "Vista do interior comercial e seu balcão",
      },
      {
        src: "/images/fachada-comercial.webp",
        alt: "Fachada do ambiente comercial apresentado no portfólio",
      },
    ],
    details: [
      "Integração da marcenaria à experiência do ambiente.",
      "Balcões e nichos como elementos de organização e identidade.",
      "O escopo e os acabamentos são definidos individualmente em cada proposta.",
    ],
  },
  {
    id: "portfolio-27",
    slug: "balcao-e-exposicao",
    title: "Entre encontros e detalhes",
    category: "Comercial",
    order: 2,
    image: "/images/cafe-marcenaria.webp",
    alt: "Balcão de madeira e composição de nichos iluminados em ambiente comercial",
    description:
      "O ritmo dos nichos e a continuidade do balcão aproximam exposição, atendimento e materialidade. Ambiente apresentado no portfólio Ebony.",
    images: [
      {
        src: "/images/cafe-marcenaria.webp",
        alt: "Composição de balcão e prateleiras com iluminação",
      },
    ],
    details: [
      "Marcenaria integrada à composição do espaço.",
      "Superfícies de apoio e exposição em uma mesma linguagem.",
      "Materiais específicos e créditos não informados no acervo recebido.",
    ],
  },
  {
    id: "portfolio-61",
    slug: "cozinha-sob-medida",
    title: "O essencial, em seu lugar",
    category: "Residencial",
    order: 3,
    image: "/images/cozinha-sob-medida.webp",
    alt: "Cozinha com armários claros, bancada e eletrodomésticos integrados",
    description:
      "Um olhar sobre o cotidiano: armazenamento, proporção e continuidade visual em uma cozinha sob medida do acervo institucional.",
    images: [
      {
        src: "/images/cozinha-sob-medida.webp",
        alt: "Armários e bancada de uma cozinha sob medida",
      },
    ],
    details: [
      "Organização dos volumes e do armazenamento.",
      "Integração entre áreas de uso e superfícies de apoio.",
      "Especificações de painéis e ferragens dependem do projeto contratado.",
    ],
  },
  {
    id: "portfolio-58",
    slug: "estantes-curvas",
    title: "A continuidade da curva",
    category: "Comercial",
    order: 4,
    image: "/images/estantes-curvas.webp",
    alt: "Estantes de desenho curvo com prateleiras iluminadas e tons de madeira",
    description:
      "Linhas curvas conduzem o olhar e criam uma composição contínua de exposição. Seleção visual do portfólio institucional.",
    images: [
      {
        src: "/images/estantes-curvas.webp",
        alt: "Detalhe das linhas curvas das prateleiras",
      },
    ],
    details: [
      "Geometria como parte da experiência do espaço.",
      "Composição de prateleiras e planos de fundo.",
      "Categoria editorial inferida pela função de exposição; confirmar ficha técnica antes do lançamento.",
    ],
  },
];

export function filterProjects(category: Category) {
  return projects
    .filter((p) => category === "Todos" || p.category === category)
    .sort((a, b) => a.order - b.order);
}
