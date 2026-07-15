"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, slideFromRight, staggerContainer } from "@/lib/animations";

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
    <motion.section
      id="sobre"
      className="w-full bg-white py-[clamp(48px,5vw,82px)] font-franie"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
    >
      <div className="mx-auto grid w-[85%] max-w-[1420px] grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.92fr] xl:gap-12">
        <motion.div className="max-w-[680px]" variants={staggerContainer}>
          <motion.h2 className="mb-4 text-[clamp(30px,2.7vw,42px)] font-black leading-[1.08] tracking-[-0.03em] text-[#1A3858]" variants={fadeUp}>
            Sobre a VacinaOne
          </motion.h2>

          <motion.div className="space-y-4 text-[clamp(15px,1vw,17px)] font-medium leading-[1.5] tracking-[-0.02em] text-[#5A5A5A]" variants={fadeUp}>
            <p>
              A VacinaOne nasceu para transformar a experiência de vacinação em algo seguro, acolhedor e inovador. Com sede em
              Campinas, no bairro Taquaral, oferecemos um espaço futurista com ambientes minimalistas, tecnologia de ponta e um
              atendimento profundamente humanizado.
            </p>

            <p>
              Inspirada em conceitos montessorianos, acreditamos que o cuidado começa no ambiente. Por isso, nosso espaço foi
              criado para transmitir tranquilidade, clareza e confiança para toda a sua família.
            </p>
          </motion.div>

          <motion.div className="mt-7" variants={staggerContainer}>
            {aboutItems.map((item, index) => (
              <motion.div
                key={item.title}
                className={`py-4 ${index !== aboutItems.length - 1 ? "border-b border-[#EAF4EB]" : ""}`}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <h3 className="mb-2 inline-block bg-[#56B0BB] px-1.5 py-0.5 text-[clamp(16px,1.05vw,19px)] font-black leading-none tracking-[-0.02em] text-[#1A3858]">
                  {item.title}
                </h3>

                <p className="text-[clamp(14px,0.95vw,16px)] font-medium leading-[1.45] tracking-[-0.02em] text-[#5A5A5A]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="flex justify-center lg:justify-end" variants={slideFromRight}>
          <div className="relative aspect-[0.82] w-full max-w-[500px] transition-transform duration-300 hover:scale-[1.01] sm:max-w-[560px] lg:max-w-[600px] xl:max-w-[650px]">
            <Image
              src="/images/vacina-one-homepage-sobre-a-vacina-one-imagem-mascote.png"
              alt="Mascote VacinaOne"
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1360px) 42vw, 650px"
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
