import { getWhatsAppHref } from './whatsapp';

export const siteContact = {
  email: 'contato@vacinaone.com.br',
  phone: '+55 19 99893-0846',
  phoneHref: 'tel:+5519998930846',
  address: 'Taquaral · Campinas - SP',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=VacinaOne%20Taquaral%20Campinas%20SP',
  hours: 'Atendimento sob agendamento',
};

export const siteSocialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/vacinaone/', short: 'IG' },
  { label: 'Facebook', href: 'https://www.facebook.com/vacinaone/', short: 'FB' },
  { label: 'WhatsApp', href: getWhatsAppHref('Olá! Vim pelo site da VacinaOne e gostaria de atendimento.'), short: 'WA' },
];

export const mainNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Unidades', href: '/unidades' },
  { label: 'Vacinas', href: '/vacinas' },
  { label: 'Empresas', href: '/empresas' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
];
