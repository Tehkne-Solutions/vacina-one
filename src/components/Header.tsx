"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = ['Home', 'VacinaOne', 'Unidades', 'Vacinas', 'Calend\u00e1rio', 'Empresas', 'Blog', 'Contato'];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1440px] h-[80px] md:h-[90px] mx-auto px-6 md:px-[112px] flex items-center justify-between">

        {/* Logo */}
        <div className="relative w-[150px] h-[36px] md:w-[221px] md:h-[53px]">
          <Image src="/images/vacina-one-logo.png" alt="Vacina One" fill className="object-contain" priority />
        </div>

        {/* Nav desktop */}
        <nav className="hidden xl:flex items-center gap-8 font-franie font-medium text-[16px]">
          {navLinks.map((item, i) => (
            <Link
              key={item}
              href={i === 0 ? '/' : '#'}
              className={i === 0 ? 'text-black' : 'text-vacina-gray hover:text-vacina-teal transition-colors'}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <button className="hidden xl:flex items-center justify-center w-[280px] h-[55px] border border-vacina-teal rounded-full font-franie font-medium text-[18px] text-vacina-teal hover:bg-vacina-teal hover:text-white transition-all">
          Seja um Franqueado
        </button>

        {/* Hamburger mobile */}
        <button
          className="xl:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className={`block w-6 h-[2px] bg-vacina-dark transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-[2px] bg-vacina-dark transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-vacina-dark transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Menu mobile overlay */}
      <div className={`xl:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} bg-white shadow-xl`}>
        <div className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((item, i) => (
            <Link
              key={item}
              href={i === 0 ? '/' : '#'}
              className="text-[18px] font-medium text-vacina-dark border-b border-gray-100 pb-3 hover:text-vacina-teal transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          <button className="w-full h-[55px] bg-vacina-teal text-white rounded-full font-franie font-medium text-[18px] mt-2 hover:brightness-105 transition-all">
            Seja um Franqueado
          </button>
        </div>
      </div>
    </header>
  );
}
