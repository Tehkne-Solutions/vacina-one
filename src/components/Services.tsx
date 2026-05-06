"use client";

import Image from "next/image";

const services = [
  {
    image: "https://placehold.co/400x300/56B0BB/FFFFFF?text=Vacinacao+Infantil",
    title: "Vacinacao Infantil",
    description: "Calendario completo de vacinas para criancas de 0 a 12 anos, com acompanhamento especializado.",
  },
  {
    image: "https://placehold.co/400x300/56B0BB/FFFFFF?text=Vacinacao+Adulto",
    title: "Vacinacao para Adultos",
    description: "Mantenha sua imunizacao em dia com as vacinas recomendadas para adultos e idosos.",
  },
  {
    image: "https://placehold.co/400x300/56B0BB/FFFFFF?text=Vacinacao+Empresarial",
    title: "Vacinacao Empresarial",
    description: "Programas de vacinacao corporativa para proteger sua equipe e aumentar a produtividade.",
  },
];

const Services = () => {
  return (
    <section className="py-[100px] bg-[#F8FAFB]">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-[40px] font-bold text-[#56B0BB] leading-[120%] tracking-[-0.02em] text-center mb-4">
          Nossos Servicos
        </h2>
        <p className="text-[18px] text-[#5A5A5A] text-center mb-16 max-w-[600px] mx-auto">
          Solucoes completas de vacinacao para cada necessidade.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={300}
                className="w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-[20px] font-semibold text-[#1A1A2E] mb-2">{service.title}</h3>
                <p className="text-[15px] text-[#5A5A5A] leading-[160%] mb-4">{service.description}</p>
                <button className="text-[#56B0BB] font-medium text-[15px] hover:underline">
                  Saiba mais &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
