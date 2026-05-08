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
      className="w-full bg-[#1A3858] font-franie text-white"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="mx-auto w-[85%] max-w-[1595px] py-16 md:py-20 xl:min-h-[882px] xl:pb-[90px] xl:pt-[113px]">
        <div className="relative h-[54px] w-[240px] md:h-[62px] md:w-[280px] xl:h-[73px] xl:w-[329px]">
          <Image
            src="/images/vacina-one-logo.png"
            alt="VacinaOne"
            fill
            sizes="329px"
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16 xl:mt-[100px] xl:grid-cols-[762px_669px] xl:gap-[129px]">
          <div className="max-w-[762px]">
            <h2 className="max-w-[596px] text-[clamp(34px,6vw,42px)] font-bold leading-[118.52%] tracking-[-0.02em] text-white xl:text-[52px]">
              Ficou com alguma
              <br />
              dúvida? Fale com
              <br />a gente.
            </h2>

            <p className="mt-[30px] max-w-[762px] font-sans text-[16px] font-normal leading-[160.4%] tracking-[-0.02em] text-white md:text-[18px] xl:text-[20px]">
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

          <div className="grid w-full max-w-[669px] gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:flex xl:items-start xl:gap-[100px]">
            {footerColumns.map((column) => (
              <div key={column.title} className="xl:min-w-[120px]">
                <h3 className="font-serif text-[24px] font-normal leading-[42px] tracking-[-0.03em] text-white">{column.title}</h3>

                <ul className="mt-[30px] flex flex-col gap-5">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="whitespace-pre-line font-sans text-[16px] font-normal leading-[160.4%] tracking-[-0.02em] text-white transition duration-300 hover:text-[#56B0BB] md:text-[18px] xl:text-[20px]"
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
