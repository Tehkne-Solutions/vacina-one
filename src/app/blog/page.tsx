import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';

export const metadata = {
  title: 'Blog - VacinaOne',
  description: 'Conteúdos sobre vacinação, prevenção e cuidado em saúde.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <main>
        <div className="w-[85%] mx-auto max-w-[1570px] py-20 text-center">
          <h1 className="text-4xl font-bold text-[#1A3858] mb-6">Blog</h1>
          <p className="text-xl text-[#5A5A5A] mb-4">
            Nenhum artigo publicado ainda.
          </p>
          <p className="text-lg text-[#5A5A5A]">
            Em breve, você encontrará aqui conteúdos sobre vacinação, prevenção
            e cuidado em saúde.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="w-[85%] mx-auto max-w-[1570px] py-20">
        <h1 className="text-4xl font-bold text-[#1A3858] mb-12">Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#1A3858] mb-3 line-clamp-2">
                  {post.title.rendered}
                </h2>
                <div
                  className="text-[#5A5A5A] line-clamp-3 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                />
                <div className="mt-4 text-[#56B0BB] font-semibold text-sm">
                  Ler artigo →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
