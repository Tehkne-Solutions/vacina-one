import { getPostBySlug, getPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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

  if (!post) {
    return {
      title: 'Artigo não encontrado',
    };
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <div className="w-[85%] mx-auto max-w-[1570px] py-12">
        <Link
          href="/blog"
          className="text-[#56B0BB] font-semibold mb-6 inline-block hover:underline"
        >
          ← Voltar ao Blog
        </Link>

        <article className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#1A3858] mb-4">
            {post.title.rendered}
          </h1>

          <div className="text-[#5A5A5A] text-sm mb-8">
            {new Date(post.date).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          <div
            className="prose prose-sm max-w-none text-[#5A5A5A] leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
        </article>
      </div>
    </main>
  );
}
