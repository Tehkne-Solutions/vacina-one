import { WordPressPost } from '@/types/wordpress';

export function getFeaturedImage(post: WordPressPost) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return null;
  return {
    url:
      media.media_details?.sizes?.large?.source_url ||
      media.media_details?.sizes?.medium_large?.source_url ||
      media.source_url,
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
