import Image from 'next/image';
import LaboratoryCarousel from './LaboratoryCarousel';

export default function Hero() {
  return (
    <section className="relative w-full pt-[100px] md:pt-[160px] pb-[5%] bg-white overflow-hidden font-franie">
      {/* Container 90% — padding 5% cada lado */}
      <div className="w-[90%] mx-auto">

        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-16">

          {/* COLUNA TEXTO — order-1 mobile (aparece primeiro) */}
          <div className="w-full xl:max-w-[700px] text-center xl:text-left order-1 xl:order-2 flex flex-col items-center xl:items-start gap-6 md:gap-8">
            <h1 className="font-black leading-[1.1] tracking-tight text-vacina-dark
              text-[38px]
              lg:text-[65px]
              2xl:text-[80px]">
              <span className="text-vacina-teal">Prote&#231;&#227;o</span> e<br />
              cuidado para<br />
              todas as fases<br />
              da vida
            </h1>

            <p className="text-vacina-gray text-lg md:text-[22px] font-medium leading-[160%] max-w-[550px]">
              Vacinas para crian&#231;as, adultos e empresas com atendimento humanizado em Campinas.
            </p>

            <button className="w-full md:w-[339px] h-[63px] bg-vacina-gold rounded-full text-white text-xl md:text-[22px] font-black shadow-lg hover:brightness-105 hover:scale-[1.02] transition-all">
              Agendar Vacina&#231;&#227;o
            </button>
          </div>

          {/* COLUNA IMAGENS — order-2 mobile (aparece abaixo do texto) */}
          <div className="relative w-full max-w-[580px] h-[400px] md:h-[560px] shrink-0 order-2 xl:order-1">

            {/* 1. Menino — quadrada maior, superior esquerda */}
            <div className="absolute left-0 top-0 w-[52%] aspect-square z-10">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-menino.png"
                alt="Menino"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 2. Pessoa sendo vacinada — retangular, direita */}
            <div className="absolute right-0 top-[8%] w-[52%] h-[88%] z-20">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-pessoa-sendo-vacinada.png"
                alt="Vacinacao"
                fill
                className="object-cover"
              />
              {/* Card 75% */}
              <div className="absolute bottom-[5%] -left-[15%] w-[85%] bg-vacina-teal p-4 md:p-6 text-white shadow-2xl hidden sm:block">
                <h3 className="text-3xl md:text-[52px] font-black leading-none tracking-tighter">75%</h3>
                <p className="text-[11px] md:text-[15px] font-medium leading-[140%] mt-2">
                  of doctors surveyed said their inclusiveness had increased with 41% saying it had increases significantly
                </p>
              </div>
            </div>

            {/* 3. Bebe — quadrada menor, ancorada com borda branca */}
            <div className="absolute left-[8%] bottom-0 w-[40%] aspect-square z-30 border-[8px] border-white shadow-xl">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-bebe.png"
                alt="Bebe"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Divisor + Carrossel */}
        <div className="mt-16 md:mt-24">
          <div className="w-full h-[2px] bg-vacina-border mb-10 md:mb-14" />
          <LaboratoryCarousel />
        </div>
      </div>
    </section>
  );
}
