import { getVaccineCalendar } from '@/lib/wordpress';
import CalendarListClient from './CalendarListClient';

export const metadata = {
  title: 'Calendário Vacinal | VacinaOne',
  description:
    'Consulte calendários vacinais por fase da vida e receba orientação da equipe VacinaOne.',
};

export default async function CalendarPage() {
  const items = await getVaccineCalendar();
  return <CalendarListClient items={items} />;
}
