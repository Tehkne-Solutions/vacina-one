import { getCorporateCampaigns } from '@/lib/wordpress';
import Link from 'next/link';
import CampaignCard from '@/components/empresas/CampaignCard';
import { getWhatsAppHref } from '@/lib/whatsapp';

export const metadata = {
  title: 'VacinaOne até Você | VacinaOne',
  description: 'Vacinação em empresas, escolas, condomínios, casas de repouso e no conforto da sua casa.',
};

export default async function CorporatePage() {
  const campaigns = await getCorporateCampaigns();
  const corporateHref = getWhatsAppHref(
    'Olá! Vim pelo site da VacinaOne e quero solicitar atendimento do VacinaOne até Você.'
  );

  const segments = [
    {
      title: 'Vacinação em casa',
      text: 'Atendimento domiciliar com conforto, segurança e organização para bebês, famílias, idosos e pessoas com mobilidade reduzida.',
    },
    {
      title: 'Condomínios',
      text: 'Campanhas no próprio condomínio, com agenda organizada e atendimento próximo para moradores, familiares e equipes.',
    },
    {
      title: 'Empresas',
      text: 'Campanhas para equipes, com organização de horários, orientação aos colaboradores e apoio para reduzir afastamentos.',
    },
    {
      title: 'Escolas',
      text: 'Apoio para atualização vacinal de crianças e adolescentes, com comunicação clara para famílias e responsáveis.',
    },
    {
      title: 'Casas de repouso',
      text: 'Cuidado coletivo para residentes e equipes, com foco em prevenção de surtos e proteção contínua.',
    },
  ];

  return (
    <main>
      <section className="bg-[#EAF4EB] py-12 md:py-16">
        <div className="mx-auto w-[85%] max-w-[1280px]">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#56B0BB]">VacinaOne até Você</span>
              <h1 className="text-3xl font-black leading-tight text-[#1A3858] md:text-5xl">
                A proteção da VacinaOne onde você precisar
              </h1>
              <p className="text-[17px] leading-relaxed text-[#5A5A5A]">
                Levamos vacinação humanizada para sua casa, condomínio, empresa, escola ou instituição, com planejamento, segurança e atendimento especializado.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={corporateHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-[44px] items-center justify-center rounded-[14px] bg-[#FFB703] px-6 text-[15px] font-black text-[#1A3858] transition hover:brightness-105">
                  Solicitar atendimento
                </a>
                <Link href="/contato#formulario-contato" className="inline-flex h-[44px] items-center justify-center rounded-[14px] border border-[#56B0BB] px-6 text-[15px] font-black text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">
                  Enviar briefing
                </Link>
              </div>
            </div>

            <div className="rounded-[26px] border border-[rgba(86,176,187,0.25)] bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-[20px] font-black text-[#1A3858]">Como funciona</h3>
              <ul className="space-y-3">
                {['Entendimento do público e local de atendimento', 'Definição das vacinas e do formato ideal', 'Organização de agenda, comunicação e comprovantes', 'Atendimento em casa ou no local da instituição'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#56B0BB]" />
                    <span className="text-[15px] leading-relaxed text-[#5A5A5A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-[85%] max-w-[1280px]">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Atendimento para cada necessidade</h2>
            <p className="mx-auto mt-3 max-w-3xl text-[16px] leading-relaxed text-[#5A5A5A]">
              Organizamos o atendimento conforme o público, o espaço e a rotina de cada cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {segments.map((segment) => (
              <article key={segment.title} className="rounded-[22px] border border-[#EAF4EB] bg-white p-5 shadow-sm transition hover:border-[#56B0BB] hover:shadow-lg">
                <h3 className="text-[19px] font-black text-[#1A3858]">{segment.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5A5A5A]">{segment.text}</p>
                <a href={corporateHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex h-[38px] items-center justify-center rounded-[12px] border border-[#56B0BB] px-4 text-[13px] font-bold text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">
                  Quero saber mais
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F2FBFA] py-12 md:py-16">
        <div className="mx-auto w-[85%] max-w-[1280px]">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Opções de atendimento</h2>
            <p className="mx-auto mt-3 max-w-3xl text-[16px] leading-relaxed text-[#5A5A5A]">
              Consulte as opções cadastradas para ações corporativas, institucionais, domiciliares e check-up vacinal.
            </p>
          </div>

          {campaigns.length === 0 ? (
            <div className="rounded-[24px] bg-[#EAF4EB] p-8 text-center">
              <h3 className="mb-3 text-2xl font-bold text-[#1A3858]">Fale com a equipe para montar seu atendimento.</h3>
              <p className="mb-6 text-[16px] text-[#5A5A5A]">Criamos uma proposta personalizada para sua necessidade.</p>
              <a href={corporateHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-[42px] items-center justify-center rounded-[14px] bg-[#56B0BB] px-6 text-[15px] font-bold text-white transition hover:brightness-105">
                Falar com a equipe
              </a>
            </div>
          ) : (
            <div className={campaigns.length === 1 ? 'flex justify-center' : 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'}>
              {campaigns.map((campaign, index) => (
                <CampaignCard key={campaign.id} campaign={campaign} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto w-[85%] max-w-[960px] rounded-[28px] border border-[#DDEFEA] bg-[#EAF4EB] p-8 text-center shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Quer levar a VacinaOne até você?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-relaxed text-[#5A5A5A]">
            Envie um briefing rápido e nossa equipe retorna com a melhor opção de atendimento.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={corporateHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-[44px] items-center justify-center rounded-[14px] bg-[#FFB703] px-6 text-[15px] font-black text-[#1A3858] transition hover:brightness-105">
              Solicitar atendimento
            </a>
            <Link href="/vacinas" className="inline-flex h-[44px] items-center justify-center rounded-[14px] border border-[#56B0BB] px-6 text-[15px] font-black text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">
              Ver vacinas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
