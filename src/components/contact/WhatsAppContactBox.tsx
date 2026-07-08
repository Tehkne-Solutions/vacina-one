import { getWhatsAppHref } from '@/lib/whatsapp';

const topics = [
  'Agendamento',
  'Vacinação infantil',
  'Família',
  '50+',
  'Empresas',
  'Escolas',
  'Casa de repouso',
  'Domiciliar',
  'Viagem internacional',
  'Check-up vacinal',
];

export default function WhatsAppContactBox() {
  const href = getWhatsAppHref('Olá! Vim pelo site da VacinaOne e quero atendimento.');

  return (
    <div className="space-y-5 rounded-[24px] border border-[#DDEFEA] bg-white p-5 shadow-sm md:p-7">
      <div className="rounded-[18px] bg-[#F2FBFA] p-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#56B0BB]">Atendimento oficial</p>
        <h3 className="mt-1 text-[22px] font-black leading-tight text-[#1A3858]">Fale com a VacinaOne</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#5A5A5A]">
          Atendimento pelo WhatsApp oficial da clínica para agendamentos, dúvidas e orientações.
        </p>
      </div>

      <div className="rounded-[18px] border border-[#EAF4EB] bg-[#F9FCFB] p-4">
        <p className="text-[14px] font-bold text-[#1A3858]">Assuntos atendidos</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {topics.map((item) => (
            <span key={item} className="rounded-[12px] border border-[#EAF4EB] bg-white px-3 py-2 text-[13px] font-semibold text-[#5A5A5A]">
              {item}
            </span>
          ))}
        </div>
      </div>

      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-[46px] w-full items-center justify-center rounded-[14px] bg-[#25D366] px-7 text-[15px] font-black text-white transition duration-200 hover:brightness-105">
        Falar no WhatsApp
      </a>
    </div>
  );
}
