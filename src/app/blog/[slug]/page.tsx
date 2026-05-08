import { getPostBySlug, getPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BlogRelatedPosts from '@/components/BlogRelatedPosts';
import BlogPostHero from './BlogPostHero';

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Artigo não encontrado' };
  return {
    title: `${post.title.rendered.replace(/<[^>]*>/g, '')} - Blog VacinaOne`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

function getFeaturedImageUrl(post: Awaited<ReturnType<typeof getPostBySlug>>): string | null {
  if (!post) return null;
  const embedded = (post as unknown as Record<string, unknown>)['_embedded'] as
    | Record<string, unknown>
    | undefined;
  if (!embedded) return null;
  const media = embedded['wp:featuredmedia'] as
    | Array<{ source_url?: string; alt_text?: string }>
    | undefined;
  return media?.[0]?.source_url ?? null;
}

function getAuthorName(post: Awaited<ReturnType<typeof getPostBySlug>>): string {
  if (!post) return 'VacinaOne';
  const embedded = (post as unknown as Record<string, unknown>)['_embedded'] as
    | Record<string, unknown>
    | undefined;
  if (!embedded) return 'VacinaOne';
  const authors = embedded['author'] as Array<{ name?: string }> | undefined;
  return authors?.[0]?.name ?? 'VacinaOne';
}

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getPosts()]);

  if (!post) notFound();

  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const readTime = estimateReadTime(post.content.rendered);
  const title = post.title.rendered.replace(/<[^>]*>/g, '');
  const date = new Date(post.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main>
      {/* Hero do post */}
      <BlogPostHero title={title} author={author} date={date} readTime={readTime} />

      {/* Conteúdo central */}
      <div className="w-[85%] mx-auto max-w-[860px] py-12">
        {/* Imagem de capa 16:9 */}
        {imageUrl && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-sm">
            <Image
              src={imageUrl}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 860px"
              className="object-cover"
            />
          </div>
        )}

        {/* Conteúdo WordPress */}
        <article
          className="prose-vacinaone"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/contato"
            aria-label="Agendar vacinação na VacinaOne"
            className="inline-flex items-center gap-2 bg-[#56B0BB] text-[#1A3858] font-black text-[17px] px-10 py-4 rounded-[50px] hover:scale-105 transition-transform duration-200 shadow-md"
          >
            Agendar Vacinação
          </Link>
        </div>

        {/* Voltar ao blog */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/blog"
            className="text-[#56B0BB] text-[14px] font-semibold hover:underline"
          >
            ← Voltar ao Blog
          </Link>
        </div>

        {/* Outros posts */}
        <BlogRelatedPosts posts={allPosts} currentSlug={slug} />
      </div>
    </main>
  );
}
