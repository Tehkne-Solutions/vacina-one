import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import Services from '@/components/Services';

export default function Home() {
  return (
    <main className="relative min-h-screen pt-[80px] md:pt-[110px]">
      <Header />
      <Hero />
      <WhyChoose />
      <Services />
    </main>
  );
}
