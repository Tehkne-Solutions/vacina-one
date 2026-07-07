"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    image: "/images/vacina-one-homepage-hero-mosaico-imagem-bebe.png",
    title: "Vacinação Infantil",
    description: "Calendário completo de vacinas para crianças de 0 a 12 anos, com acompanhamento especializado.",
  },
  {
    image: "/images/vacina-one-homepage-hero-mosaico-imagem-pessoa-sendo-vacinada.png",
    title: "Vacinação para Adultos",
    description: "Mantenha sua imunização em dia com as vacinas recomendadas para adultos e idosos.",
  },
  {
    image: "/images/vacina-one-homepage-hero-mosaico-imagem-menino.png",
    title: "Vacinação Empresarial",
    description: "Programas de vacinação corporativa para proteger sua equipe e aumentar a produtividade.",
  },
];

const Services = () => {
  return (
    <motion.section
      className="py-[100px] bg-[#F8FAFB]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <div className="w-[85%] max-w-[1280px] mx-auto">
        <motion.h2 className="text-[40px] font-bold text-[#56B0BB] leading-[120%] tracking-[-0.02em] text-center mb-4" variants={fadeUp}>
          Nossos Serviços
        </motion.h2>
        <motion.p className="text-[18px] text-[#5A5A5A] text-center mb-16 max-w-[600px] mx-auto" variants={fadeUp}>
          Soluções completas de vacinação para cada necessidade.
        </motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={300}
                className="h-[260px] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-[20px] font-semibold text-[#1A1A2E] mb-2">{service.title}</h3>
                <p className="text-[15px] text-[#5A5A5A] leading-[160%] mb-4">{service.description}</p>
                <button className="text-[#56B0BB] font-medium text-[15px] transition-all duration-300 hover:scale-[1.02] hover:underline">
                  Saiba mais &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
