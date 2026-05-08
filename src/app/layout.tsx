import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-franie", // Usando como fallback para Franie
});

export const metadata: Metadata = {
  title: "Vacina One",
  description: "Proteção e cuidado para todas as fases da vida",
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
        <div className="pt-[80px] md:pt-[110px] overflow-x-clip">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
