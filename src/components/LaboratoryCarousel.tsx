"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const labs = [
  { name: 'Earth 2.0', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-earth-2.0.png', w: 218 },
  { name: 'Goldline', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-goldline.png', w: 223 },
  { name: 'Kanba', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-kanba.png', w: 187 },
  { name: 'Nirastate', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-nirastate.png', w: 257 },
  { name: 'Solaytic', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-solaytic.png', w: 162 },
];

// Largura de um logo medio para o passo de cada clique
const STEP = 323; // ~(218+223+187+257+162)/5 + gap 100

export default function LaboratoryCarousel() {
  const [offset, setOffset] = useState(0);

  const handleNext = () => setOffset((prev) => prev - STEP);
  const handlePrev = () => setOffset((prev) => (prev < 0 ? prev + STEP : 0));

  return (
    <div className="w-full flex flex-col gap-[35px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-vacina-dark text-[22px] font-bold tracking-[-0.02em]">
          Marcas dos laborat&#243;rios
        </h2>
        <div className="flex gap-[12px]">
          <button
            onClick={handlePrev}
            aria-label="Anterior"
            className="w-[56px] h-[56px] rounded-full bg-vacina-teal flex items-center justify-center text-white text-2xl hover:brightness-110 active:scale-95 transition"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            aria-label="Proximo"
            className="w-[56px] h-[56px] rounded-full bg-vacina-dark flex items-center justify-center text-white text-2xl hover:brightness-110 active:scale-95 transition"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Faixa de logos */}
      <div className="relative overflow-hidden w-full h-[52px]">
        <motion.div
          className="flex items-center gap-[100px] absolute top-0 left-0"
          animate={{ x: offset }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
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
                className="object-contain opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
