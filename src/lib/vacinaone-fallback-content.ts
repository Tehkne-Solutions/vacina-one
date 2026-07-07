import {
  WordPressVaccine,
  WordPressCalendar,
  WordPressCorporateCampaign,
} from '@/types/wordpress';

export interface SiteCareBlock {
  number: number;
  title: string;
  description: string;
  text: string;
  items: string[];
  button: string;
  slug: string;
  kind: string;
}

type VaccineSeed = {
  title: string;
  slug: string;
  description: string;
  sections: Record<string, string>;
};

const vaccineSeeds: VaccineSeed[] = [];

export const siteCareBlocks: SiteCareBlock[] = [];

export const fallbackVaccines: WordPressVaccine[] = [];
export const fallbackVaccineCalendar: WordPressCalendar[] = [];
export const fallbackCorporateCampaigns: WordPressCorporateCampaign[] = [];
export const popularVaccineLinks: { name: string; slug: string }[] = [];
