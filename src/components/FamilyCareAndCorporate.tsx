"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import FamilyCareCarousel from "@/components/FamilyCareCarousel";

export default function FamilyCareAndCorporate() {
  return (
    <motion.section
      className="w-full bg-white py-[clamp(64px,7vw,130px)] font-franie"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
    >
      <div className="mx-auto w-[85%] max-w-[1597px]">
        <motion.div className="text-center" variants={fadeUp}>
          <h2 className="text-[clamp(34px,3vw,52px)] font-black leading-[1.12] tracking-[-0.03em] text-[#1A3858]">
            Acesse o cuidado para toda a família
          </h2>

          <p className="mt-3 text-[clamp(15px,1.1vw,20px)] font-medium leading-[160%] tracking-[-0.02em] text-[#5A5A5A]">
            Somos especializados em atendimento infantil e adulto
          </p>
        </motion.div>

        <FamilyCareCarousel />

        <div className="grid items-center gap-[clamp(48px,7vw,120px)] pt-[clamp(90px,10vw,170px)] lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div variants={fadeUp} className="max-w-none lg:max-w-[620px]">
            <h2 className="text-[clamp(34px,3vw,52px)] font-black leading-[1.02] tracking-[-0.03em] text-[#1A3858]">
              Vacinação para
              <br />
              <span className="text-[#F0B954]">empresas</span>
            </h2>

            <div className="mt-10 space-y-7 text-[15px] font-medium leading-[1.5] tracking-[-0.02em] text-[#5A5A5A] sm:text-[16px] lg:text-[clamp(16px,1.1vw,20px)] lg:leading-[1.35]">
              <p>
                O agendamento é rápido, organizado e sem espera. Escolha o horário que for melhor para você e apareça, a gente
                cuida do resto.
              </p>

              <p>
                Tem dúvidas sobre qual vacina tomar, quando reforçar ou como funciona a vacinação para a sua empresa? Nossa equipe
                está pronta para te orientar antes mesmo de você marcar um horário.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex h-[48px] w-full items-center justify-center rounded-full bg-[#56B0BB] px-8 text-[clamp(15px,1vw,18px)] font-bold tracking-[-0.02em] text-white transition hover:scale-[1.02] hover:brightness-105 sm:w-auto sm:h-[50px]"
              >
                Agendar Vacinação
              </a>

              <a
                href="#"
                className="inline-flex h-[48px] w-full items-center justify-center rounded-full bg-[#F0B954] px-8 text-[clamp(15px,1vw,18px)] font-bold tracking-[-0.02em] text-white transition hover:scale-[1.02] hover:brightness-105 sm:w-auto sm:h-[50px]"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative aspect-[1.18] w-full overflow-hidden">
            <Image
              src="/images/vacina-one-homepage-vacinacao-para-empresas-imagem-destaque.png"
              alt="Pessoa recebendo vacinação"
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1360px) 44vw, 720px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
