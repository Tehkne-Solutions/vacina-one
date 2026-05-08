import Hero from '@/components/Hero';
import WhyChoose from '@/components/WhyChoose';
import AboutVacinaOne from '@/components/AboutVacinaOne';
import PopularVaccines from '@/components/PopularVaccines';
import FamilyCareAndCorporate from '@/components/FamilyCareAndCorporate';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import FaqSection from '@/components/FaqSection';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <WhyChoose />
      <AboutVacinaOne />
      <PopularVaccines />
      <FamilyCareAndCorporate />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
    </main>
  );
}
