import Image from 'next/image';
import LaboratoryCarousel from './LaboratoryCarousel';

export default function Hero() {
  return (
    <section className="relative w-full pt-[100px] md:pt-[140px] pb-10 bg-white overflow-hidden font-franie">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[112px]">

        {/* Grid principal: mosaico | texto */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* MOSAICO — proporcional com % e aspect-square */}
          <div className="relative h-[400px] md:h-[580px] w-full">

            {/* 1. Menino — quadrada maior, superior esquerda */}
            <div className="absolute left-0 top-0 w-[45%] aspect-square z-20">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-menino.png"
                alt="Menino"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 2. Pessoa sendo vacinada — retangular, direita, com card 75% */}
            <div className="absolute right-0 top-[8%] w-[50%] h-[82%] z-30">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-pessoa-sendo-vacinada.png"
                alt="Vacinacao"
                fill
                className="object-cover"
              />
              {/* Card 75% */}
              <div className="absolute -bottom-4 -left-10 w-[85%] bg-vacina-teal p-4 md:p-6 text-white shadow-2xl">
                <h3 className="text-3xl md:text-[52px] font-black leading-none tracking-tighter">75%</h3>
                <p className="text-[11px] md:text-[15px] font-medium leading-[140%] mt-2">
                  of doctors surveyed said their inclusiveness had increased with 41% saying it had increases significantly
                </p>
              </div>
            </div>

            {/* 3. Bebe — quadrada menor, abaixo do menino */}
            <div className="absolute left-[15%] bottom-0 w-[35%] aspect-square z-10">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-bebe.png"
                alt="Bebe"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* CONTEUDO TEXTUAL */}
          <div className="flex flex-col text-center xl:text-left items-center xl:items-start gap-6 md:gap-8">
            <h1 className="text-[40px] md:text-[65px] xl:text-[80px] font-black leading-[1.1] tracking-tight text-vacina-dark">
              <span className="text-vacina-teal">Prote&#231;&#227;o</span>{' '}
              <span>e</span><br className="hidden md:block" />{' '}
              <span className="text-vacina-teal">cuidado</span>{' '}
              <span>para todas</span><br className="hidden md:block" />{' '}
              <span>as fases da vida</span>
            </h1>

            <p className="text-vacina-gray text-lg md:text-[22px] font-medium leading-[160%] max-w-[600px]">
              Vacinas para crian&#231;as, adultos e empresas com atendimento humanizado em Campinas.
            </p>

            <button className="w-full md:w-[339px] h-[63px] bg-vacina-gold rounded-full text-white text-xl md:text-[22px] font-black shadow-lg hover:brightness-105 hover:scale-[1.02] transition-all">
              Agendar Vacina&#231;&#227;o
            </button>
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
