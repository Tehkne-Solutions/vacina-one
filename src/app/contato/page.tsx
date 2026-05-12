import { getUnits, getFaqs } from '@/lib/wordpress';
import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfoCards from '@/components/contact/ContactInfoCards';
import ContactFaq from '@/components/contact/ContactFaq';
import { MessageCircle, ClipboardList, Building2, Hospital, UsersRound, Phone, Clock3 } from 'lucide-react';

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

            {/* Card Visual */}
            <div className="relative">
              <div className="bg-white rounded-[32px] p-8 shadow-lg min-h-[320px] flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#56B0BB] rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1A3858]">
                        Atendimento humanizado
                      </h3>
                      <p className="text-sm text-[#5A5A5A]">
                        Orientação clara para cada etapa
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F9FCFB] rounded-[16px] p-4 text-center">
                      <div className="w-8 h-8 bg-[#56B0BB] rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-sm">⚡</span>
                      </div>
                      <p className="text-xs font-semibold text-[#1A3858]">Resposta rápida</p>
                    </div>
                    <div className="bg-[#F9FCFB] rounded-[16px] p-4 text-center">
                      <div className="w-8 h-8 bg-[#F0B954] rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-sm">👥</span>
                      </div>
                      <p className="text-xs font-semibold text-[#1A3858]">Famílias e empresas</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-[#5A5A5A]">
                      Nossa equipe está pronta para ajudar
                    </p>
                  </div>
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#F0B954] rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#56B0BB] rounded-full opacity-30"></div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                title: 'WhatsApp',
                text: 'Fale com a equipe para tirar dúvidas ou iniciar um agendamento.',
                cta: 'Falar no WhatsApp',
                href: '#formulario-contato',
                Icon: MessageCircle,
              },
              {
                title: 'Agendamento',
                text: 'Envie seus dados e retornaremos com as próximas orientações.',
                cta: 'Preencher formulário',
                href: '#formulario-contato',
                Icon: ClipboardList,
              },
              {
                title: 'Empresas',
                text: 'Solicite informações para campanhas de vacinação corporativa.',
                cta: 'Solicitar campanha',
                href: '/empresas',
                Icon: Building2,
              },
              {
                title: 'Unidades',
                text: 'Consulte atendimento, endereço e horário das unidades disponíveis.',
                cta: 'Ver unidades',
                href: '/unidades',
                Icon: Hospital,
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white border border-[#EAF4EB] rounded-[28px] p-8 text-center hover:shadow-xl hover:-translate-y-2 hover:border-[#56B0BB] transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#EAF4EB] border border-[rgba(86,176,187,0.25)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <card.Icon size={32} stroke="#1A3858" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold text-[#1A3858] mb-4">{card.title}</h3>
                <p className="text-[#5A5A5A] mb-6 leading-relaxed">{card.text}</p>
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
      <section id="formulario-contato" className="py-20 md:py-28 bg-[#EAF4EB]">
        <div className="w-[85%] max-w-[1370px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
                  Envie sua mensagem
                </h2>
                <p className="text-lg text-[#5A5A5A] leading-relaxed">
                  Preencha o formulário e nossa equipe retornará com as orientações necessárias.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Retorno com orientação clara',
                    text: 'Nossa equipe analisa sua solicitação e responde com cuidado.',
                    Icon: MessageCircle,
                  },
                  {
                    title: 'Atendimento para famílias e empresas',
                    text: 'Tire dúvidas sobre vacinas, campanhas e agendamentos.',
                    Icon: UsersRound,
                  },
                  {
                    title: 'Canal direto com a equipe',
                    text: 'Use o formulário ou fale pelo WhatsApp.',
                    Icon: Phone,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#DDEFEA] rounded-[20px] p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white border border-[rgba(86,176,187,0.25)] rounded-[16px] flex items-center justify-center flex-shrink-0">
                        <item.Icon size={24} stroke="#1A3858" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1A3858] mb-1">{item.title}</h3>
                        <p className="text-sm text-[#5A5A5A]">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Unidades */}
      <section className="py-16 md:py-24">
        <div className="w-[85%] max-w-[1370px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
              Informações de atendimento
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Unidade',
                subtitle: 'Vacina One Campinas',
                text: 'Endereço a definir · Campinas - SP',
                Icon: Hospital,
              },
              {
                title: 'Horário',
                subtitle: 'Atendimento sob agendamento',
                text: 'Confirme disponibilidade antes de se deslocar.',
                Icon: Clock3,
              },
              {
                title: 'Canais',
                subtitle: 'WhatsApp e formulário',
                text: 'Escolha o canal mais confortável para falar com a equipe.',
                Icon: MessageCircle,
              },
            ].map((info, index) => (
              <div
                key={index}
                className="bg-white border border-[#EAF4EB] rounded-[24px] p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-[#EAF4EB] border border-[rgba(86,176,187,0.25)] rounded-[16px] flex items-center justify-center mb-4">
                  <info.Icon size={28} stroke="#1A3858" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold text-[#1A3858] mb-2">{info.title}</h3>
                <h4 className="text-lg font-semibold text-[#56B0BB] mb-3">{info.subtitle}</h4>
                <p className="text-[#5A5A5A] leading-relaxed">{info.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/unidades"
              className="inline-flex items-center justify-center bg-[#56B0BB] text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
            >
              Ver unidades →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {contactFaqs.length > 0 && (
        <section className="py-16 md:py-24 bg-[#F2FBFA]">
          <div className="w-[85%] max-w-[1120px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
                Dúvidas frequentes
              </h2>
            </div>
            <ContactFaq faqs={contactFaqs} />
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-[#F2FBFA]">
        <div className="w-[85%] max-w-[1120px] mx-auto">
          <div className="bg-white border border-[#EAF4EB] rounded-[32px] p-12 md:p-16 shadow-sm text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
              Pronto para cuidar da sua saúde?
            </h2>
            <p className="text-lg text-[#5A5A5A] mb-8 max-w-2xl mx-auto">
              Fale com a VacinaOne e receba orientação para agendar sua vacinação com tranquilidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#formulario-contato"
                className="inline-flex items-center justify-center bg-[#56B0BB] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
              >
                Agendar Vacinação
              </Link>
              <Link
                href="/vacinas"
                className="inline-flex items-center justify-center border-2 border-[#56B0BB] text-[#56B0BB] font-bold text-lg px-8 py-4 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
              >
                Ver vacinas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
