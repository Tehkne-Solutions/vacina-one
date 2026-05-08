import { getCorporateCampaignBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CampaignSidebar from '@/components/empresas/CampaignSidebar';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const campaign = await getCorporateCampaignBySlug(slug);

  if (!campaign) {
    return {
      title: 'Campanha não encontrada | VacinaOne',
    };
  }

  const acf = campaign.acf ?? {};
  const title = acf.titulo_publico || campaign.title.rendered.replace(/<[^>]*>/g, '');
  const description = acf.descricao_curta || campaign.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160);

  return {
    title: `${title} | VacinaOne Empresas`,
    description,
  };
}

export default async function CorporateCampaignPage({ params }: PageProps) {
  const { slug } = await params;
  const campaign = await getCorporateCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const acf = campaign.acf ?? {};
  const title = acf.titulo_publico || campaign.title.rendered;
  const description = acf.descricao_curta || campaign.excerpt.rendered.replace(/<[^>]*>/g, '');
  const primaryCtaText = acf.cta_primario_texto || 'Solicitar Campanha';
  const primaryCtaUrl = acf.cta_primario_url || '/contato';
  const secondaryCtaText = acf.cta_secundario_texto || 'Falar com a equipe';
  const secondaryCtaUrl = acf.cta_secundario_url || '/contato';
  const whatsappUrl = acf.whatsapp_cta && acf.whatsapp_cta.startsWith('http') ? acf.whatsapp_cta : null;

  const summaryItems = [
    acf.publico_alvo && { label: 'Público-alvo', value: acf.publico_alvo },
    acf.modelo_de_atendimento && { label: 'Modelo de atendimento', value: acf.modelo_de_atendimento },
    acf.regioes_atendidas && { label: 'Regiões atendidas', value: acf.regioes_atendidas },
    acf.quantidade_minima_colaboradores && { label: 'Colaboradores mínimos', value: acf.quantidade_minima_colaboradores },
    acf.prazo_para_agendamento && { label: 'Prazo para agendamento', value: acf.prazo_para_agendamento },
    acf.ativo_no_site !== undefined && { label: 'Ativo no site', value: acf.ativo_no_site ? 'Sim' : 'Não' },
  ].filter(Boolean) as { label: string; value: string | number | boolean }[];

  return (
    <main className="pb-16">
      {/* Hero da Single */}
      <section className="bg-[#EAF4EB] py-12 md:py-16">
        <div className="w-[85%] max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Texto */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-black text-[#1A3858] leading-tight">
                {title}
              </h1>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={primaryCtaUrl}
                  className="inline-flex items-center justify-center bg-[#F0B954] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
                >
                  {primaryCtaText}
                </Link>
                <Link
                  href={secondaryCtaUrl}
                  className="inline-flex items-center justify-center border-2 border-[#56B0BB] text-[#56B0BB] font-bold text-lg px-8 py-4 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
                >
                  {secondaryCtaText}
                </Link>
              </div>
            </div>

            {/* Card Resumo */}
            <div className="bg-white border border-[rgba(86,176,187,0.25)] rounded-[28px] p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#1A3858] mb-6">
                Resumo da campanha
              </h3>
              {summaryItems.length > 0 && (
                <div className="space-y-4">
                  {summaryItems.map((item, index) => (
                    <div key={index} className="border-b border-[#EAF4EB] pb-3 last:border-b-0 last:pb-0">
                      <div className="text-sm text-[#5A5A5A]">{item.label}</div>
                      <div className="text-[#1A3858] font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12 md:py-16">
        <div className="w-[85%] max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Coluna Esquerda */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sobre a campanha */}
              {campaign.content.rendered && (
                <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
                  <h2 className="text-2xl font-bold text-[#1A3858] mb-6">
                    Sobre a campanha
                  </h2>
                  <div
                    className="prose prose-vacinaone max-w-none"
                    dangerouslySetInnerHTML={{ __html: campaign.content.rendered }}
                  />
                </div>
              )}

              {/* Benefícios */}
              {acf.beneficios && (
                <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
                  <h2 className="text-2xl font-bold text-[#1A3858] mb-6">
                    Benefícios
                  </h2>
                  {Array.isArray(acf.beneficios) ? (
                    <ul className="space-y-3">
                      {acf.beneficios.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-[#56B0BB] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-[#5A5A5A]">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-[#5A5A5A] whitespace-pre-line">{acf.beneficios}</div>
                  )}
                </div>
              )}

              {/* Público-alvo */}
              {acf.publico_alvo && (
                <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
                  <h2 className="text-2xl font-bold text-[#1A3858] mb-6">
                    Público-alvo
                  </h2>
                  <p className="text-[#5A5A5A]">{acf.publico_alvo}</p>
                </div>
              )}

              {/* Vacinas disponíveis */}
              {acf.vacinas_disponiveis && (
                <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
                  <h2 className="text-2xl font-bold text-[#1A3858] mb-6">
                    Vacinas disponíveis
                  </h2>
                  {Array.isArray(acf.vacinas_disponiveis) ? (
                    <ul className="space-y-2">
                      {acf.vacinas_disponiveis.map((vaccine: any, index: number) => (
                        <li key={index} className="text-[#5A5A5A]">
                          {typeof vaccine === 'string' ? vaccine : vaccine?.nome || vaccine?.title || 'Vacina'}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#5A5A5A]">{acf.vacinas_disponiveis}</p>
                  )}
                </div>
              )}

              {/* Modelo de atendimento */}
              {acf.modelo_de_atendimento && (
                <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
                  <h2 className="text-2xl font-bold text-[#1A3858] mb-6">
                    Modelo de atendimento
                  </h2>
                  <p className="text-[#5A5A5A]">{acf.modelo_de_atendimento}</p>
                </div>
              )}

              {/* Regiões atendidas */}
              {acf.regioes_atendidas && (
                <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
                  <h2 className="text-2xl font-bold text-[#1A3858] mb-6">
                    Regiões atendidas
                  </h2>
                  <p className="text-[#5A5A5A]">{acf.regioes_atendidas}</p>
                </div>
              )}

              {/* Prazo para agendamento */}
              {acf.prazo_para_agendamento && (
                <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
                  <h2 className="text-2xl font-bold text-[#1A3858] mb-6">
                    Prazo para agendamento
                  </h2>
                  <p className="text-[#5A5A5A]">{acf.prazo_para_agendamento}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CampaignSidebar campaignName={title} whatsappUrl={whatsappUrl} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-16 bg-[#EAF4EB]">
        <div className="w-[85%] max-w-[1280px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
            Quer proteger sua equipe com mais organização?
          </h2>
          <p className="text-lg text-[#5A5A5A] mb-8 max-w-2xl mx-auto">
            Fale com a VacinaOne e planeje uma campanha de vacinação com cuidado, clareza e segurança.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center bg-[#F0B954] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
          >
            Solicitar Campanha
          </Link>
        </div>
      </section>
    </main>
  );
}