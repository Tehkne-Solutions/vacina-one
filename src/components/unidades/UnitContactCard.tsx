import { UnitAcf } from '@/types/wordpress';
import { getWhatsAppHref } from '@/lib/whatsapp';

interface UnitContactCardProps {
  acf: UnitAcf;
  unitName: string;
}

function getUnitWhatsAppHref(whatsapp: string | undefined, unitName: string) {
  if (whatsapp) {
    const number = whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Olá! Vim pelo site da VacinaOne e quero agendar vacinação na unidade ${unitName}.`
    );
    return `https://wa.me/${number}?text=${message}`;
  }

  return getWhatsAppHref(
    `Olá! Vim pelo site da VacinaOne e quero agendar vacinação na unidade ${unitName}.`
  );
}

export default function UnitContactCard({ acf, unitName }: UnitContactCardProps) {
  const whatsappUrl = getUnitWhatsAppHref(acf.whatsapp, unitName);

  return (
    <aside className="bg-[#F2FBFA] rounded-[24px] p-8 flex flex-col gap-5 h-fit">
      <h2 className="text-[20px] font-black text-[#1A3858]">
        Quer agendar sua vacinação nesta unidade?
      </h2>
      <p className="text-[14px] text-[#5A5A5A] leading-relaxed">
        Nossa equipe está pronta para orientar você com cuidado, clareza e
        segurança.
      </p>

      {/* Informações rápidas */}
      <div className="flex flex-col gap-2 text-[13px] text-[#5A5A5A]">
        {acf.telefone && (
          <p>
            <span className="font-semibold text-[#1A3858]">Telefone: </span>
            {acf.telefone}
          </p>
        )}
        {acf.email && (
          <p>
            <span className="font-semibold text-[#1A3858]">E-mail: </span>
            {acf.email}
          </p>
        )}
        {acf.horario_de_funcionamento && (
          <p>
            <span className="font-semibold text-[#1A3858]">Horário: </span>
            {acf.horario_de_funcionamento}
          </p>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 mt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Agendar vacinação na unidade ${unitName}`}
          className="inline-flex items-center justify-center bg-[#F0B954] text-white font-black text-[15px] px-8 py-4 rounded-[50px] hover:scale-105 transition-transform duration-200 text-center"
        >
          Agendar Vacinação
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Falar no WhatsApp com a unidade ${unitName}`}
          className="inline-flex items-center justify-center bg-[#56B0BB] text-white font-black text-[15px] px-8 py-4 rounded-[50px] hover:scale-105 transition-transform duration-200 text-center"
        >
          Falar no WhatsApp
        </a>
      </div>
    </aside>
  );
}
