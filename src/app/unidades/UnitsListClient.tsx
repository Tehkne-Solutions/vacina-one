'use client';

import { motion } from 'framer-motion';
import UnitCard from '@/components/unidades/UnitCard';
import { WordPressUnit } from '@/types/wordpress';

interface UnitsListClientProps {
  units: WordPressUnit[];
}

export default function UnitsListClient({ units }: UnitsListClientProps) {
  return (
    <main>
      {/* Hero */}
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

      {/* Grid */}
      <section className="py-16">
        <div className="w-[85%] mx-auto max-w-[1570px]">
          {units.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20"
            >
              <p className="text-[20px] text-[#5A5A5A] mb-2">
                Nenhuma unidade cadastrada ainda.
              </p>
              <p className="text-[16px] text-[#5A5A5A]">
                Em breve, você poderá consultar aqui as unidades disponíveis da
                VacinaOne.
              </p>
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
