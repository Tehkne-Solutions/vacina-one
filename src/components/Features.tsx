"use client";

import Image from "next/image";

const features = [
  {
    icon: "https://placehold.co/64x64/56B0BB/FFFFFF?text=1",
    title: "Atendimento Humanizado",
    description: "Profissionais treinados para oferecer o melhor cuidado em cada etapa da vacinacao.",
  },
  {
    icon: "https://placehold.co/64x64/56B0BB/FFFFFF?text=2",
    title: "Vacinas para Todas as Idades",
    description: "Do recem-nascido ao idoso, temos o calendario vacinal completo para cada fase da vida.",
  },
  {
    icon: "https://placehold.co/64x64/56B0BB/FFFFFF?text=3",
    title: "Agendamento Online",
    description: "Agende sua vacinacao de forma rapida e pratica pelo nosso sistema digital.",
  },
  {
    icon: "https://placehold.co/64x64/56B0BB/FFFFFF?text=4",
    title: "Laboratorios Certificados",
    description: "Trabalhamos apenas com vacinas de laboratorios reconhecidos e certificados pela ANVISA.",
  },
];

const Features = () => {
  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-[40px] font-bold text-[#56B0BB] leading-[120%] tracking-[-0.02em] text-center mb-4">
          Por que escolher a Vacina One?
        </h2>
        <p className="text-[18px] text-[#5A5A5A] text-center mb-16 max-w-[600px] mx-auto">
          Referencia em vacinacao com atendimento de qualidade e tecnologia a seu favor.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={64}
                height={64}
                className="mb-4"
              />
              <h3 className="text-[18px] font-semibold text-[#1A1A2E] mb-2">{feature.title}</h3>
              <p className="text-[15px] text-[#5A5A5A] leading-[160%]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
