import { getUnitBySlug, getUnits } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import UnitContactCard from '@/components/unidades/UnitContactCard';
import { siteContact } from '@/lib/site-config';

interface Params { slug: string }

const OFFICIAL_CITY = 'Parque Taquaral · Campinas · SP';
const OPENING_STATUS = 'Abre em breve';
const OFFICIAL_HOURS = `${OPENING_STATUS} · ${siteContact.hours}`;

function isPlaceholder(value?: string | null) {
  if (!value) return true;
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  return (
    normalized.includes('a definir') ||
    normalized.includes('definir') ||
    normalized.includes('placeholder') ||
    normalized.includes('sem endereco') ||
    normalized.includes('sem horario')
  );
}

function officialOr(value: string | undefined | null, fallback: string) {
  return isPlaceholder(value) ? fallback : value || fallback;
}

function normalizeBrand(value: string) {
  return value.replace(/Vacina\s+One/g, 'VacinaOne').replace(/vacina\s+one/gi, 'VacinaOne');
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const unit = await getUnitBySlug(slug);
  if (!unit) return { title: 'Unidade não encontrada' };
  const name = normalizeBrand(officialOr(unit.acf?.nome_da_unidade || unit.title.rendered.replace(/<[^>]*>/g, ''), 'VacinaOne Campinas'));
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
  const name = normalizeBrand(officialOr(acf.nome_da_unidade || unit.title.rendered.replace(/<[^>]*>/g, ''), 'VacinaOne Campinas'));
  const rawCity = [acf.bairro, acf.cidade, acf.estado].filter(Boolean).join(' · ');
  const city = officialOr(rawCity, OFFICIAL_CITY);
  const address = officialOr(acf.endereco_completo, siteContact.address);
  const hours = officialOr(acf.horario_de_funcionamento, OFFICIAL_HOURS);
  const mapHref = isPlaceholder(acf.google_maps_url) ? siteContact.mapsHref : acf.google_maps_url || siteContact.mapsHref;
  const hasContent = unit.content.rendered.replace(/<[^>]*>/g, '').trim().length > 0;

  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-[#EAF4EB] py-14">
        <div className="w-[85%] mx-auto max-w-[1280px]">
          <p className="text-[#56B0BB] text-[13px] font-semibold uppercase tracking-widest mb-3">
            Unidades VacinaOne
          </p>
          <span className="mb-4 inline-flex rounded-full bg-[rgba(240,185,84,0.16)] px-3 py-1 text-[12px] font-black uppercase tracking-[0.12em] text-[#F0B954]">
            {OPENING_STATUS}
          </span>
          <h1 className="text-[32px] md:text-[44px] font-black text-[#1A3858] leading-tight mb-3">
            {name}
          </h1>
          <p className="text-[16px] text-[#5A5A5A] font-medium">{city}</p>
        </div>
      </section>

      {/* Conteúdo principal */}
      <div className="w-[85%] mx-auto max-w-[1280px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* Coluna esquerda */}
          <div className="flex flex-col gap-8">

            {/* Endereço */}
            <section className="bg-[#F2FBFA] rounded-[20px] p-7">
              <h2 className="text-[17px] font-black text-[#1A3858] mb-4">
                Endereço
              </h2>
              <div className="flex flex-col gap-1 text-[14px] text-[#5A5A5A]">
                <p>{address}</p>
                <p>{city.replace(/ · /g, ', ')}</p>
              </div>
            </section>

            {/* Horário */}
            <section className="bg-white border border-[#EAF4EB] rounded-[20px] p-7">
              <h2 className="text-[17px] font-black text-[#1A3858] mb-3">
                Horário de funcionamento
              </h2>
              <p className="text-[14px] text-[#5A5A5A] leading-relaxed whitespace-pre-line">
                {hours}
              </p>
            </section>

            {/* Conteúdo editorial do WP */}
            {hasContent && (
              <article
                className="prose-vacinaone"
                dangerouslySetInnerHTML={{ __html: unit.content.rendered }}
              />
            )}

            {/* Mapa */}
            {acf.google_maps_embed && !isPlaceholder(acf.google_maps_embed) ? (
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
            ) : (
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#56B0BB] text-[14px] font-bold hover:underline"
              >
                Ver no Google Maps →
              </a>
            )}
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
