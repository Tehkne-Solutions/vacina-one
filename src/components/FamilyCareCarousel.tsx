"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue, type AnimationPlaybackControls } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const familyCards = [
  {
    title: "bebê",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-bebe.svg",
    href: "/calendario/protecao-completa-para-bebes",
  },
  {
    title: "crianças",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-criancas.svg",
    href: "/calendario/vacinacao-escolar-para-criancas-e-adolescentes",
  },
  {
    title: "60+",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-60+.svg",
    href: "/calendario/protecao-para-50-e-idosos",
  },
  {
    title: "adultos",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-adultos.svg",
    href: "/calendario/vacinas-para-toda-a-familia",
  },
  {
    title: "gestante",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-gestantes.svg",
    href: "/calendario/vacinacao-para-gestantes",
  },
];

const AUTOPLAY_DURATION = 34;

function normalizeX(value: number, width: number) {
  if (!width) return value;
  const normalized = ((value % width) + width) % width;
  return normalized === 0 ? 0 : -normalized;
}

export default function FamilyCareCarousel() {
  const x = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const loopGroups = useMemo(() => [0, 1, 2], []);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const updateWidth = () => setGroupWidth(group.scrollWidth);
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(group);

    return () => resizeObserver.disconnect();
  }, []);

  const stopAutoplay = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
  }, []);

  const startAutoplay = useCallback(() => {
    if (!groupWidth || isPaused) return;

    stopAutoplay();
    const current = normalizeX(x.get(), groupWidth);
    x.set(current);

    controlsRef.current = animate(x, [current, current - groupWidth], {
      duration: AUTOPLAY_DURATION,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [groupWidth, isPaused, stopAutoplay, x]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const nudgeCarousel = (direction: "prev" | "next") => {
    if (!groupWidth) return;

    stopAutoplay();
    const cardStep = Math.min(Math.max(groupWidth / familyCards.length, 220), 300);
    const current = normalizeX(x.get(), groupWidth);
    const target = normalizeX(current + (direction === "next" ? -cardStep : cardStep), groupWidth);

    controlsRef.current = animate(x, target, {
      duration: 0.75,
      ease: "easeOut",
      onComplete: () => {
        if (!isPaused) startAutoplay();
      },
    });
  };

  return (
    <div
      className="relative mt-[clamp(46px,5vw,74px)] w-full overflow-visible"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <button
        type="button"
        aria-label="Ver grupo anterior"
        onClick={() => nudgeCarousel("prev")}
        className="absolute left-[-50px] top-[calc(50%+20px)] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#56B0BB] text-[21px] text-white transition hover:scale-105 hover:brightness-105 xl:flex"
      >
        ←
      </button>

      <div className="overflow-visible pt-10">
        <div className="-mt-10 overflow-hidden px-1 pt-10">
          <motion.div
            className="flex cursor-grab items-stretch active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragElastic={0.08}
            dragConstraints={{ left: groupWidth ? -groupWidth * 2 : -1800, right: 0 }}
            onDragStart={stopAutoplay}
            onDragEnd={() => {
              x.set(normalizeX(x.get(), groupWidth));
              if (!isPaused) startAutoplay();
            }}
          >
            {loopGroups.map((groupIndex) => (
              <div
                key={groupIndex}
                ref={groupIndex === 0 ? groupRef : undefined}
                className="flex flex-shrink-0 items-stretch gap-[clamp(16px,1.5vw,24px)] pr-[clamp(16px,1.5vw,24px)]"
                aria-hidden={groupIndex > 0}
              >
                {familyCards.map((card) => (
                  <Link
                    key={`${card.title}-${groupIndex}`}
                    href={card.href}
                    aria-label={`Acessar as vacinas para ${card.title}`}
                    className="group relative flex min-h-[150px] w-[76vw] min-w-[220px] max-w-[248px] flex-shrink-0 flex-col justify-end rounded-[12px] border border-[#1A3858]/55 bg-white px-[clamp(17px,1.2vw,23px)] pb-4 pt-[64px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(26,56,88,0.11)] sm:w-[230px] md:w-[238px] lg:w-[210px] xl:w-[235px]"
                  >
                    <div className="absolute left-4 top-[-32px] flex h-[68px] w-[68px] items-center justify-center overflow-visible rounded-[16px] bg-[#56B0BB] p-3">
                      <Image
                        src={card.icon}
                        alt={`Ícone ${card.title}`}
                        width={68}
                        height={68}
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="text-[clamp(27px,1.9vw,36px)] font-black leading-none tracking-[-0.03em] text-[#1A3858]">
                      {card.title}
                    </h3>

                    <span className="mt-5 inline-flex items-center gap-2 text-[clamp(12px,0.8vw,14px)] font-medium tracking-[-0.02em] text-[#1A3858] transition group-hover:text-[#56B0BB]">
                      Acessar as Vacinas <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Ver próximo grupo"
        onClick={() => nudgeCarousel("next")}
        className="absolute right-[-50px] top-[calc(50%+20px)] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#1A3858] text-[21px] text-white transition hover:scale-105 hover:brightness-105 xl:flex"
      >
        →
      </button>

      <div className="mt-5 flex justify-center gap-3 xl:hidden">
        <button
          type="button"
          aria-label="Ver grupo anterior"
          onClick={() => nudgeCarousel("prev")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#56B0BB] text-white transition hover:scale-105 hover:brightness-105"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Ver próximo grupo"
          onClick={() => nudgeCarousel("next")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A3858] text-white transition hover:scale-105 hover:brightness-105"
        >
          →
        </button>
      </div>
    </div>
  );
}
