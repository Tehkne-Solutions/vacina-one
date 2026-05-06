import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';

export default function Home() {
  return (
    <main className="relative min-h-screen pt-[80px] md:pt-[90px]">
      <Header />
      <Hero />
      <Features />
      <Services />
    </main>
  );
}
