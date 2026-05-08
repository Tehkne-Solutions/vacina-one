"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const footerColumns = [
  {
    title: "Our address",
    items: [
      { label: "piodoc@example.com", href: "mailto:piodoc@example.com" },
      { label: "+01-234-56789", href: "tel:+0123456789" },
      {
        label: "Mennica Legacy Tower,\nProsta Str. 20",
        href: "#",
      },
    ],
  },
  {
    title: "Uselink",
    items: [
      { label: "Home", href: "/" },
      { label: "How it works", href: "#" },
      { label: "Specialist", href: "#" },
      { label: "Services", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Solution", href: "#" },
      { label: "Legal", href: "#" },
      { label: "Career", href: "#" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <motion.footer
      className="w-full overflow-x-clip bg-[#1A3858] font-franie text-white"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="mx-auto w-[85%] max-w-[1595px] overflow-x-clip py-16 md:py-20 lg:min-h-[600px] xl:min-h-[750px] 2xl:min-h-[882px] lg:pb-16 lg:pt-20 xl:pb-20 xl:pt-28 2xl:pb-[90px] 2xl:pt-[113px]">
        <div className="relative h-[54px] w-[240px] md:h-[62px] md:w-[280px] lg:h-[65px] lg:w-[300px] xl:h-[70px] xl:w-[315px] 2xl:h-[73px] 2xl:w-[329px]">
          <Image
            src="/images/vacina-one-logo.png"
            alt="VacinaOne"
            fill
            sizes="329px"
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="mt-12 grid w-full gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12 lg:mt-16 xl:mt-20 2xl:mt-[100px] 2xl:grid-cols-[762px_669px] 2xl:gap-[129px]">
          <div className="max-w-[762px]">
            <h2 className="max-w-[596px] text-[clamp(34px,5vw,42px)] font-bold leading-[118.52%] tracking-[-0.02em] text-white lg:text-[42px] xl:text-[46px] 2xl:text-[52px]">
              Ficou com alguma
              <br />
              dúvida? Fale com
              <br />a gente.
            </h2>

            <p className="mt-[30px] max-w-[762px] font-sans text-[16px] font-normal leading-[160.4%] tracking-[-0.02em] text-white md:text-[17px] lg:text-[18px] 2xl:text-[20px]">
              Quer agendar, tirar uma dúvida ou entender como a VacinaOne pode ajudar sua família, equipe ou instituição? Envie uma
              mensagem e retornamos em breve.
            </p>

            <Link
              href="/contato"
              className="mt-10 inline-flex h-[56px] w-full max-w-[262px] items-center justify-center rounded-full bg-[#56B0BB] px-10 font-sans text-[18px] font-medium leading-[102.52%] tracking-[-0.02em] text-[#1A3858] transition duration-300 hover:scale-[1.02] hover:brightness-105 md:h-[63px] xl:mt-[63px] xl:text-[22px]"
            >
              Entrar em contato
            </Link>
          </div>

          <div className="grid w-full max-w-full gap-8 sm:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 xl:gap-10 2xl:flex 2xl:items-start 2xl:gap-[100px]">
            {footerColumns.map((column) => (
              <div key={column.title} className="min-w-0 2xl:min-w-[120px]">
                <h3 className="font-serif text-[24px] font-normal leading-[42px] tracking-[-0.03em] text-white">{column.title}</h3>

                <ul className="mt-[30px] flex flex-col gap-5">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="whitespace-pre-line font-sans text-[15px] font-normal leading-[160.4%] tracking-[-0.02em] text-white transition duration-300 hover:text-[#56B0BB] md:text-[16px] lg:text-[17px] 2xl:text-[20px]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
