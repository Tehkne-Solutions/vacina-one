"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { mainNavLinks, siteContact, siteSocialLinks } from "@/lib/site-config";

const contactLinks = [
  { label: siteContact.email, href: `mailto:${siteContact.email}` },
  { label: siteContact.phone, href: siteContact.phoneHref },
  { label: siteContact.address, href: siteContact.mapsHref },
  { label: siteContact.hours, href: "/contato#atendimento-whatsapp" },
];

const serviceLinks = [
  { label: "Agendar vacinação", href: getWhatsAppHref("Olá! Vim pelo site da VacinaOne e quero agendar uma vacinação.") },
  { label: "Vacinação para empresas", href: "/empresas" },
  { label: "Check-up vacinal", href: "/calendario/vacinacao-para-imunidade-check-up" },
  { label: "Dúvidas frequentes", href: "/#faq" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const className = "block break-words font-sans text-[13px] font-normal leading-[1.5] tracking-[-0.02em] text-white/82 transition duration-300 hover:text-[#56B0BB] xl:text-[14px]";

  if (isExternal) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="min-w-0">
      <h3 className="font-sans text-[16px] font-bold leading-[1.2] tracking-[-0.02em] text-white xl:text-[17px]">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.label} className="min-w-0">
            <FooterLink href={item.href}>{item.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <motion.footer
      className="w-full overflow-x-clip bg-[#1A3858] font-franie text-white"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="mx-auto w-[88%] max-w-[1240px] overflow-x-clip py-12 md:py-14 lg:py-16">
        <div className="grid w-full gap-10 md:grid-cols-2 lg:grid-cols-[minmax(260px,0.95fr)_minmax(230px,0.8fr)_minmax(130px,0.45fr)_minmax(190px,0.65fr)] lg:gap-9 xl:gap-12">
          <div className="min-w-0 md:col-span-2 lg:col-span-1">
            <div className="relative h-[42px] w-[188px] md:h-[48px] md:w-[214px]">
              <Image
                src="/images/vacina-one-logo.png"
                alt="VacinaOne"
                fill
                sizes="214px"
                className="object-contain brightness-0 invert"
              />
            </div>

            <h2 className="mt-8 max-w-[380px] text-[clamp(26px,2.6vw,38px)] font-bold leading-[1.12] tracking-[-0.035em] text-white">
              Ficou com alguma dúvida? Fale com a gente.
            </h2>

            <p className="mt-4 max-w-[360px] font-sans text-[13px] font-normal leading-[1.55] tracking-[-0.02em] text-white/82 xl:text-[14px]">
              Agende sua vacinação, tire dúvidas sobre vacinas ou organize campanhas para empresas e instituições.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={getWhatsAppHref("Olá! Vim pelo site da VacinaOne e gostaria de atendimento.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[40px] items-center justify-center rounded-[13px] bg-[#25D366] px-5 font-sans text-[13px] font-bold text-white transition duration-300 hover:brightness-105"
              >
                Falar no WhatsApp
              </a>
              <Link
                href="/contato#atendimento-whatsapp"
                className="inline-flex h-[40px] items-center justify-center rounded-[13px] border border-white/45 px-5 font-sans text-[13px] font-bold text-white transition duration-300 hover:border-white hover:bg-white/10"
              >
                Ver atendimento
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
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

          <FooterColumn title="Contato" items={contactLinks} />
          <FooterColumn title="Menu" items={mainNavLinks} />
          <FooterColumn title="Atendimento" items={serviceLinks} />
        </div>
      </div>
    </motion.footer>
  );
}
