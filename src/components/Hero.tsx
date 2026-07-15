import Image from 'next/image';
import LaboratoryCarousel from './LaboratoryCarousel';
import { getWhatsAppHref } from '@/lib/whatsapp';

export default function Hero() {
  const appointmentHref = getWhatsAppHref(
    'Olá! Vim pelo site da VacinaOne e quero agendar uma vacinação.'
  );

  return (
    <section className="relative flex min-h-[calc(100vh-110px)] w-full flex-col justify-between overflow-hidden bg-white py-[4vh] font-franie">
      <div className="mx-auto grid w-[85%] max-w-[1220px] flex-1 grid-cols-1 items-center justify-between gap-6 xl:grid-cols-[minmax(0,520px)_minmax(0,560px)] xl:gap-16 2xl:max-w-[1560px] 2xl:grid-cols-[minmax(0,650px)_minmax(0,750px)] 2xl:gap-20">
        <div className="order-1 z-50 flex w-full flex-col items-center justify-self-center gap-4 text-center xl:order-2 xl:max-w-[560px] xl:items-start xl:justify-self-end xl:text-left 2xl:max-w-[750px]">
          <h1 className="hero-title text-[25px] font-black leading-[1.05] tracking-[-0.035em] text-[#1A3858] lg:text-[42px] 2xl:text-[56px]">
            <span className="text-[#56B0BB]">Prote&#231;&#227;o</span> e<br />
            <span className="text-[#56B0BB]">cuidado</span> para <br />
            todas as fases <br />
            da vida
            <span className="mt-3 block text-[#FFB703]">Em breve</span>
            <span className="block text-[#56B0BB]">Em Campinas</span>
          </h1>

          <p className="mx-auto max-w-[520px] text-[16px] font-medium leading-relaxed text-vacina-gray md:text-[19px] xl:mx-0">
            Vacinas para crian&#231;as, adultos e empresas com atendimento humanizado em Campinas.
          </p>

          <a
            href={appointmentHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[48px] min-w-[230px] items-center justify-center rounded-[14px] bg-[#FFB703] px-7 text-[16px] font-black text-[#1A3858] shadow-[0_10px_24px_rgba(255,183,3,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 md:h-[52px] md:text-[18px]"
          >
            Agendar Vacina&#231;&#227;o
          </a>
        </div>

        <div className="relative order-2 mt-4 aspect-[739/657] w-full max-w-[500px] justify-self-center xl:order-1 xl:mt-0 xl:max-w-[520px] xl:justify-self-start 2xl:max-w-[740px]">
          <div className="absolute inset-0">
            <div className="absolute left-0 top-0 z-10 aspect-square w-[48%]">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-menino.png"
                alt="Menino"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute right-0 top-[8.5%] z-20 aspect-[355/441] w-[48%]">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-pessoa-sendo-vacinada.png"
                alt="Vacinação"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-[11%] z-30 aspect-square w-[37%] shadow-2xl">
              <Image
                src="/images/vacina-one-homepage-hero-mosaico-imagem-bebe.png"
                alt="Bebê"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute left-[57%] top-[71%] z-40 hidden h-[26%] w-[37%] flex-col justify-center bg-[#56B0BB] p-3 text-white shadow-2xl sm:flex 2xl:p-4">
              <h3 className="text-[27px] font-semibold leading-none 2xl:text-[40px]">75%</h3>
              <p className="mt-2 text-[9px] font-medium leading-[1.18] 2xl:text-[13px]">
                dos pacientes relatam mais confiança quando recebem orientação clara antes da vacinação.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[4vh] w-[85%]">
        <div className="mb-6 h-[2px] w-full bg-vacina-border md:mb-8" />
        <LaboratoryCarousel />
      </div>
    </section>
  );
}
