import { getWhatsAppHref } from './whatsapp';

const officialPhoneDigits = '5519971010707';
const officialEmail = 'atendimento@vacinaone.com.br';
const officialPhone = '19 97101-0707';
const officialAddress = 'R. Percílio Neto, 407 | Sala B - Parque Taquaral - Campinas - SP';
const officialHours = 'Atendimento sob agendamento';
const officialMapsQuery = 'R. Percílio Neto, 407 Sala B Parque Taquaral Campinas SP';

function isPlaceholder(value?: string | null) {
  if (!value) return true;
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  return (
    normalized.includes('a definir') ||
    normalized.includes('definir') ||
    normalized.includes('placeholder') ||
    normalized.includes('sem endereco') ||
    normalized.includes('sem horario')
  );
}

function envOrOfficial(value: string | undefined, fallback: string) {
  return isPlaceholder(value) ? fallback : value || fallback;
}

const contactEmail = envOrOfficial(process.env.NEXT_PUBLIC_CONTACT_EMAIL, officialEmail);
const contactPhone = envOrOfficial(process.env.NEXT_PUBLIC_CONTACT_PHONE_LABEL, officialPhone);
const contactAddress = envOrOfficial(process.env.NEXT_PUBLIC_CONTACT_ADDRESS, officialAddress);
const contactHours = envOrOfficial(process.env.NEXT_PUBLIC_CONTACT_HOURS, officialHours);
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/vacinaone/';
const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/vacinaone/';
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || officialPhoneDigits;
const mapsHref =
  isPlaceholder(process.env.NEXT_PUBLIC_CONTACT_MAPS_URL)
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officialMapsQuery)}`
    : process.env.NEXT_PUBLIC_CONTACT_MAPS_URL ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officialMapsQuery)}`;

export const siteContact = {
  email: contactEmail,
  phone: contactPhone,
  phoneHref: `tel:+${whatsappNumber}`,
  address: contactAddress,
  mapsHref,
  hours: contactHours,
};

export const siteSocialLinks = [
  {
    label: 'Instagram',
    href: instagramUrl,
    short: 'IG',
  },
  {
    label: 'Facebook',
    href: facebookUrl,
    short: 'FB',
  },
  {
    label: 'WhatsApp',
    href: getWhatsAppHref('Olá! Vim pelo site da VacinaOne e gostaria de atendimento.'),
    short: 'WA',
  },
];

export const mainNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Unidades', href: '/unidades' },
  { label: 'Vacinas', href: '/vacinas' },
  { label: 'VacinaOne até Você', href: '/empresas' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
];
