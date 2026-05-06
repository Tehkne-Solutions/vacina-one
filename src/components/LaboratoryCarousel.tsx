"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

const labs = [
  { name: 'Earth 2.0', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-earth-2.0.png', w: 180 },
  { name: 'Goldline', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-goldline.png', w: 180 },
  { name: 'Kanba', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-kanba.png', w: 150 },
  { name: 'Nirastate', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-nirastate.png', w: 200 },
  { name: 'Solaytic', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-solaytic.png', w: 140 },
];

// Largura total de uma passagem: 180+180+150+200+140 + (4 gaps x 80) = 1170px
const STRIP_WIDTH = 1170;
const STEP = 260;

export default function LaboratoryCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const xRef = useRef(0);

  const startLoop = () => {
    controls.start({
      x: [xRef.current, xRef.current - STRIP_WIDTH],
      transition: { duration: 20, ease: 'linear', repeat: Infinity },
    });
  };

  useEffect(() => {
    startLoop();
  }, []);

  const handlePause = () => { setIsPaused(true); controls.stop(); };
  const handleResume = () => { setIsPaused(false); startLoop(); };

  const handleNext = () => {
    xRef.current -= STEP;
    controls.stop();
    controls.start({ x: xRef.current, transition: { type: 'spring', stiffness: 300, damping: 30 } })
      .then(() => { if (!isPaused) startLoop(); });
  };

  const handlePrev = () => {
    xRef.current = Math.min(xRef.current + STEP, 0);
    controls.stop();
    controls.start({ x: xRef.current, transition: { type: 'spring', stiffness: 300, damping: 30 } })
      .then(() => { if (!isPaused) startLoop(); });
  };

  return (
    <div className="w-full flex flex-col gap-8 md:gap-[35px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-vacina-dark text-xl md:text-[22px] font-black tracking-[-0.02em]">
          Marcas dos laborat&#243;rios
        </h2>
        <div className="hidden md:flex gap-[12px]">
          <button
            onClick={handlePrev}
            aria-label="Anterior"
            className="w-[56px] h-[56px] rounded-full bg-vacina-teal flex items-center justify-center text-white text-2xl hover:brightness-110 active:scale-90 transition"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            aria-label="Proximo"
            className="w-[56px] h-[56px] rounded-full bg-vacina-dark flex items-center justify-center text-white text-2xl hover:brightness-110 active:scale-90 transition"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Faixa animada */}
      <div
        className="relative overflow-hidden w-full h-10 md:h-[52px] cursor-grab active:cursor-grabbing"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
      >
        <motion.div
          className="flex items-center gap-16 md:gap-[80px] absolute top-0 left-0"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -STRIP_WIDTH * 2, right: 0 }}
        >
          {[...labs, ...labs, ...labs, ...labs].map((lab, i) => (
            <div
              key={i}
              className="relative h-8 md:h-[52px] flex-shrink-0"
              style={{ width: `${lab.w}px` }}
            >
              <Image
                src={lab.src}
                alt={lab.name}
                fill
                className="object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
