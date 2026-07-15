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

function InfoBlock({ title, content }: { title: string; content: string }) {
  if (!content.trim()) return null;
  return (
    <div className="rounded-[24px] border border-[#EAF4EB] bg-white p-7">
      <h2 className="mb-3 text-[21px] font-black text-[#1A3858]">{title}</h2>
      <p className="whitespace-pre-line text-[15px] leading-[1.7] text-[#5A5A5A]">{content}</p>
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
      <section className="border-b border-[#EAF4EB] bg-white py-12">
        <div className="mx-auto w-[85%] max-w-[1240px]">
          <div className="flex flex-col gap-8 rounded-[28px] bg-[#EAF4EB] px-7 py-10 lg:flex-row lg:items-start lg:px-9">
            <div className="flex-1">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-widest text-[#56B0BB]">Vacinas VacinaOne</p>
              <h1 className="mb-4 text-[36px] font-black leading-[1.05] tracking-tight text-[#1A3858] md:text-[52px]">{name}</h1>
              {desc && <p className="mb-6 max-w-[640px] text-[16px] leading-relaxed text-[#5A5A5A]">{desc}</p>}
              {available ? (
                <a
                  href={appointmentHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Agendar vacinação: ${name}`}
                  className="inline-flex h-[48px] items-center rounded-[14px] bg-[#FFB703] px-8 text-[15px] font-black text-[#1A3858] shadow-md transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  {ctaText}
                </a>
              ) : (
                <p className="text-[14px] italic text-[#5A5A5A]">Consulte nossa equipe para verificar disponibilidade.</p>
              )}
            </div>

            <div className="flex-shrink-0 lg:w-[300px]">
              <VaccineSummaryCard acf={acf} vaccineName={name} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-[85%] max-w-[1240px] py-11">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_300px]">
          <div className="flex flex-col gap-5">
            {hasContent && (
              <div className="rounded-[24px] border border-[#EAF4EB] bg-white p-7">
                <h2 className="mb-3 text-[21px] font-black text-[#1A3858]">Visão geral</h2>
                <article className="prose-vacinaone" dangerouslySetInnerHTML={{ __html: vaccine.content.rendered }} />
              </div>
            )}

            {infoBlocks.map(({ title, field }) => {
              const value = acf[field];
              if (!value || typeof value !== 'string') return null;
              return <InfoBlock key={field} title={title} content={value} />;
            })}
          </div>

          <div className="hidden lg:block">
            <VaccineSummaryCard acf={acf} vaccineName={name} />
          </div>
        </div>

        <div className="mt-11 rounded-[28px] bg-[#EAF4EB] px-8 py-11 text-center">
          <h2 className="mb-3 text-[25px] font-black text-[#1A3858]">Quer orientação antes de se vacinar?</h2>
          <p className="mx-auto mb-6 max-w-[480px] text-[15px] leading-relaxed text-[#5A5A5A]">
            Nossa equipe pode ajudar você a entender indicações, cuidados e próximos passos com segurança.
          </p>
          <a
            href={appointmentHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar vacinação na VacinaOne"
            className="inline-flex h-[48px] items-center rounded-[14px] bg-[#FFB703] px-8 text-[15px] font-black text-[#1A3858] shadow-md transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Agendar Vacinação
          </a>
        </div>

        <div className="mt-7 flex justify-center">
          <Link href="/vacinas" className="text-[14px] font-semibold text-[#56B0BB] hover:underline">
            ← Ver outras Vacinas
          </Link>
        </div>
      </div>
    </main>
  );
}
