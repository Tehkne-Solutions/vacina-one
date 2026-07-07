"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getWhatsAppHref } from '@/lib/whatsapp';
import { mainNavLinks } from '@/lib/site-config';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const franchiseHref = getWhatsAppHref(
    'Olá! Vim pelo site da VacinaOne e tenho interesse em falar sobre franquia.'
  );

  return (
    <header className="fixed left-0 top-0 z-[100] w-full border-b border-[#EAF4EB] bg-white/95 shadow-[0_2px_10px_rgba(0,0,0,0.05)] backdrop-blur">
      <div className="mx-auto flex h-[72px] w-[85%] items-center justify-between md:h-[88px]">
        <Link href="/" aria-label="Ir para a página inicial da VacinaOne" className="relative h-[34px] w-[142px] shrink-0 md:h-[42px] md:w-[176px]">
          <Image src="/images/vacina-one-logo.png" alt="VacinaOne" fill className="object-contain" priority />
        </Link>

        <nav className="hidden items-center gap-5 font-franie text-[14px] font-semibold text-[#1A3858] xl:flex 2xl:gap-7 2xl:text-[15px]">
          {mainNavLinks.map((item) => (
            <Link key={item.label} href={item.href} className="whitespace-nowrap transition-colors hover:text-[#56B0BB]">
              {item.label}
            </Link>
          ))}
        </nav>

        <a href={franchiseHref} target="_blank" rel="noopener noreferrer" className="hidden h-[40px] items-center justify-center rounded-[14px] border border-[#56B0BB] px-5 font-franie text-[14px] font-bold text-[#56B0BB] transition-all duration-300 hover:bg-[#56B0BB] hover:text-white xl:inline-flex">
          Seja um Franqueado
        </a>

        <button className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] xl:hidden" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}>
          <span className={`block h-[2px] w-6 bg-[#1A3858] transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-[2px] w-6 bg-[#1A3858] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[2px] w-6 bg-[#1A3858] transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <div className={`overflow-hidden bg-white shadow-xl transition-all duration-300 xl:hidden ${isOpen ? 'max-h-[460px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="mx-auto flex w-[85%] flex-col gap-1 py-3">
          {mainNavLinks.map((item) => (
            <Link key={item.label} href={item.href} className="border-b border-[#EAF4EB] py-3 text-[16px] font-semibold text-[#1A3858] transition-colors hover:text-[#56B0BB]" onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a href={franchiseHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex h-[42px] w-full items-center justify-center rounded-[14px] bg-[#56B0BB] font-franie text-[15px] font-bold text-white transition-all duration-300 hover:brightness-105">
            Seja um Franqueado
          </a>
        </div>
      </div>
    </header>
  );
}
