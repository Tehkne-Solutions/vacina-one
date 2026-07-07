import { getCorporateCampaigns } from '@/lib/wordpress';
import Link from 'next/link';
import CampaignCard from '@/components/empresas/CampaignCard';
import { getWhatsAppHref } from '@/lib/whatsapp';

export const metadata = {
  title: 'Vacinação para Empresas | VacinaOne',
  description: 'Campanhas de vacinação para empresas, escolas, casas de repouso e instituições com orientação da VacinaOne.',
};

export default async function CorporatePage() {
  const campaigns = await getCorporateCampaigns();
  const corporateHref = getWhatsAppHref(
    'Olá! Vim pelo site da VacinaOne e quero solicitar uma campanha para empresa, escola ou instituição.'
  );

  const segments = [
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
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#56B0BB]">Empresas e instituições</span>
              <h1 className="text-3xl font-black leading-tight text-[#1A3858] md:text-5xl">
                Campanhas para equipes, escolas e casas de repouso
              </h1>
              <p className="text-[17px] leading-relaxed text-[#5A5A5A]">
                A VacinaOne ajuda sua instituição a planejar, comunicar e executar ações de vacinação com organização, acolhimento e controle de atendimento.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={corporateHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-[44px] items-center justify-center rounded-[14px] bg-[#F0B954] px-6 text-[15px] font-black text-white transition hover:brightness-105">
                  Solicitar proposta
                </a>
                <Link href="/contato#formulario-contato" className="inline-flex h-[44px] items-center justify-center rounded-[14px] border border-[#56B0BB] px-6 text-[15px] font-black text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">
                  Enviar briefing
                </Link>
              </div>
            </div>

            <div className="rounded-[26px] border border-[rgba(86,176,187,0.25)] bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-[20px] font-black text-[#1A3858]">Como funciona</h3>
              <ul className="space-y-3">
                {['Levantamento do público e objetivo da campanha', 'Definição das vacinas e formato de atendimento', 'Organização de agenda, comunicação e comprovantes', 'Atendimento na clínica, em domicílio ou no local'].map((item) => (
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
            <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Atendimento por tipo de instituição</h2>
            <p className="mx-auto mt-3 max-w-3xl text-[16px] leading-relaxed text-[#5A5A5A]">
              Cada campanha precisa de uma comunicação e operação diferente. Organizamos o formato conforme o perfil do público.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {segments.map((segment) => (
              <article key={segment.title} className="rounded-[22px] border border-[#EAF4EB] bg-white p-6 shadow-sm transition hover:border-[#56B0BB] hover:shadow-lg">
                <h3 className="text-[20px] font-black text-[#1A3858]">{segment.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#5A5A5A]">{segment.text}</p>
                <a href={corporateHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex h-[38px] items-center justify-center rounded-[12px] border border-[#56B0BB] px-4 text-[13px] font-bold text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">
                  Falar sobre {segment.title.toLowerCase()}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F2FBFA] py-12 md:py-16">
        <div className="mx-auto w-[85%] max-w-[1280px]">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Campanhas disponíveis</h2>
            <p className="mx-auto mt-3 max-w-3xl text-[16px] leading-relaxed text-[#5A5A5A]">
              Consulte as opções cadastradas para ações corporativas, institucionais, domiciliares e check-up vacinal.
            </p>
          </div>

          {campaigns.length === 0 ? (
            <div className="rounded-[24px] bg-[#EAF4EB] p-8 text-center">
              <h3 className="mb-3 text-2xl font-bold text-[#1A3858]">Nenhuma campanha cadastrada ainda.</h3>
              <p className="mb-6 text-[16px] text-[#5A5A5A]">Fale com a equipe para montar uma proposta personalizada.</p>
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
          <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Quer organizar uma campanha?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-relaxed text-[#5A5A5A]">
            Envie um briefing rápido e a equipe da VacinaOne retorna com orientação de formato, vacinas e próximos passos.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={corporateHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-[44px] items-center justify-center rounded-[14px] bg-[#F0B954] px-6 text-[15px] font-black text-white transition hover:brightness-105">
              Solicitar proposta
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
