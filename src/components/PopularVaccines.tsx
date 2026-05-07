"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const vaccines = [
  "Gripe (Influenza)",
  "Febre Amarela",
  "Meningocócica B",
  "Hexavalente",
  "Pneumocócica 13",
  "HPV",
];

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
            We work with doctors who are specialist in their fields to help you
          </p>
        </motion.div>

        <motion.div
          className="mt-[clamp(72px,7vw,140px)] grid grid-cols-1 gap-x-[33px] gap-y-[clamp(24px,2.5vw,46px)] lg:grid-cols-2"
          variants={staggerContainer}
        >
          {vaccines.map((vaccine) => (
            <motion.article
              key={vaccine}
              className="group flex min-h-[92px] overflow-hidden rounded-[20px] border border-white bg-transparent transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(26,56,88,0.18)] max-sm:flex-col md:min-h-[108px]"
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex min-w-0 flex-1 items-center px-[clamp(22px,2vw,40px)] max-sm:min-h-[72px]">
                <h3 className="text-[clamp(20px,1.6vw,28px)] font-bold leading-[120%] tracking-[-0.02em] text-white">
                  {vaccine}
                </h3>
              </div>

              <button
                type="button"
                aria-label={`Agendar vacinação para ${vaccine}`}
                className="flex w-[44%] min-w-[190px] items-center justify-center rounded-[20px] bg-[#1A3858] px-4 text-[clamp(16px,1.4vw,25px)] font-medium leading-[120%] tracking-[-0.02em] text-white transition duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.99] max-sm:h-[68px] max-sm:w-full max-sm:min-w-0 max-sm:rounded-t-none"
              >
                Agendar Vacinação
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
