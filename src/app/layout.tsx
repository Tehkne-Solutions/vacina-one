import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-franie",
});

export const metadata: Metadata = {
  title: "VacinaOne",
  description: "Proteção e cuidado para todas as fases da vida",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${plusJakartaSans.variable} font-franie overflow-x-clip`}>
        <Header />
        <div className="overflow-x-clip pt-[72px] md:pt-[88px]">
          {children}
        </div>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
