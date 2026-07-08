import { getUnits, getFaqs } from '@/lib/wordpress';
import Link from 'next/link';
import WhatsAppContactBox from '@/components/contact/WhatsAppContactBox';
import ContactFaq from '@/components/contact/ContactFaq';
import { getWhatsAppHref } from '@/lib/whatsapp';
import { MessageCircle, Building2, Clock3, Phone, ClipboardList, Hospital, MapPin } from 'lucide-react';
import { siteContact } from '@/lib/site-config';

export const metadata = {
  title: 'Contato | VacinaOne',
  description: 'Fale com a VacinaOne pelo WhatsApp oficial para agendar atendimento, tirar dúvidas ou solicitar orientação para famílias, empresas e instituições.',
};

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

export default async function ContactPage() {
  const units = await getUnits();
  const faqs = await getFaqs();
  const whatsappHref = getWhatsAppHref('Olá! Vim pelo site da VacinaOne e gostaria de atendimento.');
  const appointmentHref = getWhatsAppHref('Olá! Vim pelo site da VacinaOne e quero agendar atendimento.');
  const corporateHref = getWhatsAppHref('Olá! Vim pelo site da VacinaOne e quero falar sobre atendimento para empresas.');

  const activeUnits = units.filter(unit => unit.acf?.unidade_ativa !== false);
  const contactFaqs = faqs.filter(faq => faq.acf?.exibir_em_contato && faq.acf?.ativo_no_site);
  const primaryUnit = activeUnits[0];
  const unitAddress = officialOr(primaryUnit?.acf?.endereco_completo, siteContact.address);
  const unitHours = officialOr(primaryUnit?.acf?.horario_de_funcionamento, siteContact.hours);
  const unitName = officialOr(primaryUnit?.acf?.nome_da_unidade, 'VacinaOne Campinas');
  const unitMapHref = isPlaceholder(primaryUnit?.acf?.google_maps_url) ? siteContact.mapsHref : primaryUnit?.acf?.google_maps_url || siteContact.mapsHref;

  const supportCards = [
    { title: 'Retorno claro', text: 'A equipe responde com orientação objetiva.', Icon: MessageCircle, href: whatsappHref, external: true },
    { title: 'Atendimento completo', text: 'Família, empresas, escolas e casas de repouso.', Icon: Phone, href: whatsappHref, external: true },
    { title: unitName, text: `${unitAddress} · ${unitHours}`, Icon: Hospital, href: unitMapHref, external: true },
  ];

  return (
    <main>
      <section className="bg-[#EAF4EB] py-12 md:py-16">
        <div className="mx-auto w-[85%] max-w-[1280px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div className="space-y-5">
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#56B0BB]">Contato oficial VacinaOne</span>
              <h1 className="text-3xl font-black leading-tight text-[#1A3858] md:text-5xl">Fale com a nossa equipe</h1>
              <p className="max-w-[640px] text-[17px] leading-relaxed text-[#5A5A5A]">
                Atendimento pelo WhatsApp oficial da VacinaOne para agendamentos, dúvidas, empresas, escolas e instituições.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={appointmentHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-[44px] items-center justify-center rounded-[14px] bg-[#25D366] px-6 text-[15px] font-black text-white transition hover:brightness-105">
                  Falar no WhatsApp
                </a>
                <Link href="#atendimento-whatsapp" className="inline-flex h-[44px] items-center justify-center rounded-[14px] border border-[#56B0BB] px-6 text-[15px] font-black text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">
                  Ver assuntos atendidos
                </Link>
              </div>
            </div>

            <div className="rounded-[26px] border border-[#DDEFEA] bg-white p-6 shadow-sm">
              <h2 className="text-[20px] font-black text-[#1A3858]">Dados oficiais</h2>
              <div className="mt-5 space-y-4">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[18px] border border-[#EAF4EB] p-4 transition hover:border-[#56B0BB] hover:shadow-sm">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  <span className="text-[14px] font-bold text-[#1A3858]">{siteContact.phone}</span>
                </a>
                <a href={unitMapHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 rounded-[18px] border border-[#EAF4EB] p-4 transition hover:border-[#56B0BB] hover:shadow-sm">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#56B0BB]" />
                  <span className="text-[14px] font-bold text-[#1A3858]">{unitAddress}</span>
                </a>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 rounded-[18px] border border-[#EAF4EB] p-4 transition hover:border-[#56B0BB] hover:shadow-sm">
                  <Clock3 className="mt-0.5 h-5 w-5 text-[#56B0BB]" />
                  <span className="text-[14px] font-bold text-[#1A3858]">{unitHours}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-[85%] max-w-[1280px]">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Escolha o melhor caminho</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-relaxed text-[#5A5A5A]">
              Use o WhatsApp oficial para atendimento imediato ou acesse as áreas do site.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: 'WhatsApp', text: 'Atendimento rápido para dúvidas e agendamentos.', cta: 'Abrir WhatsApp', href: whatsappHref, external: true, Icon: MessageCircle },
              { title: 'Assuntos', text: 'Veja os temas atendidos pela equipe.', cta: 'Ver assuntos', href: '#atendimento-whatsapp', external: false, Icon: ClipboardList },
              { title: 'Empresas', text: 'Campanhas para empresas, escolas e instituições.', cta: 'Solicitar', href: corporateHref, external: true, Icon: Building2 },
              { title: 'Unidades', text: 'Endereço, horário e rota de atendimento.', cta: 'Ver unidades', href: '/unidades', external: false, Icon: Hospital },
            ].map((card) => (
              <div key={card.title} className="rounded-[22px] border border-[#EAF4EB] bg-white p-5 text-left transition hover:border-[#56B0BB] hover:shadow-lg">
                <card.Icon className="h-6 w-6 text-[#56B0BB]" strokeWidth={1.8} />
                <h3 className="mt-4 text-[18px] font-black text-[#1A3858]">{card.title}</h3>
                <p className="mt-2 min-h-[46px] text-[14px] leading-relaxed text-[#5A5A5A]">{card.text}</p>
                {card.external ? (
                  <a href={card.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex h-[38px] items-center justify-center rounded-[12px] border border-[#56B0BB] px-4 text-[13px] font-bold text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">{card.cta}</a>
                ) : (
                  <Link href={card.href} className="mt-4 inline-flex h-[38px] items-center justify-center rounded-[12px] border border-[#56B0BB] px-4 text-[13px] font-bold text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">{card.cta}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="atendimento-whatsapp" className="bg-[#EAF4EB] py-12 md:py-16">
        <div className="mx-auto w-[85%] max-w-[1180px]">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-5">
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#56B0BB]">Atendimento</span>
              <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Atendimento pelo WhatsApp</h2>
              <p className="text-[16px] leading-relaxed text-[#5A5A5A]">
                Fale diretamente com a equipe sobre agendamento, famílias, empresas, escolas, domicílio ou check-up vacinal.
              </p>
              <div className="space-y-3">
                {supportCards.map((item) => (
                  <a key={item.title} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="block rounded-[18px] border border-[#DDEFEA] bg-white p-4 shadow-sm transition hover:border-[#56B0BB] hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <item.Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#56B0BB]" strokeWidth={1.8} />
                      <div>
                        <h3 className="font-bold text-[#1A3858]">{item.title}</h3>
                        <p className="text-sm text-[#5A5A5A]">{item.text}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <WhatsAppContactBox />
          </div>
        </div>
      </section>

      {contactFaqs.length > 0 && (
        <section className="bg-[#F2FBFA] py-12 md:py-16">
          <div className="mx-auto w-[85%] max-w-[1120px]">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Dúvidas frequentes</h2>
            </div>
            <ContactFaq faqs={contactFaqs} />
          </div>
        </section>
      )}

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto w-[85%] max-w-[960px] rounded-[28px] border border-[#DDEFEA] bg-[#F2FBFA] p-8 text-center shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-[#1A3858] md:text-4xl">Pronto para falar com a equipe?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-relaxed text-[#5A5A5A]">
            Use o WhatsApp oficial para atendimento imediato ou consulte a lista de vacinas disponíveis.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={appointmentHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-[44px] items-center justify-center rounded-[14px] bg-[#25D366] px-6 text-[15px] font-black text-white transition hover:brightness-105">Falar no WhatsApp</a>
            <Link href="/vacinas" className="inline-flex h-[44px] items-center justify-center rounded-[14px] border border-[#56B0BB] px-6 text-[15px] font-black text-[#56B0BB] transition hover:bg-[#56B0BB] hover:text-white">Ver lista de vacinas</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
