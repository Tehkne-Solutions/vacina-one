import { getVaccines } from '@/lib/wordpress';
import VaccinesListClient from './VaccinesListClient';

export const metadata = {
  title: 'Vacinas | VacinaOne',
  description:
    'Consulte informações sobre vacinas, indicações, reforços e cuidados com orientação da VacinaOne.',
};

export default async function VaccinesPage() {
  const vaccines = await getVaccines();
  return <VaccinesListClient vaccines={vaccines} />;
}
