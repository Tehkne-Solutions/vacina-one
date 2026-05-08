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
      <div className="mx-auto w-[85%] max-w-[1595px] py-[clamp(72px,6vw,113px)]">
        <div className="relative h-[clamp(54px,4vw,73px)] w-[clamp(240px,18vw,329px)]">
          <Image
            src="/images/vacina-one-logo.png"
            alt="VacinaOne"
            fill
            sizes="329px"
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="mt-[clamp(72px,6vw,100px)] grid gap-[clamp(56px,6vw,129px)] xl:grid-cols-[minmax(0,762px)_1fr]">
          <div className="max-w-[762px]">
            <h2 className="max-w-[596px] text-[clamp(38px,3vw,52px)] font-bold leading-[118.52%] tracking-[-0.02em] text-white">
              Ficou com alguma
              <br />
              dúvida? Fale com
              <br />a gente.
            </h2>

            <p className="mt-[30px] max-w-[762px] font-sans text-[clamp(16px,1.05vw,20px)] font-normal leading-[160.4%] tracking-[-0.02em] text-white">
              Quer agendar, tirar uma dúvida ou entender como a VacinaOne pode ajudar sua família, equipe ou instituição? Envie uma
              mensagem e retornamos em breve.
            </p>

            <Link
              href="/contato"
              className="mt-[clamp(40px,4vw,63px)] inline-flex h-[63px] w-full max-w-[262px] items-center justify-center rounded-full bg-[#56B0BB] px-10 font-sans text-[clamp(18px,1.15vw,22px)] font-medium leading-[102.52%] tracking-[-0.02em] text-[#1A3858] transition duration-300 hover:scale-[1.02] hover:brightness-105"
            >
              Entrar em contato
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-[clamp(48px,5vw,100px)]">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="font-serif text-[24px] font-normal leading-[42px] tracking-[-0.03em] text-white">{column.title}</h3>

                <ul className="mt-[30px] flex flex-col gap-5">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="whitespace-pre-line font-sans text-[clamp(16px,1.05vw,20px)] font-normal leading-[160.4%] tracking-[-0.02em] text-white transition duration-300 hover:text-[#56B0BB]"
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
