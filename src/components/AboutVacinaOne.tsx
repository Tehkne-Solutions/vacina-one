import Image from "next/image";

const aboutItems = [
  {
    title: "Clínica premium em Campinas",
    description:
      "Localizada no Taquaral, pertinho do Mansões Santo Antônio, com estacionamento gratuito e fácil acesso para toda a família.",
  },
  {
    title: "Para todas as idades",
    description:
      "Atendemos desde os primeiros meses de vida até a melhor idade, com protocolos específicos e atenção dedicada em cada etapa.",
  },
  {
    title: "Soluções para empresas e instituições",
    description:
      "Campanhas corporativas para empresas, escolas, condomínios e casas de repouso. A VacinaOne vai até onde o cuidado é necessário.",
  },
  {
    title: "Vacinas para viagens",
    description:
      "Vai viajar? A gente cuida do seu calendário vacinal completo para que você aproveite cada destino com segurança.",
  },
];

export default function AboutVacinaOne() {
  return (
    <section className="w-full bg-white py-[clamp(56px,6vw,110px)] font-franie">
      <div className="mx-auto grid w-[90%] max-w-[1500px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-16 2xl:gap-20">
        <div className="max-w-[720px]">
          <h2 className="mb-5 text-[clamp(34px,3vw,48px)] font-black leading-[1.08] tracking-[-0.03em] text-[#1A3858]">
            Sobre a VacinaOne
          </h2>

          <div className="space-y-6 text-[clamp(16px,1.1vw,19px)] font-medium leading-[1.45] tracking-[-0.02em] text-[#5A5A5A]">
            <p>
              A VacinaOne nasceu para transformar a experiência de vacinação em algo seguro, acolhedor e inovador. Com sede em
              Campinas, no bairro Taquaral, oferecemos um espaço futurista com ambientes minimalistas, tecnologia de ponta e um
              atendimento profundamente humanizado.
            </p>

            <p>
              Inspirada em conceitos montessorianos, acreditamos que o cuidado começa no ambiente. Por isso, nosso espaço foi
              criado para transmitir tranquilidade, clareza e confiança para toda a sua família.
            </p>
          </div>

          <div className="mt-10">
            {aboutItems.map((item, index) => (
              <div
                key={item.title}
                className={`py-5 ${index !== aboutItems.length - 1 ? "border-b border-[#EAF4EB]" : ""}`}
              >
                <h3 className="mb-2 inline-block bg-[#56B0BB] px-1.5 py-0.5 text-[clamp(17px,1.2vw,21px)] font-black leading-none tracking-[-0.02em] text-[#1A3858]">
                  {item.title}
                </h3>

                <p className="text-[clamp(15px,1.05vw,18px)] font-medium leading-[1.45] tracking-[-0.02em] text-[#5A5A5A]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative aspect-[0.82] w-full max-w-[520px] sm:max-w-[600px] lg:max-w-[610px] xl:max-w-[680px]">
            <Image
              src="/images/vacina-one-homepage-sobre-a-vacina-one-imagem-mascote.png"
              alt="Mascote VacinaOne"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1360px) 45vw, 680px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
