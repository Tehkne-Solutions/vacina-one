import { WordPressPost } from '@/types/wordpress';

const WP_HOST = 'vacina-one-bkend.page.gd';

/**
 * Normaliza URLs de imagens do WordPress:
 * - Força https://
 * - Remove sufixos dimensionais (-1024x683, -300x200, etc.)
 * - Adiciona ?i=1 para imagens do InfinityFree (bypass de cache/proteção)
 * - Compatível com uploads com e sem pasta /ano/mês
 *   Ex: /wp-content/uploads/2026/05/imagem.webp  (padrão antigo)
 *       /wp-content/uploads/imagem.webp           (novo padrão)
 */
export function normalizeWpImageUrl(url: string): string {
  let normalized = url
    .replace(/^http:\/\//, 'https://')
    .replace(/-\d+x\d+(?=\.(webp|jpg|jpeg|png)(\?|$))/i, '');

  const isWpUpload =
    normalized.includes(WP_HOST) &&
    normalized.includes('/wp-content/uploads/');

  if (isWpUpload && !normalized.includes('?i=1') && !normalized.includes('&i=1')) {
    normalized += normalized.includes('?') ? '&i=1' : '?i=1';
  }

  return normalized;
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
