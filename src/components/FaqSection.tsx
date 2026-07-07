"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const faqColumns = [
  [
    {
      id: "children-age",
      question: "Vocês atendem crianças de qual idade?",
      answer:
        "Atendemos desde os primeiros meses de vida. Seguimos o calendário vacinal da Sociedade Brasileira de Pediatria e orientamos os pais sobre cada etapa com muita atenção e calma.",
      link: "Saiba mais",
    },
    {
      id: "medical-prescription",
      question: "Preciso de receita médica para tomar uma vacina?",
      answer:
        "Na maioria dos casos, não é necessário apresentar receita médica. Nossa equipe avalia o calendário vacinal, a idade, o histórico de saúde e orienta sobre a melhor conduta. Quando alguma vacina exigir indicação ou cuidado específico, avisamos antes da aplicação.",
      link: "Saiba mais",
    },
    {
      id: "corporate-vaccination",
      question: "Como funciona a vacinação para empresas?",
      answer:
        "Organizamos campanhas de vacinação para empresas, escolas, condomínios e instituições. A equipe da VacinaOne pode ir até o local ou receber os colaboradores na clínica, com agendamento, controle das doses e emissão dos comprovantes de vacinação.",
      link: "Saiba mais",
    },
  ],
  [
    {
      id: "safe-registered",
      question: "As vacinas são seguras e registradas?",
      answer:
        "Sim. Trabalhamos apenas com vacinas de laboratórios reconhecidos, registradas e aprovadas pelos órgãos competentes. Também seguimos protocolos rigorosos de conservação, armazenamento e aplicação para garantir segurança em todas as etapas.",
      link: "Saiba mais",
    },
    {
      id: "appointment-needed",
      question: "Preciso agendar ou posso chegar sem hora marcada?",
      answer:
        "Recomendamos o agendamento para garantir mais conforto, organização e menor tempo de espera. Assim, nossa equipe consegue preparar o atendimento com antecedência e confirmar a disponibilidade da vacina desejada.",
      link: "Saiba mais",
    },
    {
      id: "international-travel",
      question: "Vocês têm vacinas para viagem internacional?",
      answer:
        "Sim. A VacinaOne orienta sobre vacinas importantes para viagens nacionais e internacionais, de acordo com o destino, idade e histórico vacinal. Nossa equipe ajuda você a revisar o calendário antes da viagem para embarcar com mais segurança.",
      link: "Saiba mais",
    },
    {
      id: "vaccination-card",
      question: "Vocês emitem carteirinha ou comprovante de vacinação?",
      answer:
        "Sim. Após a aplicação, emitimos o comprovante de vacinação com as informações necessárias sobre a dose aplicada. Também orientamos sobre o registro no calendário vacinal e próximos reforços, quando houver necessidade.",
      link: "Saiba mais",
    },
  ],
];

export default function FaqSection() {
  const [openItem, setOpenItem] = useState("children-age");

  return (
    <motion.section
      id="faq"
      className="w-full bg-white py-[clamp(72px,7vw,120px)] font-franie"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="mx-auto w-[85%] max-w-[1594px]">
        <motion.h2
          className="text-center text-[clamp(34px,3vw,52px)] font-bold leading-[118.52%] tracking-[-0.02em] text-[#1A3858]"
          variants={fadeUp}
        >
          Dúvidas Frequentes
        </motion.h2>

        <motion.div
          className="mt-[clamp(48px,5vw,82px)] grid grid-cols-1 gap-[20px] lg:grid-cols-2 lg:gap-x-[30px]"
          variants={staggerContainer}
        >
          {faqColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-[20px]">
              {column.map((item) => {
                const isOpen = openItem === item.id;

                return (
                  <motion.article
                    key={item.id}
                    variants={fadeUp}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="rounded-[20px] border border-[#56B0BB] bg-white p-[clamp(20px,1.6vw,30px)] transition duration-300 hover:border-[#1A3858]/60"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-panel`}
                      onClick={() => setOpenItem(isOpen ? "" : item.id)}
                      className="flex w-full items-center justify-between gap-5 text-left"
                    >
                      <span className="text-[clamp(18px,1.45vw,25px)] font-medium leading-[120%] tracking-[-0.02em] text-[#333333]">
                        {item.question}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`flex h-6 w-6 shrink-0 items-center justify-center text-[22px] leading-none text-[#333333] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ˅
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`${item.id}-panel`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 border-t border-[#56B0BB] pt-5">
                            <p className="text-[clamp(15px,1.05vw,18px)] font-medium leading-[160.4%] tracking-[-0.02em] text-[#5A5A5A]">
                              {item.answer}
                            </p>

                            <a
                              href="#"
                              className="mt-[5px] inline-flex font-sans text-[clamp(16px,1.05vw,20px)] font-medium leading-6 text-[#1A3858] underline underline-offset-2 transition hover:text-[#56B0BB]"
                            >
                              {item.link}
                            </a>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
