import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import AboutVacinaOne from '@/components/AboutVacinaOne';
import PopularVaccines from '@/components/PopularVaccines';
import FamilyCareAndCorporate from '@/components/FamilyCareAndCorporate';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import FaqSection from '@/components/FaqSection';
import Services from '@/components/Services';

export default function Home() {
  return (
    <main className="relative min-h-screen pt-[80px] md:pt-[110px]">
      <Header />
      <Hero />
      <WhyChoose />
      <AboutVacinaOne />
      <PopularVaccines />
      <FamilyCareAndCorporate />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
      <Services />
    </main>
  );
}
