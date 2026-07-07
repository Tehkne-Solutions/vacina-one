import Link from 'next/link';
import { getWhatsAppHref } from '@/lib/whatsapp';

interface CalendarSidebarProps {
  calendarName: string;
}

export default function CalendarSidebar({ calendarName }: CalendarSidebarProps) {
  const appointmentHref = getWhatsAppHref(
    `Olá! Vim pelo site da VacinaOne e quero orientação sobre o calendário ${calendarName}.`
  );

  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-[120px]">
      {/* CTA principal */}
      <div className="bg-[#1A3858] rounded-[28px] p-7 flex flex-col gap-4">
        <h3 className="text-[17px] font-black text-white">
          Precisa de orientação?
        </h3>
        <p className="text-[13px] text-white/80 leading-relaxed">
          Nossa equipe pode ajudar você a entender o calendário vacinal mais
          adequado para cada fase da vida.
        </p>
        <a
          href={appointmentHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Agendar vacinação — ${calendarName}`}
          className="inline-flex items-center justify-center bg-[#F0B954] text-white font-black text-[14px] px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
        >
          Agendar Vacinação
        </a>
      </div>

      {/* Links secundários */}
      <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-6 flex flex-col gap-3">
        <h3 className="text-[14px] font-black text-[#1A3858]">Veja também</h3>
        {[
          { href: '/vacinas', label: 'Todas as vacinas' },
          { href: '/unidades', label: 'Unidades' },
          { href: '/blog', label: 'Blog' },
          { href: '/contato', label: 'Contato' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[13px] text-[#56B0BB] font-semibold hover:underline"
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </div>
  );
}
