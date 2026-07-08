const DEFAULT_WHATSAPP_NUMBER = '5519971010707';
const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da VacinaOne e gostaria de atendimento.';

function getWhatsAppNumber() {
  return (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ||
    DEFAULT_WHATSAPP_NUMBER
  );
}

export function getWhatsAppHref(message = DEFAULT_WHATSAPP_MESSAGE) {
  const number = getWhatsAppNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
