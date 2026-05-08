import { getUnits } from '@/lib/wordpress';

export const metadata = {
  title: 'Unidades - VacinaOne',
  description: 'Encontre as unidades da VacinaOne.',
};

export default async function UnitsPage() {
  const units = await getUnits();

  if (units.length === 0) {
    return (
      <main>
        <div className="w-[85%] mx-auto max-w-[1570px] py-20 text-center">
          <h1 className="text-4xl font-bold text-[#1A3858] mb-6">Unidades</h1>
          <p className="text-xl text-[#5A5A5A] mb-4">
            Nenhuma unidade cadastrada ainda.
          </p>
          <p className="text-lg text-[#5A5A5A]">
            Em breve, você poderá consultar as unidades da VacinaOne.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="w-[85%] mx-auto max-w-[1570px] py-20">
        <h1 className="text-4xl font-bold text-[#1A3858] mb-12">Unidades</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-[#1A3858] mb-3">
                {unit.title.rendered}
              </h2>
              <div
                className="text-[#5A5A5A] text-sm"
                dangerouslySetInnerHTML={{
                  __html: unit.excerpt.rendered,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
