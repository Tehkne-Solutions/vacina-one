import Image from 'next/image';
import LaboratoryCarousel from './LaboratoryCarousel';

export default function Hero() {
  return (
    <section className="relative w-full pt-[5vh] pb-[5vh] bg-white overflow-hidden font-franie min-h-[calc(100vh-110px)] flex flex-col justify-between">
      <div className="w-[85%] max-w-[1220px] 2xl:max-w-[1560px] mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,520px)_minmax(0,560px)] 2xl:grid-cols-[minmax(0,650px)_minmax(0,750px)] items-center justify-between gap-6 xl:gap-16 2xl:gap-20 flex-1">

        {/* COLUNA TEXTO — order-1 mobile */}
        <div className="w-full xl:max-w-[560px] 2xl:max-w-[750px] text-center xl:text-left order-1 xl:order-2 z-50 flex flex-col items-center xl:items-start gap-4 md:gap-6 justify-self-center xl:justify-self-end">
          <h1 className="font-black leading-[1.05] text-[#1A3858]
            text-[36px]
            lg:text-[60px]
            2xl:text-[80px]">
            <span className="text-[#56B0BB]">Prote&#231;&#227;o</span> e<br />
            <span className="text-[#56B0BB]">cuidado</span> para <br />
            todas as fases <br />
            da vida
          </h1>

          <p className="text-vacina-gray text-lg md:text-[22px] font-medium leading-relaxed max-w-[550px] mx-auto xl:mx-0">
            Vacinas para crian&#231;as, adultos e empresas com atendimento humanizado em Campinas.
          </p>

          <button className="w-full md:w-[339px] h-[65px] bg-vacina-gold text-white text-xl md:text-[22px] font-black rounded-full shadow-lg hover:brightness-105 hover:scale-[1.02] transition-all duration-300">
            Agendar Vacina&#231;&#227;o
          </button>
        </div>

        {/* COLUNA IMAGENS — order-2 mobile, aspect-ratio para manter coesao */}
        <div className="relative w-full max-w-[500px] xl:max-w-[520px] 2xl:max-w-[740px] aspect-[739/657] order-2 xl:order-1 mt-4 xl:mt-0 justify-self-center xl:justify-self-start">
          <div className="absolute inset-0">

            {/* 1. Menino — superior esquerda */}
            <div className="absolute top-0 left-0 w-[48%] aspect-square z-10">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-menino.png"
                alt="Menino"
                fill
                className="object-cover rounded-none"
                priority
              />
            </div>

            {/* 2. Pessoa sendo vacinada — direita, sobrepoe o menino */}
            <div className="absolute top-[8.5%] right-0 w-[48%] aspect-[355/441] z-20">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-pessoa-sendo-vacinada.png"
                alt="Vacinacao"
                fill
                className="object-cover rounded-none"
              />
            </div>

            {/* 3. Bebe — canto inferior esquerdo, sem borda */}
            <div className="absolute bottom-0 left-[11%] w-[37%] aspect-square z-30 shadow-2xl">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-bebe.png"
                alt="Bebe"
                fill
                className="object-cover rounded-none"
              />
            </div>

            {/* Badge 75% */}
            <div className="absolute left-[56%] top-[70%] z-40 hidden h-[30%] w-[40%] flex-col bg-[#56B0BB] p-3 text-white shadow-2xl sm:flex 2xl:p-5">
              <h3 className="text-[34px] font-black italic leading-none 2xl:text-[52px]">75%</h3>
              <p className="mt-2 text-[10px] font-medium leading-tight 2xl:text-[16px] 2xl:leading-[144%]">
                of doctors surveyed said their inclusiveness had increased with 41% saying it had increases significantly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divisor + Carrossel */}
      <div className="w-[85%] mx-auto mt-[5vh]">
        <div className="w-full h-[2px] bg-vacina-border mb-8 md:mb-12" />
        <LaboratoryCarousel />
      </div>
    </section>
  );
}
