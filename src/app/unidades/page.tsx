import { getUnits } from '@/lib/wordpress';
import UnitsListClient from './UnitsListClient';

export const metadata = {
  title: 'Unidades - VacinaOne',
  description:
    'Encontre a unidade VacinaOne mais próxima e conte com um atendimento humanizado, seguro e organizado.',
};

export default async function UnitsPage() {
  const units = await getUnits();
  return <UnitsListClient units={units} />;
}
