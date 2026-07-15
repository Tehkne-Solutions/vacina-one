'use client';

import { FormEvent, useMemo, useState } from 'react';
import { getWhatsAppHref } from '@/lib/whatsapp';

const topics = [
  'Agendamento de vacina',
  'Vacinação infantil',
  'Família e adultos',
  '50+ e idosos',
  'VacinaOne até Você',
  'Vacinação em casa',
  'Condomínios',
  'Escolas e instituições',
  'Viagem internacional',
  'Check-up vacinal',
  'Outro assunto',
];

export default function WhatsAppContactBox() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [vaccine, setVaccine] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const whatsappMessage = useMemo(
    () =>
      [
        'Olá! Vim pelo site da VacinaOne e gostaria de atendimento.',
        `Nome: ${name || '-'}`,
        `Telefone: ${phone || '-'}`,
        `E-mail: ${email || '-'}`,
        `Assunto: ${topic}`,
        `Vacina de interesse: ${vaccine || 'Ainda não definida'}`,
        `Data ou período preferido: ${preferredDate || 'A combinar'}`,
        `Mensagem: ${message || '-'}`,
      ].join('\n'),
    [email, message, name, phone, preferredDate, topic, vaccine]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
    window.open(getWhatsAppHref(whatsappMessage), '_blank', 'noopener,noreferrer');
  }

  const inputClass =
    'h-[46px] w-full rounded-[13px] border border-[#DDEFEA] bg-white px-4 text-[14px] text-[#1A3858] outline-none transition placeholder:text-[#8B99A5] focus:border-[#56B0BB] focus:ring-2 focus:ring-[#56B0BB]/15';

  return (
    <form id="formulario-contato" onSubmit={handleSubmit} className="space-y-5 rounded-[24px] border border-[#DDEFEA] bg-white p-5 shadow-sm md:p-7">
      <div className="rounded-[18px] bg-[#F2FBFA] p-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#56B0BB]">Formulário completo</p>
        <h3 className="mt-1 text-[22px] font-black leading-tight text-[#1A3858]">Como podemos ajudar?</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#5A5A5A]">
          Preencha os dados abaixo. Ao enviar, sua solicitação será aberta no WhatsApp oficial da VacinaOne.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-[13px] font-bold text-[#1A3858]">
          Nome completo
          <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Seu nome" />
        </label>
        <label className="space-y-2 text-[13px] font-bold text-[#1A3858]">
          Telefone / WhatsApp
          <input className={inputClass} value={phone} onChange={(event) => setPhone(event.target.value)} required autoComplete="tel" inputMode="tel" placeholder="(19) 99999-9999" />
        </label>
        <label className="space-y-2 text-[13px] font-bold text-[#1A3858]">
          E-mail
          <input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="voce@email.com" />
        </label>
        <label className="space-y-2 text-[13px] font-bold text-[#1A3858]">
          Assunto
          <select className={inputClass} value={topic} onChange={(event) => setTopic(event.target.value)}>
            {topics.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="space-y-2 text-[13px] font-bold text-[#1A3858]">
          Vacina de interesse
          <input className={inputClass} value={vaccine} onChange={(event) => setVaccine(event.target.value)} placeholder="Ex.: Influenza, HPV 9, Dengue" />
        </label>
        <label className="space-y-2 text-[13px] font-bold text-[#1A3858]">
          Data ou período preferido
          <input className={inputClass} value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} placeholder="Ex.: sexta à tarde" />
        </label>
      </div>

      <label className="block space-y-2 text-[13px] font-bold text-[#1A3858]">
        Conte mais sobre o atendimento
        <textarea
          className="min-h-[112px] w-full resize-y rounded-[13px] border border-[#DDEFEA] bg-white px-4 py-3 text-[14px] text-[#1A3858] outline-none transition placeholder:text-[#8B99A5] focus:border-[#56B0BB] focus:ring-2 focus:ring-[#56B0BB]/15"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          placeholder="Informe idade, quantidade de pessoas ou qualquer detalhe importante."
        />
      </label>

      <label className="flex items-start gap-3 text-[12px] leading-relaxed text-[#5A5A5A]">
        <input className="mt-1 h-4 w-4 accent-[#56B0BB]" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
        <span>Autorizo o uso destes dados para retorno da VacinaOne sobre esta solicitação, conforme a política de privacidade.</span>
      </label>

      <button type="submit" className="inline-flex h-[48px] w-full items-center justify-center rounded-[14px] bg-[#FFB703] px-7 text-[15px] font-black text-[#1A3858] shadow-[0_10px_24px_rgba(255,183,3,0.2)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105">
        Enviar solicitação pelo WhatsApp
      </button>
    </form>
  );
}
