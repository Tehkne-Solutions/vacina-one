"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { popularVaccineLinks } from "@/lib/vacinaone-fallback-content";

export default function PopularVaccines() {
  return (
    <motion.section
      className="w-full bg-[#56B0BB] py-[clamp(72px,8vw,170px)] font-franie 2xl:min-h-[1076px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
    >
      <div className="mx-auto w-[85%] max-w-[1597px]">
        <motion.div className="mx-auto flex max-w-[796px] flex-col items-center gap-5 text-center" variants={fadeUp}>
          <h2 className="text-[clamp(38px,3vw,52px)] font-bold leading-[118.52%] tracking-[-0.02em] text-white">
            Vacinas mais procuradas
          </h2>

          <p className="text-[clamp(16px,1.2vw,20px)] font-medium leading-[160.4%] tracking-[-0.02em] text-white">
            Encontre as principais vacinas para bebês, famílias, idosos, gestantes, viajantes e empresas.
          </p>
        </motion.div>

        <motion.div
          className="mt-[clamp(56px,6vw,110px)] grid grid-cols-1 gap-x-[24px] gap-y-[18px] lg:grid-cols-2"
          variants={staggerContainer}
        >
          {popularVaccineLinks.map((vaccine) => (
            <motion.article
              key={vaccine.slug}
              className="group flex min-h-[76px] overflow-hidden rounded-[18px] border border-white bg-transparent transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(26,56,88,0.18)] max-sm:flex-col md:min-h-[88px]"
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <a
                href={`/vacinas/${vaccine.slug}`}
                className="flex min-w-0 flex-1 items-center px-[clamp(20px,1.8vw,34px)] max-sm:min-h-[64px]"
              >
                <h3 className="text-[clamp(18px,1.4vw,24px)] font-bold leading-[120%] tracking-[-0.02em] text-white">
                  {vaccine.name}
                </h3>
              </a>

              <a
                href={getWhatsAppHref(`Olá! Vim pelo site da VacinaOne e quero agendar a vacina ${vaccine.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Agendar vacinação para ${vaccine.name}`}
                className="flex w-[40%] min-w-[170px] items-center justify-center rounded-[18px] bg-[#1A3858] px-4 text-[clamp(14px,1vw,18px)] font-medium leading-[120%] tracking-[-0.02em] text-white transition duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.99] max-sm:h-[58px] max-sm:w-full max-sm:min-w-0 max-sm:rounded-t-none"
              >
                Agendar
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
