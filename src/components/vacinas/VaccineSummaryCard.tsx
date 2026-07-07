import Link from 'next/link';
import { VaccineAcf } from '@/types/wordpress';
import { getWhatsAppHref } from '@/lib/whatsapp';

interface VaccineSummaryCardProps {
  acf: VaccineAcf;
  vaccineName: string;
}

export default function VaccineSummaryCard({ acf, vaccineName }: VaccineSummaryCardProps) {
  const available = acf.disponivel_para_agendamento !== false;
  const ctaText = acf.cta_texto || 'Agendar Vacinação';
  const appointmentHref = getWhatsAppHref(
    `Olá! Vim pelo site da VacinaOne e quero agendar a vacina ${vaccineName}.`
  );

  const rows = [
    acf.faixa_etaria && { label: 'Faixa etária', value: acf.faixa_etaria },
    acf.numero_de_doses && { label: 'Número de doses', value: acf.numero_de_doses },
    acf.reforco && { label: 'Reforço', value: acf.reforco },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-[120px]">
      {/* Resumo */}
      {rows.length > 0 && (
        <div className="bg-white border border-[rgba(86,176,187,0.25)] rounded-[28px] p-7 shadow-sm">
          <h2 className="text-[16px] font-black text-[#1A3858] mb-5">
            Resumo da vacina
          </h2>
          <div className="flex flex-col gap-3">
            {rows.map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5 pb-3 border-b border-[#EAF4EB] last:border-0 last:pb-0">
                <span className="text-[12px] text-[#5A5A5A] uppercase tracking-wide">{row.label}</span>
                <span className="text-[14px] font-semibold text-[#1A3858]">{row.value}</span>
              </div>
            ))}
            <div className="flex flex-col gap-0.5 pt-1">
              <span className="text-[12px] text-[#5A5A5A] uppercase tracking-wide">Agendamento</span>
              <span className={`self-start text-[12px] font-bold px-3 py-1 rounded-full ${available ? 'bg-[rgba(86,176,187,0.12)] text-[#56B0BB]' : 'bg-[#EAF4EB] text-[#5A5A5A]'}`}>
                {available ? 'Disponível' : 'Consultar'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA principal */}
      <div className="bg-[#1A3858] rounded-[28px] p-7 flex flex-col gap-4">
        <h3 className="text-[17px] font-black text-white">
          Precisa de orientação?
        </h3>
        <p className="text-[13px] text-white/80 leading-relaxed">
          Nossa equipe pode ajudar você a entender indicações, cuidados e próximos passos.
        </p>
        {available ? (
          <a
            href={appointmentHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Agendar vacinação: ${vaccineName}`}
            className="inline-flex items-center justify-center bg-[#F0B954] text-white font-black text-[14px] px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
          >
            {ctaText}
          </a>
        ) : (
          <p className="text-[13px] text-white/60 italic">
            Consulte nossa equipe para verificar disponibilidade.
          </p>
        )}
      </div>

      {/* Links secundários */}
      <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-6 flex flex-col gap-3">
        <h3 className="text-[14px] font-black text-[#1A3858]">Outras informações</h3>
        <Link href="/vacinas" className="text-[13px] text-[#56B0BB] font-semibold hover:underline">
          ← Voltar para Vacinas
        </Link>
        <a
          href={getWhatsAppHref(`Olá! Vim pelo site da VacinaOne e quero falar com a equipe sobre ${vaccineName}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-[#56B0BB] font-semibold hover:underline"
        >
          Falar com a equipe
        </a>
        <Link href="/calendario" className="text-[13px] text-[#56B0BB] font-semibold hover:underline">
          Ver calendário vacinal
        </Link>
      </div>
    </div>
  );
}
