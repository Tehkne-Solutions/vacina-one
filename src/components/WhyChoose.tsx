import Image from "next/image";

const features = [
  {
    icon: "/images/vacina-one-homepage-por-que-escolher-vacinaone-icone-atendimento-humanizado.svg",
    title: "Atendimento humanizado",
    description: "Ouvir, acolher e acompanhar. É assim que a gente trabalha na VacinaOne.",
  },
  {
    icon: "/images/vacina-one-homepage-por-que-escolher-vacinaone-icone-ambiente-seguro-e-acolhedor.svg",
    title: "Ambiente seguro e acolhedor",
    description: "Espaço futurista e minimalista, com elementos pensados para deixar crianças e famílias à vontade.",
  },
  {
    icon: "/images/vacina-one-homepage-por-que-escolher-vacinaone-icone-vacinas-certificadas-e-aprovadas.svg",
    title: "Vacinas certificadas e aprovadas",
    description: "Todas as vacinas são aprovadas pela Anvisa, com controle rigoroso de qualidade e cadeia de frio.",
  },
  {
    icon: "/images/vacina-one-homepage-por-que-escolher-vacinaone-icone-tecnologia-e-conforto.svg",
    title: "Tecnologia e conforto",
    description: "Amenizadores de dor, óculos de realidade virtual e agendamento sem espera.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-vacina-dark py-16 font-franie text-white md:py-20 xl:py-24">
      <div className="mx-auto w-[90%] max-w-[1440px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[34px] font-black leading-[1.12] text-white md:text-[44px] xl:text-[50px]">
            <span className="text-vacina-teal">Por que escolher a</span> VacinaOne?
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[16px] font-medium leading-[1.45] text-white md:text-[18px]">
            A VacinaOne nasceu para que cuidar da saúde da sua família seja uma experiência que você queira repetir.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 xl:mt-20">
          {features.map((feature) => (
            <article key={feature.title} className="flex flex-col items-center text-center">
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/90">
                <Image
                  src={feature.icon}
                  alt=""
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px]"
                />
              </div>
              <h3 className="mt-5 max-w-[230px] text-[24px] font-black leading-[0.98] text-vacina-teal md:text-[25px] xl:text-[27px]">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-[230px] text-[16px] font-medium leading-[1.35] text-white md:text-[17px]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
