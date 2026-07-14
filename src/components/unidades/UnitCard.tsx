'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WordPressUnit } from '@/types/wordpress';
import { siteContact } from '@/lib/site-config';

interface UnitCardProps {
  unit: WordPressUnit;
  index?: number;
}

const OFFICIAL_CITY = 'Parque Taquaral · Campinas · SP';
const OPENING_STATUS = 'Abre em breve';
const OFFICIAL_HOURS = `${OPENING_STATUS} · ${siteContact.hours}`;

function isPlaceholder(value?: string | null) {
  if (!value) return true;
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  return (
    normalized.includes('a definir') ||
    normalized.includes('definir') ||
    normalized.includes('placeholder') ||
    normalized.includes('sem endereco') ||
    normalized.includes('sem horario')
  );
}

function officialOr(value: string | undefined | null, fallback: string) {
  return isPlaceholder(value) ? fallback : value || fallback;
}

function normalizeBrand(value: string) {
  return value.replace(/Vacina\s+One/g, 'VacinaOne').replace(/vacina\s+one/gi, 'VacinaOne');
}

export default function UnitCard({ unit, index = 0 }: UnitCardProps) {
  const acf = unit.acf ?? {};
  const rawName = acf.nome_da_unidade || unit.title.rendered.replace(/<[^>]*>/g, '');
  const name = normalizeBrand(officialOr(rawName, 'VacinaOne Campinas'));
  const rawCity = [acf.bairro, acf.cidade, acf.estado].filter(Boolean).join(' · ');
  const city = officialOr(rawCity, OFFICIAL_CITY);
  const address = officialOr(acf.endereco_completo, siteContact.address);
  const phone = officialOr(acf.telefone || acf.whatsapp, siteContact.phone);
  const hours = officialOr(acf.horario_de_funcionamento, OFFICIAL_HOURS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-[#EAF4EB] rounded-[24px] p-7 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <span className="inline-flex w-fit rounded-full bg-[rgba(240,185,84,0.16)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#F0B954]">
        {OPENING_STATUS}
      </span>

      <h2 className="text-[18px] font-black text-[#1A3858] leading-snug">
        {name}
      </h2>

      <p className="text-[13px] font-semibold text-[#56B0BB] uppercase tracking-wide">
        {city}
      </p>

      <p className="text-[14px] text-[#5A5A5A] leading-relaxed">{address}</p>

      <p className="text-[13px] text-[#5A5A5A]">
        <span className="font-semibold text-[#1A3858]">Horário: </span>
        {hours}
      </p>

      <p className="text-[13px] text-[#5A5A5A]">
        <span className="font-semibold text-[#1A3858]">Contato: </span>
        {phone}
      </p>

      <div className="mt-auto flex flex-wrap gap-3">
        <Link
          href={`/unidades/${unit.slug}`}
          aria-label={`Ver detalhes da unidade ${name}`}
          className="inline-flex items-center gap-1 text-[#56B0BB] text-[13px] font-bold hover:underline"
        >
          Ver unidade →
        </Link>
        <a
          href={siteContact.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#56B0BB] text-[13px] font-bold hover:underline"
        >
          Ver mapa →
        </a>
      </div>
    </motion.div>
  );
}
