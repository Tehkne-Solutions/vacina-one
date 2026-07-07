// @ts-nocheck
import type { WordPressUnit } from '@/types/wordpress';
import { siteContact } from './site-config';

export const fallbackUnits: WordPressUnit[] = [
  {
    id: 9901,
    date: '2026-07-07T00:00:00',
    slug: 'campinas-taquaral',
    status: 'publish',
    title: { rendered: siteContact.unitName || 'VacinaOne Campinas' },
    content: {
      rendered:
        '<p>Unidade VacinaOne em Campinas, com atendimento sob agendamento para famílias, empresas, escolas e instituições.</p>',
    },
    excerpt: {
      rendered: 'Atendimento VacinaOne em Campinas, próximo ao Taquaral, sob agendamento.',
    },
    featured_media: 0,
    acf: {
      nome_da_unidade: siteContact.unitName || 'VacinaOne Campinas',
      endereco_completo: siteContact.address,
      cidade: 'Campinas',
      bairro: 'Taquaral',
      estado: 'SP',
      telefone: siteContact.phone,
      whatsapp: siteContact.phone,
      email: siteContact.email,
      horario_de_funcionamento: siteContact.hours,
      google_maps_url: siteContact.mapsHref,
      unidade_ativa: true,
      cta_texto: 'Agendar vacinação',
    },
  },
];
