'use client';

import { motion } from 'framer-motion';
import VaccineCard from '@/components/vacinas/VaccineCard';
import { WordPressVaccine } from '@/types/wordpress';
import { getWhatsAppHref } from '@/lib/whatsapp';

interface VaccinesListClientProps {
  vaccines: WordPressVaccine[];
}

export default function VaccinesListClient({ vaccines }: VaccinesListClientProps) {
  const appointmentHref = getWhatsAppHref(
    'Olá! Vim pelo site da VacinaOne e quero agendar uma vacinação.'
  );
  const teamHref = getWhatsAppHref(
    'Olá! Vim pelo site da VacinaOne e quero falar com a equipe sobre vacinas.'
  );

  return (
    <main>
      <section className="border-b border-[#EAF4EB] bg-white py-12 md:py-14">
        <div className="mx-auto w-[85%] max-w-[1500px]">
          <div className="flex flex-col gap-8 rounded-[28px] bg-[#EAF4EB] px-7 py-10 md:flex-row md:items-center md:px-10 md:py-12">
            <div className="flex-1">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-3 text-[12px] font-semibold uppercase tracking-widest text-[#56B0BB]"
              >
                Proteção para cada fase da vida
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="mb-4 text-[38px] font-black leading-[1.05] tracking-tight text-[#1A3858] md:text-[54px]"
              >
                Vacinas
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="max-w-[600px] text-[16px] leading-relaxed text-[#5A5A5A]"
              >
                Encontre informações sobre vacinas, indicações, reforços e cuidados importantes para cada fase da vida.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full min-w-[250px] max-w-[300px] rounded-[22px] border border-[rgba(86,176,187,0.2)] bg-white p-6 shadow-sm"
            >
              <p className="mb-3 text-[13px] font-black text-[#1A3858]">Atendimento com orientação</p>
              <p className="mb-4 text-[13px] leading-relaxed text-[#5A5A5A]">
                Informações claras para ajudar você a cuidar melhor da sua saúde.
              </p>
              <ul className="flex flex-col gap-2">
                {['Indicação', 'Reforços', 'Cuidados'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] font-semibold text-[#1A3858]">
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#56B0BB]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-[82px] pt-[58px]">
        <div className="mx-auto w-[85%] max-w-[1500px]">
          <div className="mb-8">
            <h2 className="mb-2 text-[26px] font-black text-[#1A3858]">Vacinas disponíveis</h2>
            <p className="text-[15px] text-[#5A5A5A]">Consulte as principais informações cadastradas pela equipe VacinaOne.</p>
          </div>

          {vaccines.length === 0 ? (
            <div className="rounded-[26px] bg-[#EAF4EB] p-10 text-center">
              <p className="mb-3 text-[20px] font-bold text-[#1A3858]">Nenhuma vacina cadastrada ainda.</p>
              <p className="mb-7 text-[16px] text-[#5A5A5A]">Fale com a equipe para confirmar a disponibilidade.</p>
              <a
                href={teamHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[46px] items-center rounded-[14px] bg-[#FFB703] px-7 text-[15px] font-black text-[#1A3858] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Falar com a equipe
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vaccines.map((vaccine, i) => (
                <VaccineCard key={vaccine.id} vaccine={vaccine} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {vaccines.length > 0 && (
        <section className="pb-[82px]">
          <div className="mx-auto w-[85%] max-w-[1500px]">
            <div className="rounded-[28px] bg-[#1A3858] px-8 py-11 text-center">
              <h2 className="mb-3 text-[27px] font-black text-white md:text-[34px]">
                Quer saber qual vacina é indicada para você?
              </h2>
              <p className="mx-auto mb-7 max-w-[520px] text-[16px] leading-relaxed text-white/80">
                A equipe da VacinaOne pode orientar você com cuidado, clareza e segurança.
              </p>
              <a
                href={appointmentHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar vacinação na VacinaOne"
                className="inline-flex h-[48px] items-center rounded-[14px] bg-[#FFB703] px-8 text-[15px] font-black text-[#1A3858] shadow-md transition hover:-translate-y-0.5 hover:brightness-105"
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
