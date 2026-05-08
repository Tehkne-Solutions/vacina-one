import { getCorporateCampaigns } from '@/lib/wordpress';

export const metadata = {
  title: 'Soluções para Empresas - VacinaOne',
  description: 'Conheça as soluções de vacinação da VacinaOne para empresas.',
};

export default async function CorporatePage() {
  const campaigns = await getCorporateCampaigns();

  if (campaigns.length === 0) {
    return (
      <main>
        <div className="w-[85%] mx-auto max-w-[1570px] py-20 text-center">
          <h1 className="text-4xl font-bold text-[#1A3858] mb-6">
            Soluções para Empresas
          </h1>
          <p className="text-xl text-[#5A5A5A] mb-4">
            Nenhuma campanha empresarial cadastrada ainda.
          </p>
          <p className="text-lg text-[#5A5A5A]">
            Em breve, você poderá conhecer as soluções da VacinaOne para
            empresas.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="w-[85%] mx-auto max-w-[1570px] py-20">
        <h1 className="text-4xl font-bold text-[#1A3858] mb-12">
          Soluções para Empresas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-[#1A3858] mb-3">
                {campaign.title.rendered}
              </h2>
              <div
                className="text-[#5A5A5A] text-sm mb-4"
                dangerouslySetInnerHTML={{
                  __html: campaign.excerpt.rendered,
                }}
              />
              <div className="text-[#56B0BB] font-semibold text-sm">
                Saiba mais →
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
