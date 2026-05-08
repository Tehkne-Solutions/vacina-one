import {
  WordPressPost,
  WordPressCategory,
  WordPressCustomPost,
} from '@/types/wordpress';

const API_URL = process.env.WORDPRESS_API_URL;

if (!API_URL) {
  console.warn(
    'WORDPRESS_API_URL não está configurada. O WordPress não estará disponível.'
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
  const data = await fetchFromWordPress<WordPressPost[]>('/posts');
  return data || [];
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const posts = await fetchFromWordPress<WordPressPost[]>(
    `/posts?slug=${slug}`
  );
  return posts && posts.length > 0 ? posts[0] : null;
}

export async function getCategories(): Promise<WordPressCategory[]> {
  const data = await fetchFromWordPress<WordPressCategory[]>('/categories');
  return data || [];
}

// VACINAS (Custom Post Type)
export async function getVaccines(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>('/vacinas');
  return data || [];
}

export async function getVaccineBySlug(
  slug: string
): Promise<WordPressCustomPost | null> {
  const vaccines = await fetchFromWordPress<WordPressCustomPost[]>(
    `/vacinas?slug=${slug}`
  );
  return vaccines && vaccines.length > 0 ? vaccines[0] : null;
}

// UNIDADES (Custom Post Type)
export async function getUnits(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>('/unidades');
  return data || [];
}

export async function getUnitBySlug(
  slug: string
): Promise<WordPressCustomPost | null> {
  const units = await fetchFromWordPress<WordPressCustomPost[]>(
    `/unidades?slug=${slug}`
  );
  return units && units.length > 0 ? units[0] : null;
}

// FAQs (Custom Post Type)
export async function getFaqs(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>('/faq');
  return data || [];
}

// CAMPANHAS PARA EMPRESAS (Custom Post Type)
export async function getCorporateCampaigns(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>(
    '/campanhas_empresas'
  );
  return data || [];
}

// CALENDÁRIO VACINAL (Custom Post Type)
export async function getVaccineCalendar(): Promise<WordPressCustomPost[]> {
  const data = await fetchFromWordPress<WordPressCustomPost[]>(
    '/calendario_vacinal'
  );
  return data || [];
}
