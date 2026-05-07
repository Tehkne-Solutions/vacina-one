"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue, type AnimationPlaybackControls } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const familyCards = [
  {
    title: "bebê",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-bebe.svg",
  },
  {
    title: "crianças",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-criancas.svg",
  },
  {
    title: "60+",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-60+.svg",
  },
  {
    title: "adultos",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-adultos.svg",
  },
  {
    title: "gestante",
    icon: "/images/vacina-one-homepage-cuidado-familia-icone-gestantes.svg",
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
      className="relative mt-[clamp(56px,6vw,92px)] w-full overflow-visible"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <button
        type="button"
        aria-label="Ver calendário anterior"
        onClick={() => nudgeCarousel("prev")}
        className="absolute left-[-54px] top-[calc(50%+24px)] z-20 hidden h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-[#56B0BB] text-[24px] text-white transition hover:scale-105 hover:brightness-105 xl:flex"
      >
        ←
      </button>

      <div className="overflow-visible pt-12">
        <div className="overflow-hidden px-1">
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
                className="flex flex-shrink-0 items-stretch gap-[clamp(18px,1.8vw,28px)] pr-[clamp(18px,1.8vw,28px)]"
                aria-hidden={groupIndex > 0}
              >
                {familyCards.map((card) => (
                  <Link
                    key={`${card.title}-${groupIndex}`}
                    href="/calendario"
                    aria-label={`Acessar calendário para ${card.title}`}
                    className="group relative flex min-h-[166px] w-[78vw] min-w-[230px] max-w-[260px] flex-shrink-0 flex-col justify-end rounded-[10px] border border-[#1A3858]/70 bg-white px-[clamp(18px,1.4vw,26px)] pb-5 pt-[72px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(26,56,88,0.12)] sm:w-[240px] sm:max-w-none md:w-[250px] lg:w-[220px] xl:w-[245px]"
                  >
                    <div className="absolute left-4 top-[-38px] flex h-[80px] w-[80px] items-center justify-center overflow-visible rounded-[18px] bg-[#56B0BB] p-[14px]">
                      <Image
                        src={card.icon}
                        alt={`Ícone ${card.title}`}
                        width={80}
                        height={80}
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="text-[clamp(30px,2.2vw,42px)] font-black leading-none tracking-[-0.03em] text-[#1A3858]">
                      {card.title}
                    </h3>

                    <span className="mt-6 inline-flex items-center gap-2 text-[clamp(12px,0.85vw,15px)] font-medium tracking-[-0.02em] text-[#1A3858] transition group-hover:text-[#56B0BB]">
                      Acessar calendário <span aria-hidden="true">→</span>
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
        aria-label="Ver próximo calendário"
        onClick={() => nudgeCarousel("next")}
        className="absolute right-[-54px] top-[calc(50%+24px)] z-20 hidden h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-[#1A3858] text-[24px] text-white transition hover:scale-105 hover:brightness-105 xl:flex"
      >
        →
      </button>

      <div className="mt-6 flex justify-center gap-3 xl:hidden">
        <button
          type="button"
          aria-label="Ver calendário anterior"
          onClick={() => nudgeCarousel("prev")}
          className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#56B0BB] text-white transition hover:scale-105 hover:brightness-105"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Ver próximo calendário"
          onClick={() => nudgeCarousel("next")}
          className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#1A3858] text-white transition hover:scale-105 hover:brightness-105"
        >
          →
        </button>
      </div>
    </div>
  );
}
