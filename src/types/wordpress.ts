export interface WordPressRendered {
  rendered: string;
}

export interface WordPressMedia {
  id: number;
  date: string;
  date_gmt: string;
  guid: WordPressRendered;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WordPressRendered;
  author: number;
  comment_status: string;
  ping_status: string;
  media_type: string;
  mime_type: string;
  media_details?: {
    width: number;
    height: number;
  };
  source_url: string;
}

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: WordPressRendered;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, unknown>;
  categories?: number[];
  tags?: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id?: number;
      source_url?: string;
      alt_text?: string;
      title?: { rendered?: string };
      media_details?: {
        width?: number;
        height?: number;
        sizes?: Record<string, { source_url?: string; width?: number; height?: number }>;
      };
    }>;
    author?: Array<{ id?: number; name?: string }>;
    'wp:term'?: Array<Array<{ id?: number; name?: string; slug?: string; taxonomy?: string }>>;
  };
  _links?: {
    self?: Array<{ href: string }>;
    collection?: Array<{ href: string }>;
    about?: Array<{ href: string }>;
    author?: Array<{ embeddable: boolean; href: string }>;
    replies?: Array<{ embeddable: boolean; href: string }>;
    version_history?: Array<{ count: number; href: string }>;
    wp_attachment?: Array<{ href: string }>;
    wp_term?: Array<{ taxonomy: string; embeddable: boolean; href: string }>;
    wp_format?: Array<{ embeddable: boolean; href: string }>;
    up?: Array<{ embeddable: boolean; href: string }>;
    curies?: Array<{ name: string; href: string; templated: boolean }>;
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: Record<string, unknown>;
  _links?: {
    self?: Array<{ href: string }>;
    collection?: Array<{ href: string }>;
    about?: Array<{ href: string }>;
    wp_post_type?: Array<{ href: string }>;
    curies?: Array<{ name: string; href: string; templated: boolean }>;
  };
}

export interface WordPressCustomPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: WordPressRendered;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  featured_media: number;
  template: string;
  meta: Record<string, unknown>;
  acf?: Record<string, unknown>;
  _links?: Record<string, unknown>;
}

export interface VaccineAcf {
  nome_popular?: string;
  descricao_curta?: string;
  indicacao?: string;
  faixa_etaria?: string;
  numero_de_doses?: string;
  esquema_vacinal?: string;
  reforco?: string;
  contraindicacoes?: string;
  cuidados_antes?: string;
  cuidados_depois?: string;
  disponivel_para_agendamento?: boolean;
  cta_texto?: string;
}

export interface WordPressVaccine {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  featured_media: number;
  acf?: VaccineAcf;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
  };
}

export interface CalendarAcf {
  titulo_publico?: string;
  descricao_curta?: string;
  faixa_etaria?: string;
  publico_alvo?: string;
  vacinas_relacionadas?: unknown;
  ordem_de_exibicao?: number | string;
  icone?: string;
  cta_texto?: string;
  cta_url?: string;
  ativo_no_site?: boolean;
  observacoes_importantes?: string;
}

export interface WordPressCalendar {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  featured_media: number;
  acf?: CalendarAcf;
}

export interface CorporateCampaignAcf {
  titulo_publico?: string;
  descricao_curta?: string;
  beneficios?: string | string[];
  publico_alvo?: string;
  vacinas_disponiveis?: string | unknown[];
  modelo_de_atendimento?: string;
  regioes_atendidas?: string;
  quantidade_minima_colaboradores?: string | number;
  prazo_para_agendamento?: string;
  whatsapp_cta?: string;
  cta_primario_texto?: string;
  cta_primario_url?: string;
  cta_secundario_texto?: string;
  cta_secundario_url?: string;
  faq_relacionado?: unknown;
  ativo_no_site?: boolean;
}

export interface WordPressCorporateCampaign {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  featured_media: number;
  acf?: CorporateCampaignAcf;
}

export interface UnitAcf {
  nome_da_unidade?: string;
  endereco_completo?: string;
  cidade?: string;
  bairro?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
  horario_de_funcionamento?: string;
  google_maps_url?: string;
  google_maps_embed?: string;
  unidade_ativa?: boolean;
  cta_texto?: string;
}

export interface WordPressUnit {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  featured_media: number;
  acf?: UnitAcf;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
  };
}
