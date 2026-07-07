'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CalendarCard from '@/components/calendario/CalendarCard';
import { WordPressCalendar } from '@/types/wordpress';
import { getWhatsAppHref } from '@/lib/whatsapp';

const PUBLICOS = ['Bebê', 'Crianças', 'Adultos', 'Gestante', '60+', 'Empresas'];

interface CalendarListClientProps {
  items: WordPressCalendar[];
}

export default function CalendarListClient({ items }: CalendarListClientProps) {
  const appointmentHref = getWhatsAppHref(
    'Olá! Vim pelo site da VacinaOne e quero agendar vacinação pelo calendário vacinal.'
  );
  const teamHref = getWhatsAppHref(
    'Olá! Vim pelo site da VacinaOne e quero falar com a equipe sobre calendário vacinal.'
  );

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
                Calendário Vacinal
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="text-[44px] md:text-[64px] font-black text-[#1A3858] leading-[1.05] tracking-tight mb-5"
              >
                Cuidado em cada{' '}
                <span className="text-[#56B0BB]">fase da vida</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="text-[17px] text-[#5A5A5A] max-w-[560px] leading-relaxed mb-8"
              >
                Consulte orientações por público e fase da vida para acompanhar
                vacinas, reforços e cuidados importantes.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.24 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href={appointmentHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#F0B954] text-white font-black text-[15px] px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
                >
                  Agendar Vacinação
                </a>
                <Link
                  href="/vacinas"
                  className="inline-flex items-center border-2 border-[#1A3858] text-[#1A3858] font-black text-[15px] px-8 py-4 rounded-full hover:bg-[#1A3858] hover:text-white transition-colors duration-200"
                >
                  Ver vacinas
                </Link>
              </motion.div>
            </div>

            {/* Card visual direita */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-[24px] p-7 shadow-sm border border-[rgba(86,176,187,0.2)] min-w-[240px] max-w-[300px] w-full"
            >
              <p className="text-[13px] font-black text-[#1A3858] mb-4">
                Calendários por público
              </p>
              <ul className="flex flex-col gap-2">
                {PUBLICOS.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-[13px] text-[#1A3858] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#56B0BB] flex-shrink-0" />
                    {p}
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
              Escolha o calendário por público
            </h2>
            <p className="text-[16px] text-[#5A5A5A]">
              Encontre informações organizadas para cada fase da vida.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="bg-[#EAF4EB] rounded-[28px] p-12 text-center">
              <p className="text-[20px] font-bold text-[#1A3858] mb-3">
                Nenhum calendário cadastrado ainda.
              </p>
              <p className="text-[16px] text-[#5A5A5A] mb-7">
                Em breve, você poderá consultar aqui os calendários vacinais por
                fase da vida.
              </p>
              <a
                href={teamHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#F0B954] text-white font-black text-[15px] px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
              >
                Falar com a equipe
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, i) => (
                <CalendarCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA final */}
      {items.length > 0 && (
        <section className="pb-[96px]">
          <div className="w-[85%] mx-auto max-w-[1570px]">
            <div className="bg-[#1A3858] rounded-[32px] px-10 py-14 text-center">
              <h2 className="text-[28px] md:text-[36px] font-black text-white mb-4">
                Tem dúvidas sobre qual vacina tomar?
              </h2>
              <p className="text-[17px] text-white/80 mb-8 max-w-[500px] mx-auto leading-relaxed">
                Nossa equipe pode orientar você com cuidado, clareza e segurança.
              </p>
              <a
                href={appointmentHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar vacinação na VacinaOne"
                className="inline-flex items-center bg-[#F0B954] text-white font-black text-[16px] px-10 py-4 rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
              >
                Agendar Vacinação
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
