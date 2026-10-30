export const site = {
  name: "Ebony Ambientes Planejados",
  description:
    "Marcenaria sob medida em Brasília. Precisão técnica, sensibilidade aos materiais e respeito à intenção de cada projeto.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  instagram: "https://www.instagram.com/ebony_planejados/",
  phone: "+55 61 98529-1277",
};

export function whatsapp(context = "orçamento") {
  const messages: Record<string, string> = {
    orçamento:
      "Olá, Ebony. Gostaria de conversar sobre um orçamento de marcenaria sob medida.",
    arquitetos:
      "Olá, Ebony. Sou profissional de arquitetura ou design e gostaria de conhecer as condições de parceria.",
    corretores:
      "Olá, Ebony. Gostaria de conversar sobre a parceria para corretores e imobiliárias.",
    comercial:
      "Olá, Ebony. Gostaria de conversar sobre marcenaria para um espaço comercial.",
    residencial:
      "Olá, Ebony. Gostaria de conversar sobre marcenaria residencial.",
    corporativo:
      "Olá, Ebony. Gostaria de conversar sobre mobiliário corporativo.",
  };
  return `https://wa.me/5561985291277?text=${encodeURIComponent(messages[context] || messages.orçamento)}`;
}
