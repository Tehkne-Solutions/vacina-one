import Link from 'next/link';
import { getWhatsAppHref } from '@/lib/whatsapp';

interface CampaignSidebarProps {
  campaignName: string;
  whatsappUrl?: string | null;
}

export default function CampaignSidebar({ campaignName, whatsappUrl }: CampaignSidebarProps) {
  const finalWhatsappUrl =
    whatsappUrl ||
    getWhatsAppHref(
      `Olá! Vim pelo site da VacinaOne e quero falar sobre campanha para empresas: ${campaignName}.`
    );

  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-[120px]">
      {/* CTA principal */}
      <div className="bg-[#1A3858] rounded-[28px] p-7 flex flex-col gap-4">
        <h3 className="text-[17px] font-black text-white">
          Planeje sua campanha
        </h3>
        <p className="text-[13px] text-white/80 leading-relaxed">
          A equipe VacinaOne pode orientar sua empresa sobre vacinas,
          organização, prazos e próximos passos.
        </p>
        <a
          href={finalWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Solicitar campanha — ${campaignName}`}
          className="inline-flex items-center justify-center bg-[#F0B954] text-white font-black text-[14px] px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
        >
          Solicitar Campanha
        </a>
        <a
          href={finalWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="inline-flex items-center justify-center bg-[#56B0BB] text-white font-black text-[14px] px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
        >
          Falar no WhatsApp
        </a>
      </div>

      {/* Links secundários */}
      <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-6 flex flex-col gap-3">
        <h3 className="text-[14px] font-black text-[#1A3858]">Veja também</h3>
        {[
          { href: '/vacinas', label: 'Vacinas' },
          { href: '/calendario', label: 'Calendário' },
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
