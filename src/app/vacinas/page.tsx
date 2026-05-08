import { getVaccines } from '@/lib/wordpress';

export const metadata = {
  title: 'Vacinas - VacinaOne',
  description: 'Conheça as vacinas disponíveis na VacinaOne.',
};

export default async function VaccinesPage() {
  const vaccines = await getVaccines();

  if (vaccines.length === 0) {
    return (
      <main>
        <div className="w-[85%] mx-auto max-w-[1570px] py-20 text-center">
          <h1 className="text-4xl font-bold text-[#1A3858] mb-6">Vacinas</h1>
          <p className="text-xl text-[#5A5A5A] mb-4">
            Nenhuma vacina cadastrada ainda.
          </p>
          <p className="text-lg text-[#5A5A5A]">
            Em breve, você poderá consultar as vacinas disponíveis na VacinaOne.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="w-[85%] mx-auto max-w-[1570px] py-20">
        <h1 className="text-4xl font-bold text-[#1A3858] mb-12">Vacinas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vaccines.map((vaccine) => (
            <div
              key={vaccine.id}
              className="bg-[#F2FBFA] rounded-lg p-6 hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold text-[#1A3858] mb-3">
                {vaccine.title.rendered}
              </h2>
              <div
                className="text-[#5A5A5A] text-sm line-clamp-4"
                dangerouslySetInnerHTML={{
                  __html: vaccine.excerpt.rendered,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
