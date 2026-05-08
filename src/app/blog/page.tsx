import { getPosts } from '@/lib/wordpress';
import BlogListClient from './BlogListClient';

export const metadata = {
  title: 'Blog - VacinaOne',
  description:
    'Informação clara para ajudar você a cuidar melhor da sua saúde e da sua família.',
};

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogListClient posts={posts} />;
}
