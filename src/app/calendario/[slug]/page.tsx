import { getVaccineCalendarBySlug, getVaccineCalendar } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CalendarSidebar from '@/components/calendario/CalendarSidebar';
import { CalendarAcf } from '@/types/wordpress';

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = await getVaccineCalendarBySlug(slug);
  if (!item) return { title: 'Calendário não encontrado' };
  const name = item.acf?.titulo_publico || item.title.rendered.replace(/<[^>]*>/g, '');
  const desc = item.acf?.descricao_curta || item.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160);
  return {
    title: `${name} | Calendário Vacinal | VacinaOne`,
    description: desc,
  };
}

export async function generateStaticParams() {
  const items = await getVaccineCalendar();
  return items.map((i) => ({ slug: i.slug }));
}

function InfoBlock({ title, content }: { title: string; content: string }) {
  if (!content.trim()) return null;
  return (
    <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
      <h2 className="text-[20px] font-black text-[#1A3858] mb-4">{title}</h2>
      <p className="text-[15px] text-[#5A5A5A] leading-[1.75] whitespace-pre-line">{content}</p>
    </div>
  );
}

export default async function CalendarItemPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = await getVaccineCalendarBySlug(slug);
  if (!item) notFound();

  const acf: CalendarAcf = item.acf ?? {};
  const name = acf.titulo_publico || item.title.rendered.replace(/<[^>]*>/g, '');
  const desc = acf.descricao_curta || item.excerpt.rendered.replace(/<[^>]*>/g, '');
  const ctaText = acf.cta_texto || 'Agendar Vacinação';
  const ctaUrl = acf.cta_url || '/contato';
  const hasContent = item.content.rendered.replace(/<[^>]*>/g, '').trim().length > 0;

  const summaryRows = [
    acf.publico_alvo && { label: 'Público', value: acf.publico_alvo },
    acf.faixa_etaria && { label: 'Faixa etária', value: acf.faixa_etaria },
    acf.ordem_de_exibicao != null && { label: 'Ordem', value: String(acf.ordem_de_exibicao) },
    acf.ativo_no_site != null && { label: 'Status', value: acf.ativo_no_site ? 'Ativo' : 'Inativo' },
  ].filter(Boolean) as { label: string; value: string }[];

  const infoBlocks: { title: string; field: keyof CalendarAcf }[] = [
    { title: 'Faixa etária', field: 'faixa_etaria' },
    { title: 'Público-alvo', field: 'publico_alvo' },
    { title: 'Observações importantes', field: 'observacoes_importantes' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-[#EAF4EB] py-14">
        <div className="w-[85%] mx-auto max-w-[1280px]">
          <div className="bg-[#EAF4EB] rounded-[32px] px-10 py-14 flex flex-col lg:flex-row lg:items-start gap-10">
            {/* Esquerda */}
            <div className="flex-1">
              <p className="text-[#56B0BB] text-[13px] font-semibold uppercase tracking-widest mb-3">
                Calendário Vacinal
              </p>
              <h1 className="text-[38px] md:text-[56px] font-black text-[#1A3858] leading-[1.05] tracking-tight mb-5">
                {name}
              </h1>
              {desc && (
                <p className="text-[17px] text-[#5A5A5A] max-w-[580px] leading-relaxed mb-7">
                  {desc}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={ctaUrl}
                  aria-label={`Agendar vacinação — ${name}`}
                  className="inline-flex items-center bg-[#F0B954] text-white font-black text-[15px] px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
                >
                  {ctaText}
                </Link>
                <Link
                  href="/calendario"
                  className="inline-flex items-center border-2 border-[#1A3858] text-[#1A3858] font-bold text-[14px] px-6 py-4 rounded-full hover:bg-[#1A3858] hover:text-white transition-colors duration-200"
                >
                  ← Voltar para calendários
                </Link>
              </div>
            </div>

            {/* Card resumo */}
            {summaryRows.length > 0 && (
              <div className="lg:w-[280px] flex-shrink-0 bg-white border border-[rgba(86,176,187,0.25)] rounded-[28px] p-7 shadow-sm">
                <h2 className="text-[15px] font-black text-[#1A3858] mb-5">
                  Resumo do calendário
                </h2>
                <div className="flex flex-col gap-3">
                  {summaryRows.map((row) => (
                    <div key={row.label} className="flex flex-col gap-0.5 pb-3 border-b border-[#EAF4EB] last:border-0 last:pb-0">
                      <span className="text-[11px] text-[#5A5A5A] uppercase tracking-wide">{row.label}</span>
                      <span className="text-[13px] font-semibold text-[#1A3858]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <div className="w-[85%] mx-auto max-w-[1280px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">

          {/* Coluna esquerda */}
          <div className="flex flex-col gap-6">
            {hasContent && (
              <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
                <h2 className="text-[20px] font-black text-[#1A3858] mb-4">
                  Sobre este calendário
                </h2>
                <article
                  className="prose-vacinaone"
                  dangerouslySetInnerHTML={{ __html: item.content.rendered }}
                />
              </div>
            )}

            {infoBlocks.map(({ title, field }) => {
              const value = acf[field];
              if (!value || typeof value !== 'string') return null;
              return <InfoBlock key={field} title={title} content={value} />;
            })}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <CalendarSidebar calendarName={name} />
          </div>
        </div>

        {/* Sidebar mobile */}
        <div className="lg:hidden mt-8">
          <CalendarSidebar calendarName={name} />
        </div>

        {/* CTA final */}
        <div className="mt-14 bg-[#EAF4EB] rounded-[32px] px-10 py-14 text-center">
          <h2 className="text-[24px] font-black text-[#1A3858] mb-3">
            Quer revisar seu calendário vacinal?
          </h2>
          <p className="text-[15px] text-[#5A5A5A] mb-7 max-w-[460px] mx-auto leading-relaxed">
            Fale com a equipe VacinaOne e receba orientação com cuidado e clareza.
          </p>
          <Link
            href="/contato"
            aria-label="Agendar vacinação na VacinaOne"
            className="inline-flex items-center bg-[#F0B954] text-white font-black text-[16px] px-10 py-4 rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
          >
            Agendar Vacinação
          </Link>
        </div>

        {/* Voltar */}
        <div className="mt-8 flex justify-center">
          <Link href="/calendario" className="text-[#56B0BB] text-[14px] font-semibold hover:underline">
            ← Ver todos os calendários
          </Link>
        </div>
      </div>
    </main>
  );
}
