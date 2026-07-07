import { getVaccineBySlug, getVaccines } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import VaccineSummaryCard from '@/components/vacinas/VaccineSummaryCard';
import { VaccineAcf } from '@/types/wordpress';
import { getWhatsAppHref } from '@/lib/whatsapp';

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const vaccine = await getVaccineBySlug(slug);
  if (!vaccine) return { title: 'Vacina não encontrada' };
  const name = vaccine.acf?.nome_popular || vaccine.title.rendered.replace(/<[^>]*>/g, '');
  const desc = vaccine.acf?.descricao_curta || vaccine.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160);
  return {
    title: `${name} | VacinaOne`,
    description: desc,
  };
}

export async function generateStaticParams() {
  const vaccines = await getVaccines();
  return vaccines.map((v) => ({ slug: v.slug }));
}

// Bloco informativo reutilizável
function InfoBlock({ title, content }: { title: string; content: string }) {
  if (!content.trim()) return null;
  return (
    <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
      <h2 className="text-[22px] font-black text-[#1A3858] mb-4">{title}</h2>
      <p className="text-[16px] text-[#5A5A5A] leading-[1.75] whitespace-pre-line">{content}</p>
    </div>
  );
}

export default async function VaccinePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const vaccine = await getVaccineBySlug(slug);
  if (!vaccine) notFound();

  const acf: VaccineAcf = vaccine.acf ?? {};
  const name = acf.nome_popular || vaccine.title.rendered.replace(/<[^>]*>/g, '');
  const desc = acf.descricao_curta || vaccine.excerpt.rendered.replace(/<[^>]*>/g, '');
  const available = acf.disponivel_para_agendamento !== false;
  const ctaText = acf.cta_texto || 'Agendar Vacinação';
  const appointmentHref = getWhatsAppHref(
    `Olá! Vim pelo site da VacinaOne e quero agendar a vacina ${name}.`
  );
  const hasContent = vaccine.content.rendered.replace(/<[^>]*>/g, '').trim().length > 0;

  const infoBlocks: { title: string; field: keyof VaccineAcf }[] = [
    { title: 'Indicação', field: 'indicacao' },
    { title: 'Faixa etária', field: 'faixa_etaria' },
    { title: 'Número de doses', field: 'numero_de_doses' },
    { title: 'Esquema vacinal', field: 'esquema_vacinal' },
    { title: 'Reforço', field: 'reforco' },
    { title: 'Contraindicações', field: 'contraindicacoes' },
    { title: 'Cuidados antes', field: 'cuidados_antes' },
    { title: 'Cuidados depois', field: 'cuidados_depois' },
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
                Vacinas VacinaOne
              </p>
              <h1 className="text-[40px] md:text-[60px] font-black text-[#1A3858] leading-[1.05] tracking-tight mb-5">
                {name}
              </h1>
              {desc && (
                <p className="text-[18px] text-[#5A5A5A] max-w-[640px] leading-relaxed mb-7">
                  {desc}
                </p>
              )}
              {available ? (
                <a
                  href={appointmentHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Agendar vacinação: ${name}`}
                  className="inline-flex items-center bg-[#F0B954] text-white font-black text-[16px] px-9 py-4 rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
                >
                  {ctaText}
                </a>
              ) : (
                <p className="text-[14px] text-[#5A5A5A] italic">
                  Consulte nossa equipe para verificar disponibilidade.
                </p>
              )}
            </div>

            {/* Direita — resumo no hero */}
            <div className="lg:w-[300px] flex-shrink-0">
              <VaccineSummaryCard acf={acf} vaccineName={name} />
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <div className="w-[85%] mx-auto max-w-[1280px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

          {/* Coluna esquerda */}
          <div className="flex flex-col gap-6">
            {/* Visão geral (content.rendered) */}
            {hasContent && (
              <div className="bg-white border border-[#EAF4EB] rounded-[28px] p-8">
                <h2 className="text-[22px] font-black text-[#1A3858] mb-4">Visão geral</h2>
                <article
                  className="prose-vacinaone"
                  dangerouslySetInnerHTML={{ __html: vaccine.content.rendered }}
                />
              </div>
            )}

            {/* Blocos ACF */}
            {infoBlocks.map(({ title, field }) => {
              const value = acf[field];
              if (!value || typeof value !== 'string') return null;
              return <InfoBlock key={field} title={title} content={value} />;
            })}
          </div>

          {/* Sidebar — oculta no mobile (já aparece no hero) */}
          <div className="hidden lg:block">
            <VaccineSummaryCard acf={acf} vaccineName={name} />
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-14 bg-[#EAF4EB] rounded-[32px] px-10 py-14 text-center">
          <h2 className="text-[26px] font-black text-[#1A3858] mb-3">
            Quer orientação antes de se vacinar?
          </h2>
          <p className="text-[16px] text-[#5A5A5A] mb-7 max-w-[480px] mx-auto leading-relaxed">
            Nossa equipe pode ajudar você a entender indicações, cuidados e próximos passos com segurança.
          </p>
          <a
            href={appointmentHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar vacinação na VacinaOne"
            className="inline-flex items-center bg-[#F0B954] text-white font-black text-[16px] px-10 py-4 rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
          >
            Agendar Vacinação
          </a>
        </div>

        {/* Voltar */}
        <div className="mt-8 flex justify-center">
          <Link href="/vacinas" className="text-[#56B0BB] text-[14px] font-semibold hover:underline">
            ← Voltar para Vacinas
          </Link>
        </div>
      </div>
    </main>
  );
}
