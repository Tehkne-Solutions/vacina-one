"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

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
    <motion.section
      className="bg-vacina-dark py-12 font-franie text-white md:py-14 xl:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <div className="mx-auto w-[85%] max-w-[1500px]">
        <motion.div className="mx-auto text-center" variants={fadeUp}>
          <h2 className="text-[clamp(30px,2.6vw,44px)] font-black leading-[1.04] text-white md:whitespace-nowrap">
            <span className="text-vacina-teal">Por que escolher a</span>{" "}
            <span>VacinaOne?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-[clamp(15px,1vw,17px)] font-medium leading-[1.35] text-white/92">
            A VacinaOne nasceu para que cuidar da saúde da sua família seja uma experiência que você queira repetir.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8"
          variants={staggerContainer}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.titleLines.join(" ")}
              className="flex flex-col items-center text-center"
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                <Image
                  src={feature.icon}
                  alt=""
                  width={72}
                  height={72}
                  className="h-[clamp(54px,3.8vw,72px)] w-[clamp(54px,3.8vw,72px)]"
                />
              </motion.div>
              <h3 className="mt-5 text-[clamp(20px,1.45vw,28px)] font-bold leading-[1.08] text-vacina-teal">
                {feature.titleLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </h3>
              <p className="mt-4 text-[clamp(14px,0.9vw,17px)] font-normal leading-[1.35] text-white/92">
                {feature.descriptionLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
