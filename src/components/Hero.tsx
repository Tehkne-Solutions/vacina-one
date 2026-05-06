import Image from 'next/image';
import LaboratoryCarousel from './LaboratoryCarousel';

export default function Hero() {
  return (
    <section className="relative w-full h-[1393px] bg-white overflow-hidden font-franie">
      <div className="max-w-[1920px] mx-auto h-full relative">

        {/* MOSAICO DE IMAGENS */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none">

          {/* Imagem 1: Pessoa sendo vacinada — left:164 top:209 w:355 h:518 z:10 */}
          <div className="absolute left-[164px] top-[209px] w-[355px] h-[518px] z-10">
            <Image
              src="/images/vacina-one-homepage-hero-mosaico-imagem-pessoa-sendo-vacinada.png"
              alt="Vacinacao"
              fill
              className="object-cover rounded-[20px]"
              priority
            />
          </div>

          {/* Imagem 2: Menino — left:544 top:269 w:362 h:544 z:20 */}
          <div className="absolute left-[544px] top-[269px] w-[362px] h-[544px] z-20">
            <Image
              src="/images/vacina-one-homepage-hero-mosaico-imagem-menino.png"
              alt="Atendimento Infantil"
              fill
              className="object-cover rounded-[20px]"
            />
            {/* Card 75% — left:32 top:407 w:297 h:194 */}
            <div className="absolute left-[32px] top-[407px] w-[297px] h-[194px] bg-vacina-teal p-[20px] flex flex-col justify-center">
              <h3 className="text-white text-[52px] font-bold leading-[118.52%] tracking-[-0.02em]">75%</h3>
              <p className="text-white text-[16px] font-medium leading-[144.52%] mt-2">
                of doctors surveyed said their inclusiveness had increased with 41% saying it had increases significantly
              </p>
            </div>
          </div>

          {/* Imagem 3: Bebe — left:-139 top:536 w:1017 h:570 z:0 */}
          <div className="absolute left-[-139px] top-[536px] w-[1017px] h-[570px] z-0">
            <Image
              src="/images/vacina-one-homepage-hero-mosaico-imagem-bebe.png"
              alt="Cuidado Infantil"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* CONTEUDO TEXTUAL — left:984 top:272 w:766 */}
        <div className="absolute left-[984px] top-[272px] w-[766px] flex flex-col gap-[40px]">
          <h1 className="text-hero-title font-bold text-vacina-teal">
            Prote&#231;&#227;o e cuidado <br />
            <span className="text-vacina-dark">para todas as fases da vida</span>
          </h1>

          <p className="text-vacina-gray text-[22px] font-medium leading-[160.4%] w-[648px] tracking-[-0.02em]">
            Vacinas para crian&#231;as, adultos e empresas com atendimento humanizado em Campinas
          </p>

          <button className="w-[339px] h-[63px] bg-vacina-gold rounded-[50px] text-white text-[22px] font-bold flex items-center justify-center hover:brightness-110 transition-all">
            Agendar Vacina&#231;&#227;o
          </button>
        </div>

        {/* Linha divisora — left:163 top:970 w:1595 */}
        <div className="absolute left-[163px] top-[970px] w-[1595px] h-0 border-t-2 border-vacina-lightGray" />

        {/* Carrossel de laboratorios — left:163 top:1070 w:1595 */}
        <div className="absolute left-[163px] top-[1070px] w-[1595px]">
          <LaboratoryCarousel />
        </div>
      </div>
    </section>
  );
}
