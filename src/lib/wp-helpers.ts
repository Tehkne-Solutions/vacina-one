import { WordPressPost } from '@/types/wordpress';

function normalizeWpImageUrl(url: string): string {
  return url
    .replace(/^http:\/\//, 'https://')
    .replace(/-\d+x\d+(?=\.(webp|jpg|jpeg|png)$)/i, '');
}

export function getFeaturedImage(post: WordPressPost) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return null;
  return {
    url: normalizeWpImageUrl(media.source_url),
    alt:
      media.alt_text ||
      media.title?.rendered?.replace(/<[^>]*>/g, '') ||
      post.title.rendered.replace(/<[^>]*>/g, ''),
    width: media.media_details?.width ?? 1200,
    height: media.media_details?.height ?? 720,
  };
}

export function getAuthorName(post: WordPressPost): string {
  return post._embedded?.author?.[0]?.name ?? 'VacinaOne';
}

export { normalizeWpImageUrl };
