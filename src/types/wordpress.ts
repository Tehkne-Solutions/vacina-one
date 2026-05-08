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
