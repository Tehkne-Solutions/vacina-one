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
    },
    {
      id: "medical-prescription",
      question: "Preciso de receita médica para tomar uma vacina?",
      answer:
        "Na maioria dos casos, não é necessário apresentar receita médica. Nossa equipe avalia o calendário vacinal, a idade, o histórico de saúde e orienta sobre a melhor conduta. Quando alguma vacina exigir indicação ou cuidado específico, avisamos antes da aplicação.",
    },
    {
      id: "corporate-vaccination",
      question: "Como funciona a vacinação para empresas?",
      answer:
        "Organizamos campanhas de vacinação para empresas, escolas, condomínios e instituições. A equipe da VacinaOne pode ir até o local ou receber os colaboradores na clínica, com agendamento, controle das doses e emissão dos comprovantes de vacinação.",
    },
  ],
  [
    {
      id: "safe-registered",
      question: "As vacinas são seguras e registradas?",
      answer:
        "Sim. Trabalhamos apenas com vacinas de laboratórios reconhecidos, registradas e aprovadas pelos órgãos competentes. Também seguimos protocolos rigorosos de conservação, armazenamento e aplicação para garantir segurança em todas as etapas.",
    },
    {
      id: "appointment-needed",
      question: "Preciso agendar ou posso chegar sem hora marcada?",
      answer:
        "Recomendamos o agendamento para garantir mais conforto, organização e menor tempo de espera. Assim, nossa equipe consegue preparar o atendimento com antecedência e confirmar a disponibilidade da vacina desejada.",
    },
    {
      id: "international-travel",
      question: "Vocês têm vacinas para viagem internacional?",
      answer:
        "Sim. A VacinaOne orienta sobre vacinas importantes para viagens nacionais e internacionais, de acordo com o destino, idade e histórico vacinal. Nossa equipe ajuda você a revisar o calendário antes da viagem para embarcar com mais segurança.",
    },
    {
      id: "vaccination-card",
      question: "Vocês emitem carteirinha ou comprovante de vacinação?",
      answer:
        "Sim. Após a aplicação, emitimos o comprovante de vacinação com as informações necessárias sobre a dose aplicada. Também orientamos sobre o registro no calendário vacinal e próximos reforços, quando houver necessidade.",
    },
  ],
];

export default function FaqSection() {
  const [openItem, setOpenItem] = useState("children-age");

  return (
    <motion.section
      id="faq"
      className="w-full bg-white py-[clamp(54px,5.5vw,88px)] font-franie"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="mx-auto w-[85%] max-w-[1450px]">
        <motion.h2
          className="text-center text-[clamp(30px,2.7vw,44px)] font-bold leading-[1.12] tracking-[-0.02em] text-[#1A3858]"
          variants={fadeUp}
        >
          Dúvidas Frequentes
        </motion.h2>

        <motion.div
          className="mt-[clamp(36px,4vw,58px)] grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-5"
          variants={staggerContainer}
        >
          {faqColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map((item) => {
                const isOpen = openItem === item.id;

                return (
                  <motion.article
                    key={item.id}
                    variants={fadeUp}
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="rounded-[16px] border border-[#56B0BB] bg-white p-[clamp(18px,1.3vw,24px)] transition duration-300 hover:border-[#1A3858]/60"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-panel`}
                      onClick={() => setOpenItem(isOpen ? "" : item.id)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-[clamp(16px,1.15vw,20px)] font-medium leading-[1.25] tracking-[-0.02em] text-[#333333]">
                        {item.question}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-5 shrink-0 items-center justify-center text-[19px] leading-none text-[#333333] transition-transform duration-300 ${
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
                          <div className="mt-4 border-t border-[#56B0BB] pt-4">
                            <p className="text-[clamp(14px,0.95vw,16px)] font-medium leading-[1.55] tracking-[-0.02em] text-[#5A5A5A]">
                              {item.answer}
                            </p>
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
