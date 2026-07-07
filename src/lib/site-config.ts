import { getWhatsAppHref } from './whatsapp';

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contato@vacinaone.com.br';
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE_LABEL || '+55 19 99893-0846';
const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Taquaral · Campinas - SP';
const contactHours = process.env.NEXT_PUBLIC_CONTACT_HOURS || 'Atendimento sob agendamento';
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/vacinaone/';
const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/vacinaone/';

export const siteContact = {
  email: contactEmail,
  phone: contactPhone,
  phoneHref: 'tel:+5519998930846',
  address: contactAddress,
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=VacinaOne%20Taquaral%20Campinas%20SP',
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
