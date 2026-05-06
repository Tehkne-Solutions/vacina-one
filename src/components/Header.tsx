import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full h-[90px] z-50 flex items-center bg-white">
      <div className="max-w-[1920px] w-full mx-auto px-[112px] flex items-center justify-between">
        {/* Logo 221x53 */}
        <div className="relative w-[221px] h-[53px]">
          <Image
            src="/images/vacina-one-logo.png"
            alt="Vacina One"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Nav - gap 40px, Franie 18px */}
        <nav className="flex items-center gap-[40px] font-franie font-medium text-[18px] leading-[180%]">
          <Link href="/" className="text-black">Home</Link>
          <Link href="#" className="text-vacina-gray hover:text-vacina-teal transition">VacinaOne</Link>
          <Link href="#" className="text-vacina-gray hover:text-vacina-teal transition">Unidades</Link>
          <Link href="#" className="text-vacina-gray hover:text-vacina-teal transition">Vacinas</Link>
          <Link href="#" className="text-vacina-gray hover:text-vacina-teal transition">Calend&#225;rio</Link>
          <Link href="#" className="text-vacina-gray hover:text-vacina-teal transition">Empresas</Link>
          <Link href="#" className="text-vacina-gray hover:text-vacina-teal transition">Blog</Link>
          <Link href="#" className="text-vacina-gray hover:text-vacina-teal transition">Contato</Link>
        </nav>

        {/* CTA - 280x55 */}
        <button className="w-[280px] h-[55px] border border-vacina-teal rounded-[50px] flex items-center justify-center font-franie font-medium text-[18px] text-vacina-teal hover:bg-vacina-teal hover:text-white transition-all">
          Seja um Franqueado
        </button>
      </div>
    </header>
  );
}
