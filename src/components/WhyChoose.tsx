import Image from "next/image";

const features = [
  {
    icon: "/images/vacina-one-homepage-por-que-escolher-vacinaone-icone-atendimento-humanizado.svg",
    titleLines: ["Atendimento", "humanizado"],
    descriptionLines: ["Ouvir, acolher e", "acompanhar. É assim", "que a gente trabalha na", "VacinaOne."],
  },
  {
    icon: "/images/vacina-one-homepage-por-que-escolher-vacinaone-icone-ambiente-seguro-e-acolhedor.svg",
    titleLines: ["Ambiente seguro", "e acolhedor"],
    descriptionLines: ["Espaço futurista e", "minimalista, com", "elementos pensados", "para deixar crianças e", "famílias à vontade."],
  },
  {
    icon: "/images/vacina-one-homepage-por-que-escolher-vacinaone-icone-vacinas-certificadas-e-aprovadas.svg",
    titleLines: ["Vacinas certificadas", "e aprovadas"],
    descriptionLines: ["Todas as vacinas são", "aprovadas pela Anvisa,", "com controle rigoroso", "de qualidade e cadeia", "de frio."],
  },
  {
    icon: "/images/vacina-one-homepage-por-que-escolher-vacinaone-icone-tecnologia-e-conforto.svg",
    titleLines: ["Tecnologia e", "conforto"],
    descriptionLines: ["Amenizadores de dor,", "óculos de realidade", "virtual e agendamento", "sem espera."],
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-vacina-dark py-[70px] font-franie text-white md:py-[86px] xl:py-[96px] 2xl:py-[108px]">
      <div className="mx-auto w-[90%] max-w-[1640px]">
        <div className="mx-auto text-center">
          <h2 className="text-[clamp(34px,3.35vw,64px)] font-black leading-[1.02] text-white md:whitespace-nowrap">
            <span className="text-vacina-teal">Por que escolher a</span>{" "}
            <span>VacinaOne?</span>
          </h2>
          <p className="mx-auto mt-[22px] max-w-[760px] text-[clamp(17px,1.35vw,25px)] font-medium leading-[1.18] text-white">
            A VacinaOne nasceu para que cuidar da saúde da sua familia seja uma
            <br className="hidden md:block" />
            experiência que você queira repetir.
          </p>
        </div>

        <div className="mt-[62px] grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:mt-[74px] xl:gap-12 2xl:gap-16">
          {features.map((feature) => (
            <article key={feature.titleLines.join(" ")} className="flex flex-col items-center text-center">
              <Image
                src={feature.icon}
                alt=""
                width={112}
                height={112}
                className="h-[clamp(76px,5.84vw,112px)] w-[clamp(76px,5.84vw,112px)]"
              />
              <h3 className="mt-[28px] text-[clamp(25px,1.95vw,38px)] font-black leading-[0.9] text-vacina-teal">
                {feature.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-[22px] text-[clamp(17px,1.35vw,26px)] font-medium leading-[1.12] text-white">
                {feature.descriptionLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
