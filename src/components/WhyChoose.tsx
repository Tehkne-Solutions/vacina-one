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
      className="bg-vacina-dark py-[70px] font-franie text-white md:py-[86px] xl:py-[96px] 2xl:py-[108px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <div className="mx-auto w-[85%] max-w-[1640px]">
        <motion.div className="mx-auto text-center" variants={fadeUp}>
          <h2 className="text-[clamp(34px,3.35vw,64px)] font-black leading-[1.02] text-white md:whitespace-nowrap">
            <span className="text-vacina-teal">Por que escolher a</span>{" "}
            <span>VacinaOne?</span>
          </h2>
          <p className="mx-auto mt-[22px] max-w-[760px] text-[clamp(17px,1.35vw,25px)] font-medium leading-[1.18] text-white">
            A VacinaOne nasceu para que cuidar da saúde da sua familia seja uma
            <br className="hidden md:block" />
            experiência que você queira repetir.
          </p>
        </motion.div>

        <motion.div
          className="mt-[62px] grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:mt-[74px] xl:gap-12 2xl:gap-16"
          variants={staggerContainer}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.titleLines.join(" ")}
              className="flex flex-col items-center text-center"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                <Image
                  src={feature.icon}
                  alt=""
                  width={112}
                  height={112}
                  className="h-[clamp(76px,5.84vw,112px)] w-[clamp(76px,5.84vw,112px)]"
                />
              </motion.div>
              <h3 className="mt-[28px] text-[clamp(24px,1.82vw,35px)] font-bold leading-[1.08] text-vacina-teal">
                {feature.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-[20px] text-[clamp(16px,1.2vw,23px)] font-normal leading-[1.24] text-white">
                {feature.descriptionLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
