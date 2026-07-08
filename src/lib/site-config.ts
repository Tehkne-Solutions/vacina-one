import { getWhatsAppHref } from './whatsapp';

const officialPhoneDigits = '5519971010707';
const officialEmail = 'atendimento@vacinaone.com.br';
const officialPhone = '19 97101-0707';
const officialAddress = 'R. Percílio Neto, 407 | Sala B - Parque Taquaral - Campinas - SP';
const officialMapsQuery = 'R. Percílio Neto, 407 Sala B Parque Taquaral Campinas SP';

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || officialEmail;
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE_LABEL || officialPhone;
const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || officialAddress;
const contactHours = process.env.NEXT_PUBLIC_CONTACT_HOURS || 'Atendimento sob agendamento';
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/vacinaone/';
const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/vacinaone/';
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || officialPhoneDigits;
const mapsHref =
  process.env.NEXT_PUBLIC_CONTACT_MAPS_URL ||
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
  { label: 'Empresas', href: '/empresas' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
];
