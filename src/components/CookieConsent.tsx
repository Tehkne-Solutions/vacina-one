"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "vacinaone_cookie_consent_v1";

type CookiePreferences = {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

const cookieOptions = [
  {
    key: "necessary" as const,
    title: "Necessários",
    description: "Essenciais para segurança, navegação e funcionamento básico do site.",
    locked: true,
  },
  {
    key: "preferences" as const,
    title: "Preferências",
    description: "Guardam escolhas como idioma, preferências visuais e configurações do usuário.",
    locked: false,
  },
  {
    key: "analytics" as const,
    title: "Medição e desempenho",
    description: "Ajudam a entender uso do site, páginas visitadas e melhorias de experiência.",
    locked: false,
  },
  {
    key: "marketing" as const,
    title: "Marketing",
    description: "Podem apoiar campanhas, conversões e comunicações mais relevantes.",
    locked: false,
  },
];

function readSavedPreferences(): CookiePreferences | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved) as Partial<CookiePreferences>;
    return {
      necessary: true,
      preferences: Boolean(parsed.preferences),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    setMounted(true);
    const saved = readSavedPreferences();
    if (saved) {
      setPreferences(saved);
      setIsBannerOpen(false);
      return;
    }
    setIsBannerOpen(true);
  }, []);

  const selectedCount = useMemo(
    () => [preferences.preferences, preferences.analytics, preferences.marketing].filter(Boolean).length,
    [preferences]
  );

  function save(next: CookiePreferences) {
    const finalPreferences = { ...next, necessary: true };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPreferences));
    setPreferences(finalPreferences);
    setIsBannerOpen(false);
    setIsPanelOpen(false);
    window.dispatchEvent(new CustomEvent("vacinaone:cookie-consent", { detail: finalPreferences }));
  }

  function acceptAll() {
    save({ necessary: true, preferences: true, analytics: true, marketing: true });
  }

  function rejectOptional() {
    save(defaultPreferences);
  }

  function toggle(key: keyof CookiePreferences) {
    if (key === "necessary") return;
    setPreferences((current) => ({ ...current, [key]: !current[key], necessary: true }));
  }

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsPanelOpen(true)}
        aria-label="Abrir preferências de segurança e privacidade"
        className="fixed bottom-5 left-5 z-[121] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white text-[#1A3858] shadow-[0_10px_26px_rgba(26,56,88,0.18)] transition hover:-translate-y-0.5 hover:text-[#56B0BB] md:bottom-7 md:left-7"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3.2 5.2 5.7v5.7c0 4.3 2.8 7.7 6.8 9.4 4-1.7 6.8-5.1 6.8-9.4V5.7L12 3.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9.1 12.1 11 14l4-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isBannerOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[130] px-4 pb-4 md:px-6 md:pb-6">
          <div className="mx-auto max-w-[1120px] rounded-[26px] border border-[#DDEFEA] bg-white p-5 shadow-[0_20px_70px_rgba(26,56,88,0.18)] md:p-6">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4EB] text-[#56B0BB]">
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3.2 5.2 5.7v5.7c0 4.3 2.8 7.7 6.8 9.4 4-1.7 6.8-5.1 6.8-9.4V5.7L12 3.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#56B0BB]">Privacidade e cookies</p>
                    <h2 className="text-[20px] font-black leading-tight text-[#1A3858]">Usamos cookies para melhorar sua experiência</h2>
                  </div>
                </div>
                <p className="mt-3 max-w-[780px] text-[14px] leading-relaxed text-[#5A5A5A]">
                  Utilizamos cookies necessários para o funcionamento do site e, com sua autorização, cookies de preferências, medição e marketing. Você pode aceitar tudo, recusar opcionais ou personalizar suas escolhas.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <button type="button" onClick={() => setIsPanelOpen(true)} className="inline-flex h-[40px] items-center justify-center rounded-[13px] border border-[#56B0BB] px-4 text-[13px] font-black text-[#56B0BB] transition hover:bg-[#F2FBFA]">
                  Preferências
                </button>
                <button type="button" onClick={rejectOptional} className="inline-flex h-[40px] items-center justify-center rounded-[13px] border border-[#DDEFEA] px-4 text-[13px] font-black text-[#1A3858] transition hover:bg-[#F2FBFA]">
                  Recusar opcionais
                </button>
                <button type="button" onClick={acceptAll} className="inline-flex h-[40px] items-center justify-center rounded-[13px] bg-[#56B0BB] px-4 text-[13px] font-black text-white transition hover:brightness-105">
                  Aceitar todos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPanelOpen && (
        <div className="fixed inset-0 z-[140] flex items-end justify-center bg-[#1A3858]/45 p-4 backdrop-blur-sm md:items-center">
          <div className="max-h-[88vh] w-full max-w-[720px] overflow-y-auto rounded-[26px] bg-white p-5 shadow-[0_24px_80px_rgba(26,56,88,0.24)] md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#56B0BB]">Central de privacidade</p>
                <h2 className="mt-1 text-[26px] font-black leading-tight text-[#1A3858]">Preferências de cookies</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-[#5A5A5A]">
                  Ajuste suas permissões a qualquer momento. Cookies necessários permanecem ativos para manter o site funcionando com segurança.
                </p>
              </div>
              <button type="button" onClick={() => setIsPanelOpen(false)} aria-label="Fechar preferências" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F2FBFA] text-[#1A3858] transition hover:bg-[#EAF4EB]">
                ×
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {cookieOptions.map((option) => {
                const active = preferences[option.key];
                return (
                  <div key={option.key} className="rounded-[18px] border border-[#EAF4EB] bg-[#F9FCFB] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[16px] font-black text-[#1A3858]">{option.title}</h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-[#5A5A5A]">{option.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle(option.key)}
                        disabled={option.locked}
                        aria-pressed={active}
                        className={`relative h-7 w-12 shrink-0 rounded-full transition ${active ? "bg-[#56B0BB]" : "bg-[#C8D7D5]"} ${option.locked ? "cursor-not-allowed opacity-75" : ""}`}
                      >
                        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${active ? "left-6" : "left-1"}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-[18px] bg-[#F2FBFA] p-4 text-[13px] leading-relaxed text-[#5A5A5A]">
              Opcionais ativos: <strong className="text-[#1A3858]">{selectedCount}</strong>. Você pode alterar essa escolha pelo botão de segurança no canto inferior esquerdo.
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={rejectOptional} className="inline-flex h-[42px] items-center justify-center rounded-[13px] border border-[#DDEFEA] px-5 text-[13px] font-black text-[#1A3858] transition hover:bg-[#F2FBFA]">
                Recusar opcionais
              </button>
              <button type="button" onClick={() => save(preferences)} className="inline-flex h-[42px] items-center justify-center rounded-[13px] border border-[#56B0BB] px-5 text-[13px] font-black text-[#56B0BB] transition hover:bg-[#F2FBFA]">
                Salvar preferências
              </button>
              <button type="button" onClick={acceptAll} className="inline-flex h-[42px] items-center justify-center rounded-[13px] bg-[#56B0BB] px-5 text-[13px] font-black text-white transition hover:brightness-105">
                Aceitar todos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
