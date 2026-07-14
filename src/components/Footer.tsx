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

function SocialIcon({ label }: { label: string }) {
  const normalized = label.toLowerCase();

  if (normalized.includes("instagram")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4.6" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17" cy="7" r="1.15" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes("facebook")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.2 8.3H16V5.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.4H6.7v3.1h2.7v7h3.3v-7h2.7l.4-3.1h-3.1V10c0-.9.2-1.7 1.5-1.7Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 11.7a8 8 0 0 1-11.8 7l-3.6 1 1-3.5A8 8 0 1 1 20 11.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.8 8.7c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.3 0 .5-.2.7l-.3.4c.6 1.1 1.4 1.9 2.5 2.5l.5-.4c.2-.2.4-.2.7-.1l1.4.6c.3.1.4.3.4.6v.5c0 .3-.2.6-.5.7-.5.2-1.3.3-2.3 0-2.8-.9-4.7-2.9-5.5-5.5-.3-.9-.1-1.7.1-2.2Z" fill="currentColor" />
    </svg>
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
                  title={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10 hover:text-[#56B0BB]"
                >
                  <SocialIcon label={social.label} />
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
