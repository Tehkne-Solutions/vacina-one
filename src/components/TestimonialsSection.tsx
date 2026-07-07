"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, type AnimationPlaybackControls, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "“Fui extremamente bem atendida na VacinaOne! Desde a recepção até a aplicação, tudo foi feito com muito cuidado e carinho. Me senti segura o tempo todo. Atendimento humanizado de verdade!”",
    name: "Mariana Souza",
    role: "Paciente",
    image: "/images/vacina-one-homepage-historias-depoimento-mariana-souza.png",
  },
  {
    quote:
      "“Levei minha filha para vacinar na VacinaOne e fiquei impressionado com a atenção da equipe. Explicaram cada etapa, foram pacientes e muito profissionais. Atendimento impecável!”",
    name: "Yussef Monasab",
    role: "Paciente",
    image: "/images/vacina-one-homepage-historias-depoimento-paciente-yussef-monasab.png",
  },
  {
    quote:
      "“A VacinaOne superou minhas expectativas! Ambiente organizado, equipe atenciosa e aplicação tranquila. Dá pra perceber o cuidado com cada paciente. Recomendo de olhos fechados!”",
    name: "Camila Rodrigues",
    role: "Paciente",
    image: "/images/vacina-one-homepage-historias-depoimento-camila-rodrigues.png",
  },
];

const DOTS = [0, 1, 2, 3];

export default function TestimonialsSection() {
  const x = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement>(null);
  const [cardStep, setCardStep] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const loopItems = useMemo(() => [...testimonials, ...testimonials, testimonials[0]], []);

  useEffect(() => {
    const track = trackRef.current;
    const card = firstCardRef.current;
    if (!track || !card) return;

    const updateStep = () => {
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
      setCardStep(card.getBoundingClientRect().width + gap);
    };

    updateStep();

    const resizeObserver = new ResizeObserver(updateStep);
    resizeObserver.observe(track);
    resizeObserver.observe(card);

    return () => resizeObserver.disconnect();
  }, []);

  const stopAutoplay = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
  }, []);

  const goToDot = useCallback(
    (index: number) => {
      if (!cardStep) return;

      const nextIndex = (index + DOTS.length) % DOTS.length;
      setActiveDot(nextIndex);
      stopAutoplay();

      controlsRef.current = animate(x, -nextIndex * cardStep, {
        duration: 0.8,
        ease: "easeOut",
      });
    },
    [cardStep, stopAutoplay, x]
  );

  const startAutoplay = useCallback(() => {
    if (isPaused) return;
    stopAutoplay();

    const interval = window.setInterval(() => {
      setActiveDot((current) => {
        const next = (current + 1) % DOTS.length;
        if (cardStep) {
          controlsRef.current = animate(x, -next * cardStep, {
            duration: 0.8,
            ease: "easeOut",
          });
        }
        return next;
      });
    }, 4000);

    return () => window.clearInterval(interval);
  }, [cardStep, isPaused, stopAutoplay, x]);

  useEffect(() => {
    const cleanup = startAutoplay();
    return () => {
      cleanup?.();
      stopAutoplay();
    };
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (!cardStep) return;
    controlsRef.current = animate(x, -activeDot * cardStep, {
      duration: 0.35,
      ease: "easeOut",
    });
  }, [cardStep, activeDot, x]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) {
      goToDot(activeDot + 1);
      return;
    }

    if (info.offset.x > 50) {
      goToDot(activeDot - 1);
      return;
    }

    goToDot(activeDot);
  };

  return (
    <motion.section
      id="historias"
      className="w-full overflow-hidden bg-[#56B0BB] py-[clamp(78px,7vw,120px)] font-franie 2xl:min-h-[1173px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="mx-auto w-[85%] max-w-[1611px]">
        <motion.div className="mx-auto flex max-w-[1611px] flex-col items-center text-center" variants={fadeUp}>
          <h2 className="max-w-[1300px] text-[clamp(36px,4vw,65px)] font-bold leading-[118.52%] tracking-[-0.02em] text-white">
            Histórias de quem já <span className="text-[#1A3858]">confia</span> na VacinaOne
          </h2>

          <p className="mt-[clamp(18px,1.5vw,28px)] max-w-[1219px] text-[clamp(17px,1.25vw,22px)] font-medium leading-[160.4%] tracking-[-0.02em] text-white">
            Nada melhor do que ouvir de quem já viveu a experiência VacinaOne. Veja o que nossos pacientes e parceiros falam sobre a gente.
          </p>
        </motion.div>

        <motion.div
          className="mt-[clamp(64px,7vw,130px)] overflow-hidden"
          variants={fadeUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <motion.div
            ref={trackRef}
            className="flex cursor-grab items-start gap-7 active:cursor-grabbing lg:gap-10"
            style={{ x }}
            drag="x"
            dragElastic={0.08}
            dragConstraints={{ left: cardStep ? -cardStep * (DOTS.length - 1) : -1800, right: 0 }}
            onDragStart={stopAutoplay}
            onDragEnd={handleDragEnd}
          >
            {loopItems.map((item, index) => (
                  <motion.article
                    key={`${item.name}-${item.role}-${index}`}
                    ref={index === 0 ? firstCardRef : undefined}
                    className="flex min-w-0 flex-[0_0_100%] flex-col items-center gap-[clamp(28px,2vw,35px)] text-center sm:flex-[0_0_calc((100%_-_28px)/2)] lg:flex-[0_0_calc((100%_-_80px)/3)]"
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="relative h-[clamp(180px,12.5vw,240px)] w-[clamp(180px,12.5vw,240px)] overflow-hidden rounded-[20px]">
                      <Image
                        src={item.image}
                        alt={`Foto de ${item.name}`}
                        fill
                        sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 240px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex w-full flex-col items-center gap-5">
                      <p className="max-w-[500px] text-[clamp(16px,1.05vw,20px)] font-medium leading-[160.4%] tracking-[-0.02em] text-white">
                        {item.quote}
                      </p>

                      <div className="flex flex-col items-center gap-[5px]">
                        <div
                          className="flex items-center justify-center gap-[3px] text-[clamp(18px,1.25vw,24px)] leading-none text-[#E6E93C]"
                          aria-label="Avaliação 5 estrelas"
                        >
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                        </div>

                        <h3 className="text-[18px] font-bold leading-[180%] text-white">
                          <span className="text-[#E6E93C]">★</span> {item.name}
                        </h3>

                        <p className="font-sans text-[16px] font-medium leading-[144.52%] text-white">{item.role}</p>
                      </div>
                    </div>
                  </motion.article>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-[clamp(64px,5vw,90px)] flex items-center justify-center gap-[18px]"
          variants={fadeUp}
        >
          {DOTS.map((dot) => (
            <button
              key={dot}
              type="button"
              aria-label={`Ir para grupo de depoimentos ${dot + 1}`}
              onClick={() => goToDot(dot)}
              className={`h-[15px] w-[15px] rounded-full bg-white transition duration-300 ${
                activeDot === dot ? "opacity-100" : "opacity-60"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
