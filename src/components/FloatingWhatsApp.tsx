import { getWhatsAppHref } from '@/lib/whatsapp';

export default function FloatingWhatsApp() {
  const href = getWhatsAppHref('Olá! Vim pelo site da VacinaOne e quero atendimento.');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp da VacinaOne"
      className="fixed bottom-5 right-5 z-[120] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] ring-4 ring-white transition duration-200 hover:scale-105 hover:brightness-105 focus:outline-none focus:ring-[#DFF7E8] md:bottom-7 md:right-7 md:h-[62px] md:w-[62px]"
    >
      <svg width="31" height="31" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M16.05 3.2C9.1 3.2 3.45 8.76 3.45 15.6c0 2.34.66 4.61 1.92 6.57L3.35 28.8l6.84-1.96a12.84 12.84 0 0 0 5.86 1.43c6.95 0 12.6-5.56 12.6-12.4S23 3.2 16.05 3.2Zm0 22.96c-1.88 0-3.7-.5-5.3-1.45l-.38-.23-4.06 1.16 1.2-3.9-.25-.4a10.02 10.02 0 0 1-1.58-5.74c0-5.66 4.65-10.26 10.37-10.26s10.37 4.6 10.37 10.26-4.65 10.56-10.37 10.56Z" fill="white"/>
        <path d="M21.82 18.7c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.72.16-.21.31-.82 1.02-1 1.23-.19.21-.37.23-.69.08-.32-.16-1.35-.49-2.57-1.55-.95-.84-1.59-1.87-1.78-2.18-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.7-.98-2.33-.26-.61-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.31-1.12 1.08-1.12 2.63 0 1.55 1.15 3.05 1.31 3.26.16.21 2.26 3.4 5.48 4.77.77.33 1.36.52 1.83.67.77.24 1.46.21 2.01.13.61-.09 1.88-.76 2.15-1.49.27-.73.27-1.36.19-1.49-.08-.13-.29-.21-.61-.37Z" fill="white"/>
      </svg>
    </a>
  );
}
