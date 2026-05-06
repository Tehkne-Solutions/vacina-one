"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      className="relative w-full min-h-[1393.69px] bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-8 py-16">
        {/* Left Column: Image Mosaic */}
        <div className="relative flex flex-col items-center justify-center space-y-4">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <Image
              src="/images/vacina-one-homepage-hero-mosaico-imagem-pessoa-sendo-vacinada.png"
              alt="Profissional aplicando vacina em paciente"
              width={362}
              height={544}
              priority
              className="object-contain"
            />
          </motion.div>

          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <Image
              src="/images/vacina-one-homepage-hero-mosaico-imagem-menino.png"
              alt="Crianca sorrindo"
              width={355}
              height={518}
              className="object-contain"
            />
          </motion.div>

          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
            <Image
              src="/images/vacina-one-homepage-hero-mosaico-imagem-bebe.png"
              alt="Bebe sorrindo"
              width={272}
              height={272}
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#56B0BB] text-white p-4 rounded-lg shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold">75%</div>
              <div className="text-sm mt-2 max-w-[257px]">
                of doctors surveyed said their inclusiveness had increased with 41% saying it had increases significantly
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col justify-center space-y-8">
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <h1 className="text-[80px] font-bold text-[#56B0BB] leading-[100px] tracking-[-0.03em] mb-4">
              Prote&#231;&#227;o e cuidado para todas as fases da vida
            </h1>
            <p className="text-[22px] font-medium text-[#5A5A5A] leading-[160.4%] tracking-[-0.02em] mb-8">
              Vacinas para crian&#231;as, adultos e empresas com atendimento humanizado em Campinas
            </p>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
            <button className="bg-[#F0B954] text-white font-bold text-[22px] leading-[102.52%] tracking-[-0.02em] px-10 py-5 rounded-full hover:bg-opacity-90 transition-colors">
              Agendar Vacina&#231;&#227;o
            </button>
          </motion.div>
        </div>
      </div>

      {/* Social Proof */}
      <motion.div
        className="relative z-10 px-4 lg:px-8 py-16"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <hr className="border-gray-200 mb-8" />
        <div className="text-center">
          <h2 className="text-[22px] font-medium text-[#1A1A2E] leading-[160.4%] tracking-[-0.02em] mb-8">
            Marcas dos laborat&#243;rios
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
            <Image src="/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-earth-2.0.png" alt="Laboratorio Earth 2.0" width={218} height={52} className="object-contain" />
            <Image src="/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-goldline.png" alt="Laboratorio Goldline" width={223} height={52} className="object-contain" />
            <Image src="/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-kanba.png" alt="Laboratorio Kanba" width={187} height={52} className="object-contain" />
            <Image src="/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-nirastate.png" alt="Laboratorio Nirastate" width={257} height={52} className="object-contain" />
            <Image src="/images/vacina-one-homepage-hero-marcas-dos-laboratorios-marca-solaytic.png" alt="Laboratorio Solaytic" width={162} height={52} className="object-contain" />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
