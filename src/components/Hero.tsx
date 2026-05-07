import Image from 'next/image';
import LaboratoryCarousel from './LaboratoryCarousel';

export default function Hero() {
  return (
    <section className="relative w-full pt-[5vh] pb-[5vh] bg-white overflow-hidden font-franie min-h-[calc(100vh-110px)] flex flex-col justify-between">
      <div className="w-[90%] mx-auto flex flex-col xl:flex-row items-center justify-between gap-4 xl:gap-0 flex-1">

        {/* COLUNA TEXTO — order-1 mobile */}
        <div className="w-full xl:max-w-[750px] text-center xl:text-left order-1 xl:order-2 z-50 flex flex-col items-center xl:items-start gap-4 md:gap-6">
          <h1 className="font-black leading-[1.1] text-vacina-dark
            text-[38px]
            lg:text-[65px]
            2xl:text-[80px]">
            <span className="text-vacina-teal">Prote&#231;&#227;o</span> e<br />
            <span className="text-vacina-teal">cuidado</span> para<br />
            todas as fases<br />
            da vida
          </h1>

          <p className="text-vacina-gray text-lg md:text-[22px] font-medium leading-relaxed max-w-[550px] mx-auto xl:mx-0">
            Vacinas para crian&#231;as, adultos e empresas com atendimento humanizado em Campinas.
          </p>

          <button className="w-full md:w-[339px] h-[65px] bg-vacina-gold text-white text-xl md:text-[22px] font-black rounded-full shadow-lg hover:brightness-105 hover:scale-[1.02] transition-all">
            Agendar Vacina&#231;&#227;o
          </button>
        </div>

        {/* COLUNA IMAGENS — order-2 mobile, aspect-ratio para manter coesao */}
        <div className="relative w-full max-w-[500px] md:max-w-[700px] aspect-[4/3] md:aspect-square order-2 xl:order-1 mt-6 xl:mt-0">
          <div className="relative w-full h-full">

            {/* 1. Menino — superior esquerda */}
            <div className="absolute left-0 top-0 w-[55%] h-[60%] z-10">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-menino.png"
                alt="Menino"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 2. Pessoa sendo vacinada — direita, sobrepoe o menino */}
            <div className="absolute right-0 top-[5%] w-[58%] h-[85%] z-20">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-pessoa-sendo-vacinada.png"
                alt="Vacinacao"
                fill
                className="object-cover"
              />
              {/* Card 75% */}
              <div className="absolute bottom-[10%] -left-[10%] w-[80%] bg-vacina-teal p-4 md:p-6 text-white shadow-xl hidden sm:block z-40">
                <h3 className="text-3xl md:text-[52px] font-black leading-none tracking-tighter">75%</h3>
                <p className="text-[10px] md:text-[15px] font-medium leading-[140%] mt-2">
                  of doctors surveyed said their inclusiveness had increased with 41% saying it had increases significantly
                </p>
              </div>
            </div>

            {/* 3. Bebe — canto inferior esquerdo, sem borda */}
            <div className="absolute left-[5%] bottom-[5%] w-[45%] h-[45%] z-30">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-bebe.png"
                alt="Bebe"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divisor + Carrossel */}
      <div className="w-[90%] mx-auto mt-[5vh]">
        <div className="w-full h-[2px] bg-vacina-border mb-8 md:mb-12" />
        <LaboratoryCarousel />
      </div>
    </section>
  );
}
