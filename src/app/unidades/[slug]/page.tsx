import { getUnitBySlug, getUnits } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import UnitContactCard from '@/components/unidades/UnitContactCard';

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const unit = await getUnitBySlug(slug);
  if (!unit) return { title: 'Unidade não encontrada' };
  const name = unit.acf?.nome_da_unidade || unit.title.rendered.replace(/<[^>]*>/g, '');
  return {
    title: `${name} - Unidades VacinaOne`,
    description: unit.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

export async function generateStaticParams() {
  const units = await getUnits();
  return units.map((u) => ({ slug: u.slug }));
}

export default async function UnitPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const unit = await getUnitBySlug(slug);
  if (!unit) notFound();

  const acf = unit.acf ?? {};
  const name = acf.nome_da_unidade || unit.title.rendered.replace(/<[^>]*>/g, '');
  const city = [acf.bairro, acf.cidade, acf.estado].filter(Boolean).join(' · ');
  const hasContent = unit.content.rendered.replace(/<[^>]*>/g, '').trim().length > 0;

  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-[#EAF4EB] py-14">
        <div className="w-[85%] mx-auto max-w-[1280px]">
          <p className="text-[#56B0BB] text-[13px] font-semibold uppercase tracking-widest mb-3">
            Unidades VacinaOne
          </p>
          <h1 className="text-[32px] md:text-[44px] font-black text-[#1A3858] leading-tight mb-3">
            {name}
          </h1>
          {city && (
            <p className="text-[16px] text-[#5A5A5A] font-medium">{city}</p>
          )}
        </div>
      </section>

      {/* Conteúdo principal */}
      <div className="w-[85%] mx-auto max-w-[1280px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* Coluna esquerda */}
          <div className="flex flex-col gap-8">

            {/* Endereço */}
            {(acf.endereco_completo || acf.cep) && (
              <section className="bg-[#F2FBFA] rounded-[20px] p-7">
                <h2 className="text-[17px] font-black text-[#1A3858] mb-4">
                  Endereço
                </h2>
                <div className="flex flex-col gap-1 text-[14px] text-[#5A5A5A]">
                  {acf.endereco_completo && <p>{acf.endereco_completo}</p>}
                  {(acf.bairro || acf.cidade) && (
                    <p>
                      {[acf.bairro, acf.cidade, acf.estado].filter(Boolean).join(', ')}
                    </p>
                  )}
                  {acf.cep && <p>CEP: {acf.cep}</p>}
                </div>
              </section>
            )}

            {/* Horário */}
            {acf.horario_de_funcionamento && (
              <section className="bg-white border border-[#EAF4EB] rounded-[20px] p-7">
                <h2 className="text-[17px] font-black text-[#1A3858] mb-3">
                  Horário de funcionamento
                </h2>
                <p className="text-[14px] text-[#5A5A5A] leading-relaxed whitespace-pre-line">
                  {acf.horario_de_funcionamento}
                </p>
              </section>
            )}

            {/* Conteúdo editorial do WP */}
            {hasContent && (
              <article
                className="prose-vacinaone"
                dangerouslySetInnerHTML={{ __html: unit.content.rendered }}
              />
            )}

            {/* Mapa */}
            {acf.google_maps_embed ? (
              <section>
                <h2 className="text-[17px] font-black text-[#1A3858] mb-4">
                  Como chegar
                </h2>
                <div className="rounded-[24px] overflow-hidden border border-[#EAF4EB] aspect-video">
                  <iframe
                    src={acf.google_maps_embed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa da unidade ${name}`}
                  />
                </div>
              </section>
            ) : acf.google_maps_url ? (
              <a
                href={acf.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#56B0BB] text-[14px] font-bold hover:underline"
              >
                Ver no Google Maps →
              </a>
            ) : null}
          </div>

          {/* Coluna direita — card de contato */}
          <UnitContactCard acf={acf} unitName={name} />
        </div>

        {/* Voltar */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/unidades"
            className="text-[#56B0BB] text-[14px] font-semibold hover:underline"
          >
            ← Ver todas as unidades
          </Link>
        </div>
      </div>
    </main>
  );
}
