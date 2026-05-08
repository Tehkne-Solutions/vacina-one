'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import VaccineCard from '@/components/vacinas/VaccineCard';
import { WordPressVaccine } from '@/types/wordpress';

interface VaccinesListClientProps {
  vaccines: WordPressVaccine[];
}

export default function VaccinesListClient({ vaccines }: VaccinesListClientProps) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-[#EAF4EB] py-16">
        <div className="w-[85%] mx-auto max-w-[1570px]">
          <div className="bg-[#EAF4EB] rounded-[32px] px-10 py-14 md:py-16 flex flex-col md:flex-row md:items-center gap-10">
            {/* Texto */}
            <div className="flex-1">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[#56B0BB] text-[13px] font-semibold uppercase tracking-widest mb-3"
              >
                Proteção para cada fase da vida
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="text-[44px] md:text-[64px] font-black text-[#1A3858] leading-[1.05] tracking-tight mb-5"
              >
                Vacinas
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="text-[18px] text-[#5A5A5A] max-w-[600px] leading-relaxed"
              >
                Encontre informações sobre vacinas, indicações, reforços e
                cuidados importantes para cada fase da vida.
              </motion.p>
            </div>

            {/* Card visual direita */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-[24px] p-7 shadow-sm border border-[rgba(86,176,187,0.2)] min-w-[260px] max-w-[320px] w-full"
            >
              <p className="text-[13px] font-black text-[#1A3858] mb-4">
                Atendimento com orientação
              </p>
              <p className="text-[13px] text-[#5A5A5A] mb-5 leading-relaxed">
                Informações claras para ajudar você a cuidar melhor da sua saúde.
              </p>
              <ul className="flex flex-col gap-2">
                {['Indicação', 'Reforços', 'Cuidados'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#1A3858] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#56B0BB] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pt-[72px] pb-[96px]">
        <div className="w-[85%] mx-auto max-w-[1570px]">
          <div className="mb-10">
            <h2 className="text-[28px] font-black text-[#1A3858] mb-2">
              Vacinas disponíveis
            </h2>
            <p className="text-[16px] text-[#5A5A5A]">
              Consulte as principais informações cadastradas pela equipe VacinaOne.
            </p>
          </div>

          {vaccines.length === 0 ? (
            <div className="bg-[#EAF4EB] rounded-[28px] p-12 text-center">
              <p className="text-[20px] font-bold text-[#1A3858] mb-3">
                Nenhuma vacina cadastrada ainda.
              </p>
              <p className="text-[16px] text-[#5A5A5A] mb-7">
                Em breve, você poderá consultar aqui as vacinas disponíveis na VacinaOne.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center bg-[#F0B954] text-white font-black text-[15px] px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
              >
                Falar com a equipe
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vaccines.map((vaccine, i) => (
                <VaccineCard key={vaccine.id} vaccine={vaccine} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA final */}
      {vaccines.length > 0 && (
        <section className="pb-[96px]">
          <div className="w-[85%] mx-auto max-w-[1570px]">
            <div className="bg-[#1A3858] rounded-[32px] px-10 py-14 text-center">
              <h2 className="text-[28px] md:text-[36px] font-black text-white mb-4">
                Quer saber qual vacina é indicada para você?
              </h2>
              <p className="text-[17px] text-white/80 mb-8 max-w-[520px] mx-auto leading-relaxed">
                A equipe da VacinaOne pode orientar você com cuidado, clareza e segurança.
              </p>
              <Link
                href="/contato"
                aria-label="Agendar vacinação na VacinaOne"
                className="inline-flex items-center bg-[#F0B954] text-white font-black text-[16px] px-10 py-4 rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
              >
                Agendar Vacinação
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
