"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

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

const AUTOPLAY_DELAY = 3200;

export default function FamilyCareAndCorporate() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const scrollCards = useCallback((direction: "prev" | "next") => {
    const container = cardsRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>("[data-family-card]");
    const distance = firstCard ? firstCard.offsetWidth + 28 : 280;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 2) return;

    const nextLeft = direction === "next"
      ? container.scrollLeft + distance
      : container.scrollLeft - distance;

    container.scrollTo({
      left: direction === "next" && nextLeft >= maxScroll - 8
        ? 0
        : direction === "prev" && nextLeft <= 0
          ? maxScroll
          : nextLeft,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (isPaused || isDragging) return;

    const autoplay = window.setInterval(() => {
      scrollCards("next");
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(autoplay);
  }, [isPaused, isDragging, scrollCards]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = cardsRef.current;
    if (!container) return;

    setIsDragging(true);
    setIsPaused(true);
    dragStartX.current = event.clientX;
    dragStartScroll.current = container.scrollLeft;
    container.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = cardsRef.current;
    if (!container || !isDragging) return;

    container.scrollLeft = dragStartScroll.current - (event.clientX - dragStartX.current);
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = cardsRef.current;
    setIsDragging(false);
    setIsPaused(false);
    container?.releasePointerCapture(event.pointerId);
  };

  return (
    <motion.section
      className="w-full bg-white py-[clamp(64px,7vw,130px)] font-franie"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
    >
      <div className="mx-auto w-[85%] max-w-[1597px]">
        <motion.div className="text-center" variants={fadeUp}>
          <h2 className="text-[clamp(34px,3vw,52px)] font-black leading-[1.12] tracking-[-0.03em] text-[#1A3858]">
            Acesse o cuidado para toda a família
          </h2>

          <p className="mt-3 text-[clamp(15px,1.1vw,20px)] font-medium leading-[160%] tracking-[-0.02em] text-[#5A5A5A]">
            Somos especializados em atendimento infantil e adulto
          </p>
        </motion.div>

        <div
          className="relative mt-[clamp(56px,6vw,92px)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <button
            type="button"
            aria-label="Ver calendário anterior"
            onClick={() => scrollCards("prev")}
            className="absolute left-[-54px] top-1/2 hidden h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-[#56B0BB] text-[24px] text-white transition hover:scale-105 hover:brightness-105 xl:flex"
          >
            ←
          </button>

          <motion.div
            ref={cardsRef}
            className={`flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:grid xl:grid-cols-5 xl:overflow-visible xl:pb-0 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            variants={staggerContainer}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            {familyCards.map((card) => (
              <motion.article
                key={card.title}
                data-family-card
                className="relative min-h-[166px] w-[min(78vw,260px)] flex-none snap-start rounded-[10px] border border-[#1A3858]/70 bg-white px-[clamp(18px,1.4vw,26px)] pb-5 pt-[72px] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(26,56,88,0.12)] sm:w-[260px] lg:w-[250px] xl:w-auto"
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="absolute left-4 top-[-20px] flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-[18px] bg-[#56B0BB] p-[14px]">
                  <Image
                    src={card.icon}
                    alt={`Ícone ${card.title}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>

                <h3 className="text-[clamp(30px,2.2vw,42px)] font-black leading-none tracking-[-0.03em] text-[#1A3858]">
                  {card.title}
                </h3>

                <a
                  href="#"
                  aria-label={`Acessar calendário de ${card.title}`}
                  className="mt-6 inline-flex items-center gap-2 text-[clamp(12px,0.85vw,15px)] font-medium tracking-[-0.02em] text-[#1A3858] transition hover:text-[#56B0BB]"
                >
                  Acessar calendário <span aria-hidden="true">→</span>
                </a>
              </motion.article>
            ))}
          </motion.div>

          <button
            type="button"
            aria-label="Ver próximo calendário"
            onClick={() => scrollCards("next")}
            className="absolute right-[-54px] top-1/2 hidden h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-[#1A3858] text-[24px] text-white transition hover:scale-105 hover:brightness-105 xl:flex"
          >
            →
          </button>

          <div className="mt-6 flex justify-center gap-3 xl:hidden">
            <button
              type="button"
              aria-label="Ver calendário anterior"
              onClick={() => scrollCards("prev")}
              className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#56B0BB] text-[24px] text-white transition hover:scale-105 hover:brightness-105"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Ver próximo calendário"
              onClick={() => scrollCards("next")}
              className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#1A3858] text-[24px] text-white transition hover:scale-105 hover:brightness-105"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid items-center gap-[clamp(48px,7vw,120px)] pt-[clamp(90px,10vw,170px)] lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div variants={fadeUp} className="max-w-[620px]">
            <h2 className="text-[clamp(34px,3vw,52px)] font-black leading-[1.02] tracking-[-0.03em] text-[#1A3858]">
              Vacinação para
              <br />
              <span className="text-[#F0B954]">empresas</span>
            </h2>

            <div className="mt-10 space-y-7 text-[clamp(16px,1.1vw,20px)] font-medium leading-[1.35] tracking-[-0.02em] text-[#5A5A5A]">
              <p>
                O agendamento é rápido, organizado e sem espera.
                <br />
                Escolha o horário que for melhor para você e apareça, a
                <br />
                gente cuida do resto.
              </p>

              <p>
                Tem dúvidas sobre qual vacina tomar, quando reforçar
                <br />
                ou como funciona a vacinação para a sua empresa?
                <br />
                Nossa equipe está pronta para te orientar antes mesmo
                <br />
                de você marcar um horário.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex h-[50px] items-center justify-center rounded-full bg-[#56B0BB] px-8 text-[clamp(15px,1vw,18px)] font-bold tracking-[-0.02em] text-white transition hover:scale-[1.02] hover:brightness-105"
              >
                Agendar Vacinação
              </a>

              <a
                href="#"
                className="inline-flex h-[50px] items-center justify-center rounded-full bg-[#F0B954] px-8 text-[clamp(15px,1vw,18px)] font-bold tracking-[-0.02em] text-white transition hover:scale-[1.02] hover:brightness-105"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative aspect-[1.18] w-full overflow-hidden">
            <Image
              src="/images/vacina-one-homepage-vacinacao-para-empresas-imagem-destaque.png"
              alt="Pessoa recebendo vacinação"
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1360px) 44vw, 720px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
