'use client';

import { motion } from 'framer-motion';
import UnitCard from '@/components/unidades/UnitCard';
import { WordPressUnit } from '@/types/wordpress';
import { siteContact } from '@/lib/site-config';
import { getWhatsAppHref } from '@/lib/whatsapp';

interface UnitsListClientProps {
  units: WordPressUnit[];
}

export default function UnitsListClient({ units }: UnitsListClientProps) {
  const appointmentHref = getWhatsAppHref('Olá! Vim pelo site da VacinaOne e quero agendar vacinação.');

  return (
    <main>
      <section className="bg-white border-b border-[#EAF4EB] py-16">
        <div className="w-[85%] mx-auto max-w-[1570px]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[#56B0BB] text-[14px] font-semibold uppercase tracking-widest mb-3"
          >
            Onde estamos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-[40px] md:text-[52px] font-black text-[#1A3858] leading-tight mb-4"
          >
            Unidades{' '}
            <span className="text-[#56B0BB]">VacinaOne</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="text-[17px] text-[#5A5A5A] max-w-[580px] leading-relaxed"
          >
            Encontre a unidade VacinaOne mais próxima e conte com um
            atendimento humanizado, seguro e organizado.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="w-[85%] mx-auto max-w-[1570px]">
          {units.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-[720px] rounded-[28px] border border-[#DDEFEA] bg-white p-7 shadow-sm"
            >
              <span className="inline-flex rounded-full bg-[rgba(240,185,84,0.16)] px-3 py-1 text-[12px] font-black uppercase tracking-[0.12em] text-[#F0B954]">
                Abre em breve
              </span>
              <h2 className="mt-4 text-[26px] font-black text-[#1A3858]">VacinaOne Campinas</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5A5A5A]">
                Atendimento em Campinas, região do Taquaral, com agendamento para famílias, empresas, escolas e instituições.
              </p>

              <div className="mt-6 grid gap-3 text-[14px] text-[#5A5A5A] sm:grid-cols-2">
                <p><span className="font-bold text-[#1A3858]">Endereço: </span>{siteContact.address}</p>
                <p><span className="font-bold text-[#1A3858]">Horário: </span>Abre em breve · {siteContact.hours}</p>
                <p><span className="font-bold text-[#1A3858]">Telefone: </span>{siteContact.phone}</p>
                <p><span className="font-bold text-[#1A3858]">E-mail: </span>{siteContact.email}</p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={appointmentHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-[44px] items-center justify-center rounded-[14px] bg-[#F0B954] px-6 text-[15px] font-black text-white transition hover:brightness-105">
                  Agendar vacinação
                </a>
                <a href={siteContact.mapsHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-[44px] items-center justify-center rounded-[14px] border border-[#56B0BB] px-6 text-[15px] font-black text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">
                  Ver no mapa
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {units.map((unit, i) => (
                <UnitCard key={unit.id} unit={unit} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
