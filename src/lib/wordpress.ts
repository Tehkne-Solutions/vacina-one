import crypto from 'node:crypto';
import {
  WordPressPost,
  WordPressCategory,
  WordPressCustomPost,
  WordPressUnit,
  WordPressVaccine,
  WordPressCalendar,
} from '@/types/wordpress';

const _WP_API = process.env.WORDPRESS_API_URL;
const _WP_BASE = process.env.WP_BASE_URL;

const API_URL =
  _WP_API ||
  (_WP_BASE ? `${_WP_BASE.replace(/\/$/, '')}/wp-json/wp/v2` : undefined);

if (process.env.NODE_ENV === 'development') {
  console.log(
    API_URL ? 'WordPress API URL configurada' : 'WordPress API URL ausente'
  );
}

// Cookie resolvido do challenge InfinityFree — persiste durante o processo
let wpCookieHeader = '';

function isAesChallenge(text: string): boolean {
  return (
    text.includes('/aes.js') &&
    text.includes('slowAES.decrypt') &&
    text.includes('document.cookie')
  );
}

function solveAesChallengeCookie(text: string): string {
  const re = /toNumbers\("([a-f0-9]+)"\)/g;
  const values: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) values.push(m[1]);
  const [keyHex, ivHex, cipherHex] = values;

  if (!keyHex || !ivHex || !cipherHex) return '';

  try {
    const decipher = crypto.createDecipheriv(
      'aes-128-cbc',
      Buffer.from(keyHex, 'hex'),
      Buffer.from(ivHex, 'hex')
    );
    decipher.setAutoPadding(false);
    const cookieValue = Buffer.concat([
      decipher.update(Buffer.from(cipherHex, 'hex')),
      decipher.final(),
    ]).toString('hex');
    return `__test=${cookieValue}`;
  } catch {
    return '';
  }
}

function parseJsonSafely<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function fetchWordPressResponse(
  url: string,
  options: RequestInit,
  allowChallengeRetry = true
): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
    ...(wpCookieHeader ? { Cookie: wpCookieHeader } : {}),
  };

  const response = await fetch(url, { ...options, headers });
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('text/html')) {
    return response;
  }

  const text = await response.text();

  if (allowChallengeRetry && isAesChallenge(text)) {
    const cookie = solveAesChallengeCookie(text);
    if (cookie) {
      wpCookieHeader = cookie;
      return fetchWordPressResponse(url, options, false);
    }
  }

  // Devolve a resposta HTML encapsulada para o caller tratar com parseJsonSafely
  return new Response(text, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

async function fetchFromWordPress<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  if (!API_URL) return null;

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetchWordPressResponse(url, {
      ...options,
      next: { revalidate: 300 },
    } as RequestInit);

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`WordPress ${endpoint}: HTTP ${response.status}`);
      }
      return null;
    }

    const text = await response.text();
    const data = parseJsonSafely<T>(text);

    if (data === null && process.env.NODE_ENV === 'development') {
      console.error(`WordPress ${endpoint}: resposta não veio como JSON`);
    }

    return data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`WordPress ${endpoint}: erro de conexão`, error);
    }
    return null;
  }
}

// POSTS (Blog)
export { getFeaturedImage, getAuthorName } from './wp-helpers';

export async function getPosts(): Promise<WordPressPost[]> {
  const data = await fetchFromWordPress<WordPressPost[]>('/posts?_embed=1');
  return data || [];
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const posts = await fetchFromWordPress<WordPressPost[]>(
    `/posts?slug=${slug}&_embed=1`
  );
  return posts && posts.length > 0 ? posts[0] : null;
}

export async function getCategories(): Promise<WordPressCategory[]> {
  const data = await fetchFromWordPress<WordPressCategory[]>('/categories');
  return data || [];
}

// VACINAS (Custom Post Type)
export async function getVaccines(): Promise<WordPressVaccine[]> {
  const data = await fetchFromWordPress<WordPressVaccine[]>('/vacinas?_embed=1&per_page=100');
  return data || [];
}

export async function getVaccineBySlug(
  slug: string
): Promise<WordPressVaccine | null> {
  const vaccines = await fetchFromWordPress<WordPressVaccine[]>(
    `/vacinas?slug=${slug}&_embed=1`
  );
  return vaccines && vaccines.length > 0 ? vaccines[0] : null;
}

// UNIDADES (Custom Post Type)
export async function getUnits(): Promise<WordPressUnit[]> {
  const data = await fetchFromWordPress<WordPressUnit[]>('/unidades?_embed=1&per_page=100');
  return data || [];
}

export async function getUnitBySlug(
  slug: string
): Promise<WordPressUnit | null> {
  const units = await fetchFromWordPress<WordPressUnit[]>(
    `/unidades?slug=${slug}&_embed=1`
  );
  return units && units.length > 0 ? units[0] : null;
}

// FAQs (Custom Post Type)
export async function getFaqs(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>('/faq?_embed=1');
  return data || [];
}

// CAMPANHAS PARA EMPRESAS (Custom Post Type)
export async function getCorporateCampaigns(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>(
    '/campanhas_empresas?_embed=1'
  );
  return data || [];
}

// CALENDÁRIO VACINAL (Custom Post Type)
export async function getVaccineCalendar(): Promise<WordPressCalendar[]> {
  const data = await fetchFromWordPress<WordPressCalendar[]>(
    '/calendario_vacinal?_embed=1&per_page=100'
  );
  return data || [];
}

export async function getVaccineCalendarBySlug(
  slug: string
): Promise<WordPressCalendar | null> {
  const items = await fetchFromWordPress<WordPressCalendar[]>(
    `/calendario_vacinal?slug=${slug}&_embed=1`
  );
  return items && items.length > 0 ? items[0] : null;
}
