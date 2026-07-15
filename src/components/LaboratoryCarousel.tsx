"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

const labs = [
  { name: 'Earth 2.0', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-earth-2.0.png', w: 150 },
  { name: 'Goldline', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-goldline.png', w: 150 },
  { name: 'Kanba', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-kanba.png', w: 128 },
  { name: 'Nirastate', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-nirastate.png', w: 170 },
  { name: 'Solaytic', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-solaytic.png', w: 120 },
];

const STRIP_WIDTH = 998;
const STEP = 220;

export default function LaboratoryCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const xRef = useRef(0);

  const startLoop = () => {
    controls.start({
      x: [xRef.current, xRef.current - STRIP_WIDTH],
      transition: { duration: 22, ease: 'linear', repeat: Infinity },
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
    <div className="flex w-full flex-col gap-5 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-black tracking-[-0.02em] text-vacina-dark md:text-[19px]">
          Conectados pela Saúde e Prevenção
        </h2>
        <div className="hidden gap-2 md:flex">
          <button
            onClick={handlePrev}
            aria-label="Anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-vacina-teal text-lg text-white transition hover:brightness-110 active:scale-90"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            aria-label="Próximo"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-vacina-dark text-lg text-white transition hover:brightness-110 active:scale-90"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div
        className="relative h-8 w-full cursor-grab overflow-hidden active:cursor-grabbing md:h-[42px]"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
      >
        <motion.div
          className="absolute left-0 top-0 flex items-center gap-12 md:gap-[68px]"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -STRIP_WIDTH * 2, right: 0 }}
        >
          {[...labs, ...labs, ...labs, ...labs].map((lab, i) => (
            <div
              key={i}
              className="relative h-7 flex-shrink-0 md:h-[42px]"
              style={{ width: `${lab.w}px` }}
            >
              <Image
                src={lab.src}
                alt={lab.name}
                fill
                className="object-contain opacity-55 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
