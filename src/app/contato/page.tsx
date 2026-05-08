import { getUnits, getFaqs } from '@/lib/wordpress';
import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfoCards from '@/components/contact/ContactInfoCards';
import ContactFaq from '@/components/contact/ContactFaq';

export const metadata = {
  title: 'Contato | VacinaOne',
  description: 'Fale com a VacinaOne para agendar vacinação, tirar dúvidas ou solicitar orientação para famílias, empresas e instituições.',
};

export default async function ContactPage() {
  const units = await getUnits();
  const faqs = await getFaqs();

  // Filtrar unidades ativas
  const activeUnits = units.filter(unit => unit.acf?.unidade_ativa !== false);

  // Filtrar FAQs para contato
  const contactFaqs = faqs.filter(faq => faq.acf?.exibir_em_contato && faq.acf?.ativo_no_site);

  return (
    <main>
      {/* Hero Interno */}
      <section className="bg-[#EAF4EB] py-16 md:py-24">
        <div className="w-[85%] max-w-[1570px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="space-y-6">
              <span className="text-sm font-semibold text-[#56B0BB] uppercase tracking-wide">
                Contato VacinaOne
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1A3858] leading-tight">
                Fale com a nossa equipe
              </h1>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                Agende sua vacinação, tire dúvidas ou solicite orientação para sua família, empresa ou instituição.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#formulario-contato"
                  className="inline-flex items-center justify-center bg-[#F0B954] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
                >
                  Agendar Vacinação
                </Link>
                <Link
                  href="#formulario-contato"
                  className="inline-flex items-center justify-center border-2 border-[#56B0BB] text-[#56B0BB] font-bold text-lg px-8 py-4 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
                >
                  Falar no WhatsApp
                </Link>
              </div>
            </div>

            {/* Imagem ou Fallback */}
            <div className="relative">
              <div className="bg-white rounded-[32px] p-8 shadow-lg">
                <div className="w-16 h-16 bg-[#56B0BB] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-[#F0B954] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-[#1A3858] text-center mb-2">
                  Atendimento humanizado
                </h3>
                <p className="text-[#5A5A5A] text-center">
                  Orientação clara para cada etapa.
                </p>
              </div>

              {/* Elementos sobrepostos */}
              <div className="absolute -top-4 -right-4 bg-[#56B0BB] text-white px-4 py-2 rounded-full text-sm font-semibold">
                Resposta rápida
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#F0B954] text-white px-4 py-2 rounded-full text-sm font-semibold">
                Famílias e empresas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canais de Atendimento */}
      <section className="py-16 md:py-24">
        <div className="w-[85%] max-w-[1570px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
              Escolha como falar com a gente
            </h2>
            <p className="text-lg text-[#5A5A5A] max-w-3xl mx-auto">
              Nossa equipe está pronta para orientar você com cuidado, clareza e segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                title: 'WhatsApp',
                text: 'Fale com a equipe para tirar dúvidas ou iniciar um agendamento.',
                cta: 'Falar no WhatsApp',
                href: '#formulario-contato',
                icon: '💬',
              },
              {
                title: 'Agendamento',
                text: 'Envie seus dados e retornaremos com as próximas orientações.',
                cta: 'Preencher formulário',
                href: '#formulario-contato',
                icon: '📝',
              },
              {
                title: 'Empresas',
                text: 'Solicite informações para campanhas de vacinação corporativa.',
                cta: 'Solicitar campanha',
                href: '/empresas',
                icon: '🏢',
              },
              {
                title: 'Unidades',
                text: 'Consulte atendimento, endereço e horário das unidades disponíveis.',
                cta: 'Ver unidades',
                href: '/unidades',
                icon: '🏥',
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white border border-[#EAF4EB] rounded-[28px] p-6 text-center hover:shadow-lg hover:-translate-y-1.5 hover:border-[#56B0BB] transition-all duration-300"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-[#1A3858] mb-3">{card.title}</h3>
                <p className="text-[#5A5A5A] mb-4 leading-relaxed">{card.text}</p>
                <Link
                  href={card.href}
                  className="inline-flex items-center justify-center border border-[#56B0BB] text-[#56B0BB] font-semibold px-6 py-3 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section id="formulario-contato" className="py-16 md:py-24 bg-[#F2FBFA]">
        <div className="w-[85%] max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-[#1A3858]">
                Envie sua mensagem
              </h2>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                Preencha o formulário e nossa equipe retornará com as orientações necessárias.
              </p>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Unidades */}
      <section className="py-16 md:py-24">
        <div className="w-[85%] max-w-[1570px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
              Informações de atendimento
            </h2>
          </div>

          {activeUnits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeUnits.slice(0, 3).map((unit) => (
                <div
                  key={unit.id}
                  className="bg-white border border-[#EAF4EB] rounded-[28px] p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-[#1A3858] mb-3">
                    {unit.acf?.nome_da_unidade || unit.title.rendered.replace(/<[^>]*>/g, '')}
                  </h3>

                  {unit.acf?.endereco_completo && (
                    <p className="text-[#5A5A5A] mb-2">
                      📍 {unit.acf.endereco_completo}
                    </p>
                  )}

                  {unit.acf?.telefone && (
                    <p className="text-[#5A5A5A] mb-2">
                      📞 {unit.acf.telefone}
                    </p>
                  )}

                  {unit.acf?.whatsapp && (
                    <p className="text-[#5A5A5A] mb-2">
                      💬 {unit.acf.whatsapp}
                    </p>
                  )}

                  {unit.acf?.horario_de_funcionamento && (
                    <p className="text-[#5A5A5A] mb-4">
                      🕒 {unit.acf.horario_de_funcionamento}
                    </p>
                  )}

                  {unit.acf?.google_maps_url && (
                    <a
                      href={unit.acf.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#56B0BB] text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
                    >
                      Abrir no mapa
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#EAF4EB] rounded-[28px] p-12 text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#1A3858] mb-4">
                Atendimento VacinaOne
              </h3>
              <p className="text-lg text-[#5A5A5A] mb-6">
                Em breve, as informações completas de atendimento estarão disponíveis aqui.
              </p>
              <Link
                href="#formulario-contato"
                className="inline-flex items-center justify-center bg-[#56B0BB] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
              >
                Falar com a equipe
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      {contactFaqs.length > 0 && (
        <section className="py-16 md:py-24 bg-[#F2FBFA]">
          <div className="w-[85%] max-w-[1280px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
                Dúvidas frequentes
              </h2>
            </div>
            <ContactFaq faqs={contactFaqs} />
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-[#1A3858]">
        <div className="w-[85%] max-w-[1570px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Pronto para cuidar da sua saúde?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Fale com a VacinaOne e receba orientação para agendar sua vacinação com tranquilidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#formulario-contato"
              className="inline-flex items-center justify-center bg-[#F0B954] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
            >
              Agendar Vacinação
            </Link>
            <Link
              href="/vacinas"
              className="inline-flex items-center justify-center border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-white hover:text-[#1A3858] transition-colors duration-200"
            >
              Ver vacinas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
