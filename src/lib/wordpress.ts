import {
  WordPressPost,
  WordPressCategory,
  WordPressCustomPost,
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

// Função genérica de fetch com error handling
async function fetchFromWordPress<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  if (!API_URL) {
    return null;
  }

  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error(`Erro ao buscar ${url}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao conectar ao WordPress em ${endpoint}:`, error);
    return null;
  }
}

// POSTS (Blog)
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
export async function getVaccines(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>('/vacinas?_embed=1');
  return data || [];
}

export async function getVaccineBySlug(
  slug: string
): Promise<WordPressCustomPost | null> {
  const vaccines = await fetchFromWordPress<WordPressCustomPost[]>(
    `/vacinas?slug=${slug}&_embed=1`
  );
  return vaccines && vaccines.length > 0 ? vaccines[0] : null;
}

// UNIDADES (Custom Post Type)
export async function getUnits(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>('/unidades?_embed=1');
  return data || [];
}

export async function getUnitBySlug(
  slug: string
): Promise<WordPressCustomPost | null> {
  const units = await fetchFromWordPress<WordPressCustomPost[]>(
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
export async function getVaccineCalendar(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>(
    '/calendario_vacinal?_embed=1'
  );
  return data || [];
}
