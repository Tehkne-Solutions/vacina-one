/**
 * Helpers de imagens do Blog.
 * Prioriza arquivos locais em /public/images/blog/ para evitar
 * bloqueio de hotlink/proteção do WordPress staging (InfinityFree).
 */

export function cleanImageUrl(url?: string | null): string | null {
  if (!url) return null;
  return url
    .replace(/^http:\/\//, 'https://')
    .split('?')[0]
    .replace(/-\d+x\d+(?=\.(webp|jpg|jpeg|png)$)/i, '');
}

export function getFilenameFromUrl(url?: string | null): string | null {
  const clean = cleanImageUrl(url);
  if (!clean) return null;
  const parts = clean.split('/');
  return parts[parts.length - 1] || null;
}

/**
 * Se o filename começar com "vacina-one-blog-" e for uma imagem,
 * retorna o caminho local /images/blog/[filename].
 * Caso contrário, retorna a URL remota limpa.
 */
export function getLocalBlogImageUrl(remoteUrl?: string | null): string | null {
  const filename = getFilenameFromUrl(remoteUrl);
  if (!filename) return null;

  const isVacinaOneBlogImage =
    filename.startsWith('vacina-one-blog-') &&
    /\.(webp|jpg|jpeg|png)$/i.test(filename);

  if (isVacinaOneBlogImage) {
    return `/images/blog/${filename}`;
  }

  return cleanImageUrl(remoteUrl);
}
