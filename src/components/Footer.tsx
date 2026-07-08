"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { mainNavLinks, siteContact, siteSocialLinks } from "@/lib/site-config";

const footerColumns = [
  {
    title: "Contato",
    items: [
      { label: siteContact.email, href: `mailto:${siteContact.email}` },
      { label: siteContact.phone, href: siteContact.phoneHref },
      { label: siteContact.address, href: siteContact.mapsHref },
      { label: siteContact.hours, href: "/contato#atendimento-whatsapp" },
    ],
  },
  {
    title: "Menu",
    items: mainNavLinks,
  },
  {
    title: "Atendimento",
    items: [
      { label: "Agendar vacinação", href: getWhatsAppHref("Olá! Vim pelo site da VacinaOne e quero agendar uma vacinação.") },
      { label: "Vacinação para empresas", href: "/empresas" },
      { label: "Check-up vacinal", href: "/calendario/vacinacao-para-imunidade-check-up" },
      { label: "Dúvidas frequentes", href: "/#faq" },
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
      <div className="mx-auto w-[85%] max-w-[1595px] overflow-x-clip py-14 md:py-16 lg:py-20">
        <div className="relative h-[48px] w-[214px] md:h-[58px] md:w-[260px]">
          <Image
            src="/images/vacina-one-logo.png"
            alt="VacinaOne"
            fill
            sizes="260px"
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="mt-10 grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
          <div className="max-w-[620px]">
            <h2 className="max-w-[520px] text-[clamp(30px,4vw,44px)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
              Ficou com alguma dúvida? Fale com a gente.
            </h2>

            <p className="mt-5 max-w-[620px] font-sans text-[15px] font-normal leading-[1.6] tracking-[-0.02em] text-white/85 md:text-[17px]">
              Agende sua vacinação, tire dúvidas sobre vacinas, organize campanhas para empresas ou monte um plano vacinal personalizado.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={getWhatsAppHref("Olá! Vim pelo site da VacinaOne e gostaria de atendimento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[42px] items-center justify-center rounded-[14px] bg-[#25D366] px-5 font-sans text-[14px] font-bold text-white transition duration-300 hover:brightness-105"
              >
                Falar no WhatsApp
              </a>
              <Link
                href="/contato#atendimento-whatsapp"
                className="inline-flex h-[42px] items-center justify-center rounded-[14px] border border-white/50 px-5 font-sans text-[14px] font-bold text-white transition duration-300 hover:border-white hover:bg-white/10"
              >
                Ver atendimento
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {siteSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/30 px-3 text-[12px] font-bold text-white transition hover:border-white hover:bg-white/10"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>

          <div className="grid w-full max-w-full gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title} className="min-w-0">
                <h3 className="font-sans text-[18px] font-bold leading-[1.2] tracking-[-0.02em] text-white">{column.title}</h3>

                <ul className="mt-5 flex flex-col gap-3">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="whitespace-pre-line font-sans text-[14px] font-normal leading-[1.45] tracking-[-0.02em] text-white/82 transition duration-300 hover:text-[#56B0BB] md:text-[15px]"
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
