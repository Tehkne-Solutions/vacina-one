"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const labs = [
  { name: 'Earth 2.0', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-earth-2.0.png', w: 218 },
  { name: 'Goldline', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-goldline.png', w: 223 },
  { name: 'Kanba', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-kanba.png', w: 187 },
  { name: 'Nirastate', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-nirastate.png', w: 257 },
  { name: 'Solaytic', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-solaytic.png', w: 162 },
];

// Largura total de uma passagem: soma das larguras + (5 gaps de 100px)
// 218+223+187+257+162 = 1047 + 500 = 1547px
const STRIP_WIDTH = 1547;

export default function LaboratoryCarousel() {
  return (
    <div className="w-full flex flex-col gap-[35px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-vacina-dark text-[22px] font-medium tracking-[-0.02em]">
          Marcas dos laborat&#243;rios
        </h2>
        <div className="flex gap-[12px]">
          <button
            aria-label="Anterior"
            className="w-[56px] h-[56px] rounded-full bg-vacina-teal flex items-center justify-center text-white text-2xl hover:opacity-90 transition"
          >
            &#8592;
          </button>
          <button
            aria-label="Proximo"
            className="w-[56px] h-[56px] rounded-full bg-vacina-dark flex items-center justify-center text-white text-2xl hover:opacity-90 transition"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Faixa animada */}
      <div className="relative overflow-hidden w-full h-[52px]">
        <motion.div
          className="flex items-center gap-[100px] absolute top-0 left-0"
          animate={{ x: [0, -STRIP_WIDTH] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {/* Três repetições garantem continuidade visual sem salto */}
          {[...labs, ...labs, ...labs].map((lab, i) => (
            <div
              key={i}
              className="relative h-[52px] flex-shrink-0"
              style={{ width: `${lab.w}px` }}
            >
              <Image
                src={lab.src}
                alt={lab.name}
                fill
                className="object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
