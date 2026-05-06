import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Header />
      <Hero />
      <Features />
      <Services />
    </main>
  );
}
