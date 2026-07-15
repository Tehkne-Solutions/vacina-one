"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { getWhatsAppHref } from "@/lib/whatsapp";

const popularVaccines = [
  { name: "Pneumocócica conjugada 13, 15 e 20", slug: "pneumococica-conjugada-13-15-e-20" },
  { name: "Herpes-zóster", slug: "herpes-zoster" },
  { name: "Meningocócica B", slug: "meningococica-b" },
  { name: "Meningocócica ACWY", slug: "meningococica-acwy" },
  { name: "Dengue (Qdenga)", slug: "dengue-qdenga" },
  { name: "Hexavalente", slug: "hexavalente" },
  { name: "dTpa", slug: "dtpa" },
  { name: "HPV 9", slug: "hpv-9" },
  { name: "Hepatite A", slug: "hepatite-a" },
  { name: "Influenza", slug: "influenza" },
  { name: "Tríplice Viral", slug: "triplice-viral" },
  { name: "Pneumocócica polissacarídica 23 (VPP23)", slug: "pneumococica-polissacaridica-23-vpp23" },
  { name: "Varicela", slug: "varicela" },
  { name: "Hepatite A + B", slug: "hepatite-a-e-b" },
];

export default function PopularVaccines() {
  return (
    <motion.section
      className="w-full bg-[#56B0BB] py-[clamp(56px,6vw,100px)] font-franie"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
    >
      <div className="mx-auto w-[85%] max-w-[1500px]">
        <motion.div className="mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center" variants={fadeUp}>
          <h2 className="text-[clamp(32px,2.7vw,46px)] font-bold leading-[1.12] tracking-[-0.02em] text-white">
            Vacinas mais procuradas
          </h2>

          <p className="text-[clamp(15px,1vw,17px)] font-medium leading-[1.5] tracking-[-0.02em] text-white">
            Encontre as principais vacinas para bebês, famílias, idosos, gestantes, viajantes e empresas.
          </p>
        </motion.div>

        <motion.div
          className="mt-[clamp(38px,4vw,62px)] grid grid-cols-1 gap-x-5 gap-y-3 lg:grid-cols-2"
          variants={staggerContainer}
        >
          {popularVaccines.map((vaccine) => (
            <motion.article
              key={vaccine.slug}
              className="group flex min-h-[68px] overflow-hidden rounded-[16px] border border-white/85 bg-transparent transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(26,56,88,0.16)] max-sm:flex-col md:min-h-[76px]"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <a
                href={`/vacinas/${vaccine.slug}`}
                className="flex min-w-0 flex-1 items-center px-[clamp(18px,1.5vw,28px)] max-sm:min-h-[58px]"
              >
                <h3 className="text-[clamp(16px,1.15vw,20px)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                  {vaccine.name}
                </h3>
              </a>

              <a
                href={getWhatsAppHref(`Olá! Vim pelo site da VacinaOne e quero agendar a vacina ${vaccine.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Agendar vacinação para ${vaccine.name}`}
                className="flex w-[34%] min-w-[150px] items-center justify-center rounded-[14px] bg-[#FFB703] px-4 text-[14px] font-black leading-[1.2] tracking-[-0.02em] text-[#1A3858] transition duration-300 hover:brightness-105 active:scale-[0.99] max-sm:h-[50px] max-sm:w-full max-sm:min-w-0 max-sm:rounded-t-none"
              >
                Agendar vacina
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
