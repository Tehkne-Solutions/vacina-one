import { getPostBySlug, getPosts } from '@/lib/wordpress';
import { getFeaturedImage, getAuthorName } from '@/lib/wp-helpers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogPostHero from './BlogPostHero';
import BlogPostFaq, { FaqItem } from '@/components/blog/BlogPostFaq';
import BlogPostCta from '@/components/blog/BlogPostCta';
import RelatedPostsCarousel from '@/components/blog/RelatedPostsCarousel';

interface Params { slug: string }

// ── Extrai seções do HTML gerado pelo script de importação ─────────────
interface PostSections {
  contentHtml: string;
  faqItems: FaqItem[];
  ctaTitle: string;
  ctaText: string;
}

function extractPostSections(html: string): PostSections {
  // Separa no primeiro <h2> que contenha "Dúvidas frequentes"
  const faqSplit = html.split(/<h2[^>]*>[^<]*[Dd]úvidas frequentes[^<]*<\/h2>/i);
  const beforeFaq = faqSplit[0];
  const afterFaq = faqSplit[1] ?? '';

  // Remove o bloco de CTA final do conteúdo principal
  // Padrão: <h2>Como manter esse cuidado organizado</h2> ou <h2>Quer ...
  const ctaPattern = /<h2[^>]*>(?:Como manter esse cuidado organizado|Quer [^<]+|Vai viajar[^<]+|Precisa [^<]+|Ainda tem [^<]+)[^<]*<\/h2>/i;
  const contentHtml = beforeFaq.replace(ctaPattern, '').trim();

  // Extrai pares pergunta/resposta da seção FAQ
  const faqItems: FaqItem[] = [];
  if (afterFaq) {
    // Pega apenas até o próximo h2 que seja CTA
    const faqBody = afterFaq.split(ctaPattern)[0];
    const questionRe = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|<h2|$)/gi;
    let m: RegExpExecArray | null;
    while ((m = questionRe.exec(faqBody)) !== null) {
      const question = m[1].replace(/<[^>]*>/g, '').trim();
      const answerHtml = m[2];
      const answer = answerHtml.replace(/<[^>]*>/g, '').trim();
      if (question && answer) faqItems.push({ question, answer });
    }
  }

  // Extrai título e texto do CTA (do bloco após FAQ ou do conteúdo)
  const ctaSource = afterFaq || html;
  const ctaTitleMatch = ctaSource.match(/<h2[^>]*>(Quer [^<]+|Vai viajar[^<]+|Precisa [^<]+|Ainda tem [^<]+)<\/h2>/i);
  const ctaTitle = ctaTitleMatch ? ctaTitleMatch[1].replace(/<[^>]*>/g, '').trim() : '';
  const ctaTextMatch = ctaSource.match(/<h2[^>]*>(?:Quer|Vai|Precisa|Ainda)[^<]*<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/i);
  const ctaText = ctaTextMatch ? ctaTextMatch[1].replace(/<[^>]*>/g, '').trim() : '';

  return { contentHtml, faqItems, ctaTitle, ctaText };
}

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ── Metadata ───────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Artigo não encontrado' };
  return {
    title: `${post.title.rendered.replace(/<[^>]*>/g, '')} - Blog VacinaOne`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

// ── Página ─────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getPosts()]);

  if (!post) notFound();

  const img = getFeaturedImage(post);
  const author = getAuthorName(post);
  const title = post.title.rendered.replace(/<[^>]*>/g, '');
  const date = new Date(post.date).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
  const readTime = estimateReadTime(post.content.rendered);
  const { contentHtml, faqItems, ctaTitle, ctaText } = extractPostSections(
    post.content.rendered
  );

  return (
    <main>
      {/* Hero */}
      <BlogPostHero title={title} author={author} date={date} readTime={readTime} />

      {/* Container central */}
      <div className="w-[85%] mx-auto max-w-[900px] py-12">

        {/* Imagem de capa 16:9 */}
        {img?.url && (
          <figure className="mb-10 overflow-hidden rounded-[24px] shadow-sm bg-[#EAF4EB]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url.replace(/^http:\/\//, 'https://')}
              alt={img.alt}
              className="block w-full h-auto object-cover"
              loading="eager"
              decoding="async"
            />
          </figure>
        )}

        {/* Conteúdo principal (sem FAQ e sem CTA duplicado) */}
        <article
          className="prose-vacinaone"
          dangerouslySetInnerHTML={{
            __html: contentHtml.replace(/http:\/\//g, 'https://'),
          }}
        />

        {/* FAQ separada */}
        <BlogPostFaq items={faqItems} />

        {/* CTA separado */}
        <BlogPostCta
          title={ctaTitle || undefined}
          text={ctaText || undefined}
        />

        {/* Voltar ao blog */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/blog"
            className="text-[#56B0BB] text-[14px] font-semibold hover:underline"
          >
            ← Voltar ao Blog
          </Link>
        </div>

        {/* Carrossel de relacionados */}
        <RelatedPostsCarousel posts={allPosts} currentSlug={slug} />
      </div>
    </main>
  );
}
