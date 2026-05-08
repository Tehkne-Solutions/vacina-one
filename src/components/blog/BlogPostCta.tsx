import Link from 'next/link';

interface BlogPostCtaProps {
  title?: string;
  text?: string;
}

export default function BlogPostCta({
  title = 'Quer cuidar melhor da sua saúde?',
  text = 'A VacinaOne oferece orientação acolhedora para você e sua família se vacinarem com segurança.',
}: BlogPostCtaProps) {
  return (
    <section className="mt-12 bg-[#F2FBFA] rounded-[24px] px-8 py-10 text-center">
      <h2 className="text-[22px] font-black text-[#1A3858] mb-3">{title}</h2>
      <p className="text-[15px] text-[#5A5A5A] mb-7 max-w-[480px] mx-auto leading-relaxed">
        {text}
      </p>
      <Link
        href="/contato"
        aria-label="Agendar vacinação na VacinaOne"
        className="inline-flex items-center gap-2 bg-[#F0B954] text-white font-black text-[16px] px-10 py-4 rounded-[50px] hover:scale-105 transition-transform duration-200 shadow-md"
      >
        Agendar Vacinação
      </Link>
    </section>
  );
}
