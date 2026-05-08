import { getVaccineCalendar } from '@/lib/wordpress';

export const metadata = {
  title: 'Calendário Vacinal - VacinaOne',
  description: 'Consulte o calendário de vacinação recomendado.',
};

export default async function CalendarPage() {
  const calendar = await getVaccineCalendar();

  if (calendar.length === 0) {
    return (
      <main>
        <div className="w-[85%] mx-auto max-w-[1570px] py-20 text-center">
          <h1 className="text-4xl font-bold text-[#1A3858] mb-6">
            Calendário Vacinal
          </h1>
          <p className="text-xl text-[#5A5A5A] mb-4">
            Nenhum calendário vacinal cadastrado ainda.
          </p>
          <p className="text-lg text-[#5A5A5A]">
            Em breve, você poderá consultar calendários por fase da vida.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="w-[85%] mx-auto max-w-[1570px] py-20">
        <h1 className="text-4xl font-bold text-[#1A3858] mb-12">
          Calendário Vacinal
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {calendar.map((item) => (
            <div
              key={item.id}
              className="bg-[#F2FBFA] rounded-lg p-6 hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold text-[#1A3858] mb-4">
                {item.title.rendered}
              </h2>
              <div
                className="text-[#5A5A5A] text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: item.content.rendered,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
