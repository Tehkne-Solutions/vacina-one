import Image from 'next/image';
import LaboratoryCarousel from './LaboratoryCarousel';

export default function Hero() {
  return (
    <section className="relative w-full h-[1150px] bg-white overflow-hidden font-franie">
      <div className="max-w-[1920px] mx-auto h-full relative">

        {/* MOSAICO */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none">

          {/* 1. Menino — quadrada maior, z-20 */}
          <div className="absolute left-[164px] top-[100px] w-[340px] h-[340px] z-20">
            <Image
              src="/images/vacina-one-homepage-hero-mosaico-imagem-menino.png"
              alt="Menino"
              fill
              className="object-cover rounded-[20px]"
              priority
            />
          </div>

          {/* 2. Pessoa sendo vacinada — retangular, z-30, com card 75% */}
          <div className="absolute left-[524px] top-[150px] w-[362px] h-[544px] z-30">
            <Image
              src="/images/vacina-one-homepage-hero-mosaico-imagem-pessoa-sendo-vacinada.png"
              alt="Vacinacao"
              fill
              className="object-cover rounded-[20px]"
            />
            {/* Card 75% */}
            <div className="absolute left-[32px] top-[407px] w-[297px] h-[194px] bg-vacina-teal p-[25px] flex flex-col justify-center shadow-2xl">
              <h3 className="text-white text-[52px] font-black leading-none tracking-tighter">75%</h3>
              <p className="text-white text-[15px] font-medium leading-[140%] mt-2">
                of doctors surveyed said their inclusiveness had increased with 41% saying it had increases significantly
              </p>
            </div>
          </div>

          {/* 3. Bebe — quadrada menor, abaixo do menino, z-10 */}
          <div className="absolute left-[245px] top-[460px] w-[260px] h-[260px] z-10">
            <Image
              src="/images/vacina-one-homepage-hero-mosaico-imagem-bebe.png"
              alt="Bebe"
              fill
              className="object-cover rounded-[20px]"
            />
          </div>
        </div>

        {/* CONTEUDO TEXTUAL */}
        <div className="absolute left-[984px] top-[150px] w-[766px] flex flex-col gap-[30px]">
          <h1 className="text-[80px] font-black leading-[90px] tracking-tight">
            <span className="text-vacina-teal">Prote&#231;&#227;o</span>{' '}
            <span className="text-vacina-dark">e</span>{' '}
            <span className="text-vacina-teal">cuidado</span><br />
            <span className="text-vacina-dark">para todas as fases</span><br />
            <span className="text-vacina-dark">da vida</span>
          </h1>

          <p className="text-vacina-gray text-[22px] font-medium leading-[160%] w-[640px] tracking-[-0.02em]">
            Vacinas para crian&#231;as, adultos e empresas com<br />
            atendimento humanizado em Campinas
          </p>

          <button className="w-[339px] h-[63px] bg-vacina-gold rounded-[50px] text-white text-[22px] font-extrabold flex items-center justify-center hover:brightness-105 transition-all">
            Agendar Vacina&#231;&#227;o
          </button>
        </div>

        {/* Divisor */}
        <div className="absolute left-[163px] top-[850px] w-[1595px] h-[2px] bg-vacina-border" />

        {/* Carrossel */}
        <div className="absolute left-[163px] top-[920px] w-[1595px]">
          <LaboratoryCarousel />
        </div>
      </div>
    </section>
  );
}
