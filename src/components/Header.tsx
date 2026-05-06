import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-[110px] bg-white flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center">
        <Image
          src="/images/vacina-one-logo.png"
          alt="Vacina One Logo"
          width={221}
          height={53}
          priority
          className="object-contain"
        />
      </div>

      <nav className="hidden lg:flex items-center space-x-[50px]">
        <Link href="#home" className="text-black font-medium text-[18px] leading-[180%] hover:text-[#56B0BB] transition-colors">Home</Link>
        <Link href="#vacinaone" className="text-[#5A5A5A] font-medium text-[18px] leading-[180%] hover:text-[#56B0BB] transition-colors">VacinaOne</Link>
        <Link href="#unidades" className="text-[#5A5A5A] font-medium text-[18px] leading-[180%] hover:text-[#56B0BB] transition-colors">Unidades</Link>
        <Link href="#vacinas" className="text-[#5A5A5A] font-medium text-[18px] leading-[180%] hover:text-[#56B0BB] transition-colors">Vacinas</Link>
        <Link href="#calendario" className="text-[#5A5A5A] font-medium text-[18px] leading-[180%] hover:text-[#56B0BB] transition-colors">Calend&#225;rio</Link>
        <Link href="#empresas" className="text-[#5A5A5A] font-medium text-[18px] leading-[180%] hover:text-[#56B0BB] transition-colors">Empresas</Link>
        <Link href="#blog" className="text-[#5A5A5A] font-medium text-[18px] leading-[180%] hover:text-[#56B0BB] transition-colors">Blog</Link>
        <Link href="#contato" className="text-[#5A5A5A] font-medium text-[18px] leading-[180%] hover:text-[#56B0BB] transition-colors">Contato</Link>
      </nav>

      <div className="hidden lg:flex">
        <button className="px-10 py-5 border border-[#56B0BB] rounded-full text-[#56B0BB] font-medium text-xl leading-[102.52%] hover:bg-[#56B0BB] hover:text-white transition-colors">
          Seja um Franqueado
        </button>
      </div>

      <div className="lg:hidden">
        <button className="text-[#5A5A5A]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
