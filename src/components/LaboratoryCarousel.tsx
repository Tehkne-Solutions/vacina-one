"use client";

import Image from 'next/image';

const labs = [
  { name: 'Earth 2.0', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-earth-2.0.png', w: 218 },
  { name: 'Goldline', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-goldline.png', w: 223 },
  { name: 'Kanba', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-kanba.png', w: 187 },
  { name: 'Nirastate', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-nirastate.png', w: 257 },
  { name: 'Solaytic', src: '/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-solaytic.png', w: 162 },
];

export default function LaboratoryCarousel() {
  return (
    <div className="w-full flex flex-col gap-[50px]">
      {/* Header do carrossel */}
      <div className="flex items-center justify-between h-[56px]">
        <h2 className="text-vacina-dark text-[22px] font-medium tracking-[-0.02em]">
          Marcas dos laborat&#243;rios
        </h2>
        <div className="flex gap-[15px]">
          <button
            aria-label="Anterior"
            className="w-[56px] h-[56px] rounded-full bg-vacina-teal flex items-center justify-center hover:opacity-80 transition"
          >
            <span className="text-white text-xl leading-none">&#8592;</span>
          </button>
          <button
            aria-label="Proximo"
            className="w-[56px] h-[56px] rounded-full bg-vacina-dark flex items-center justify-center hover:opacity-80 transition"
          >
            <span className="text-white text-xl leading-none">&#8594;</span>
          </button>
        </div>
      </div>

      {/* Logos — gap 136px, altura 52px, opacidade 75% */}
      <div className="flex items-center gap-[136px] opacity-75">
        {labs.map((lab) => (
          <div key={lab.name} className="relative h-[52px] flex-shrink-0" style={{ width: `${lab.w}px` }}>
            <Image src={lab.src} alt={lab.name} fill className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
