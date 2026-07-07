import { getCorporateCampaigns } from '@/lib/wordpress';
import Link from 'next/link';
import CampaignCard from '@/components/empresas/CampaignCard';
import { getWhatsAppHref } from '@/lib/whatsapp';

export const metadata = {
  title: 'Vacinação para Empresas | VacinaOne',
  description: 'Organize campanhas de vacinação para empresas, equipes e instituições com orientação da VacinaOne.',
};

export default async function CorporatePage() {
  const campaigns = await getCorporateCampaigns();
  const corporateHref = getWhatsAppHref(
    'Olá! Vim pelo site da VacinaOne e quero solicitar uma campanha de vacinação para empresa.'
  );

  return (
    <main>
      {/* Hero Interno */}
      <section className="bg-[#EAF4EB] py-16 md:py-24">
        <div className="w-[85%] max-w-[1570px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="space-y-6">
              <span className="text-sm font-semibold text-[#56B0BB] uppercase tracking-wide">
                Vacinação para empresas
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1A3858] leading-tight">
                Proteção para equipes, empresas e instituições
              </h1>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                Organize campanhas de vacinação com atendimento humanizado, controle das doses e orientação clara para colaboradores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={corporateHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#F0B954] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
                >
                  Solicitar Campanha
                </a>
                <a
                  href={corporateHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-2 border-[#56B0BB] text-[#56B0BB] font-bold text-lg px-8 py-4 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* Card Visual */}
            <div className="bg-white border border-[rgba(86,176,187,0.25)] rounded-[32px] p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#1A3858] mb-6">
                Como funciona
              </h3>
              <ul className="space-y-4">
                {[
                  'Planejamento da campanha',
                  'Organização dos horários',
                  'Atendimento humanizado',
                  'Comprovantes de vacinação',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#56B0BB] rounded-full flex-shrink-0"></div>
                    <span className="text-[#5A5A5A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="py-16 md:py-24">
        <div className="w-[85%] max-w-[1570px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
              Vacinação corporativa com cuidado e organização
            </h2>
            <p className="text-lg text-[#5A5A5A] max-w-3xl mx-auto">
              A VacinaOne apoia empresas, escolas, condomínios e instituições na estruturação de campanhas de vacinação com segurança, clareza e conforto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Atendimento organizado',
              'Orientação para colaboradores',
              'Controle de doses e comprovantes',
              'Campanhas na clínica ou in company',
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white border border-[#EAF4EB] rounded-[24px] p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#56B0BB] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold text-[#1A3858]">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listagem de Campanhas */}
      <section className="py-16 md:py-24 bg-[#F2FBFA]">
        <div className="w-[85%] max-w-[1570px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
              Campanhas para empresas
            </h2>
            <p className="text-lg text-[#5A5A5A]">
              Conheça as opções cadastradas pela equipe VacinaOne para ações corporativas e institucionais.
            </p>
          </div>

          {campaigns.length === 0 ? (
            <div className="bg-[#EAF4EB] rounded-[28px] p-12 text-center">
              <h3 className="text-2xl font-bold text-[#1A3858] mb-4">
                Nenhuma campanha cadastrada ainda.
              </h3>
              <p className="text-lg text-[#5A5A5A] mb-6">
                Em breve, você poderá consultar aqui as opções de vacinação para empresas e instituições.
              </p>
              <a
                href={corporateHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#56B0BB] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
              >
                Falar com a equipe
              </a>
            </div>
          ) : (
            <div
              className={
                campaigns.length === 1
                  ? "flex justify-center"
                  : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              }
            >
              {campaigns.map((campaign, index) => (
                <CampaignCard key={campaign.id} campaign={campaign} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-white py-16 md:py-20">
        <div className="w-[85%] max-w-[1280px] mx-auto rounded-[32px] border border-[#DDEFEA] bg-[#EAF4EB] px-6 py-12 text-center shadow-sm md:px-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A3858] mb-4">
            Quer organizar uma campanha de vacinação?
          </h2>
          <p className="text-lg text-[#5A5A5A] mb-8 max-w-2xl mx-auto">
            Nossa equipe pode ajudar sua empresa a planejar uma ação segura, clara e bem organizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={corporateHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#F0B954] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
            >
              Solicitar Campanha
            </a>
            <Link
              href="/vacinas"
              className="inline-flex items-center justify-center border-2 border-[#56B0BB] text-[#56B0BB] font-bold text-lg px-8 py-4 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
            >
              Ver vacinas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
