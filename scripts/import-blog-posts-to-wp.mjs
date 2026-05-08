import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";

const ROOT = process.cwd();
const POSTS_PATH = path.join(ROOT, "content", "blog-posts.vacina-one.json");
const DRAFT_STATUS = "draft";

loadLocalEnv();

const WP_BASE_URL = cleanBaseUrl(process.env.WP_BASE_URL);
const WP_USERNAME = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;
let wpCookieHeader = "";

if (!WP_BASE_URL || !WP_USERNAME || !WP_APP_PASSWORD) {
  throw new Error("Defina WP_BASE_URL, WP_USERNAME e WP_APP_PASSWORD no .env.local ou no ambiente antes de importar.");
}

const posts = JSON.parse(await readFile(POSTS_PATH, "utf8"));

if (!Array.isArray(posts)) {
  throw new Error("O arquivo content/blog-posts.vacina-one.json deve conter um array JSON.");
}

const report = {
  created: [],
  skipped: [],
  uploadedImages: [],
  missingImages: [],
  failed: []
};

for (const post of posts) {
  try {
    const existing = await getExistingPost(post.slug);

    if (existing) {
      report.skipped.push(post.slug);
      console.log(`Ignorado, slug ja existe: ${post.slug}`);
      continue;
    }

    const categoryId = await ensureTerm("categories", post.category);
    const tagIds = [];

    for (const tag of post.tags || []) {
      tagIds.push(await ensureTerm("tags", tag));
    }

    const mediaId = await uploadFeaturedImage(post);
    const content = buildPostContent(post);
    const basePayload = {
      title: post.title,
      slug: post.slug,
      status: DRAFT_STATUS,
      excerpt: post.excerpt,
      content,
      categories: [categoryId],
      tags: tagIds,
      ...(mediaId ? { featured_media: mediaId } : {})
    };

    const payloadWithMeta = {
      ...basePayload,
      meta: {
        rank_math_title: post.metaTitle,
        rank_math_description: post.metaDescription
      }
    };

    let created;

    try {
      created = await wpJsonFetch("/posts", {
        method: "POST",
        body: payloadWithMeta
      });
    } catch {
      console.warn(`Meta SEO nao suportada para ${post.slug}. Criando sem meta Rank Math.`);
      created = await wpJsonFetch("/posts", {
        method: "POST",
        body: basePayload
      });
    }

    if (created.status !== DRAFT_STATUS) {
      throw new Error(`Post criado com status inesperado: ${created.status}`);
    }

    report.created.push(post.slug);
    console.log(`Rascunho criado: ${post.slug}`);
  } catch (error) {
    report.failed.push({
      slug: post.slug,
      error: error.message
    });
    console.error(`Falha em ${post.slug}: ${error.message}`);
  }
}

printReport(report);

if (report.failed.length > 0) {
  process.exitCode = 1;
}

async function getExistingPost(slug) {
  const postsBySlug = await wpJsonFetch("/posts", {
    searchParams: {
      slug,
      status: "any",
      per_page: "1"
    }
  });

  return Array.isArray(postsBySlug) ? postsBySlug[0] : null;
}

async function ensureTerm(taxonomy, name) {
  const items = await wpJsonFetch(`/${taxonomy}`, {
    searchParams: {
      search: name,
      per_page: "100"
    }
  });

  const existing = Array.isArray(items)
    ? items.find((item) => normalize(item.name) === normalize(name))
    : null;

  if (existing) {
    return existing.id;
  }

  const created = await wpJsonFetch(`/${taxonomy}`, {
    method: "POST",
    body: { name }
  });

  return created.id;
}

async function uploadFeaturedImage(post) {
  const imagePath = resolveFeaturedImagePath(post.featuredImage);

  if (!imagePath) {
    report.missingImages.push(post.slug);
    console.warn(`Imagem local ausente para ${post.slug}: ${post.featuredImage}`);
    return null;
  }

  const filename = path.basename(imagePath);
  // O WordPress define o caminho final da imagem (com ou sem /ano/mes/)
  // conforme a configuracao de uploads do painel. Nao hardcodamos datas aqui.
  const media = await wpBinaryFetch("/media", {
    method: "POST",
    filePath: imagePath,
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": getMimeType(filename)
    }
  });

  if (post.imageAlt) {
    try {
      await wpJsonFetch(`/media/${media.id}`, {
        method: "POST",
        body: {
          alt_text: post.imageAlt,
          title: post.title
        }
      });
    } catch (error) {
      console.warn(`Nao foi possivel atualizar alt text da imagem ${filename}: ${error.message}`);
    }
  }

  report.uploadedImages.push(post.slug);
  return media.id;
}

function resolveFeaturedImagePath(featuredImage) {
  const relative = featuredImage.replace(/^\//, "");
  const expected = path.join(ROOT, "public", relative);

  if (existsSync(expected)) {
    return expected;
  }

  const fallbackExtensions = [".jpg", ".jpeg", ".png"];

  for (const extension of fallbackExtensions) {
    const fallback = expected.replace(/\.webp$/i, extension);

    if (existsSync(fallback)) {
      return fallback;
    }
  }

  return null;
}

function buildPostContent(post) {
  const faqHtml = Array.isArray(post.faq)
    ? `<h2>Dúvidas frequentes</h2>${post.faq
        .map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`)
        .join("")}`
    : "";
  const ctaHtml = post.ctaTitle && post.ctaText
    ? `<h2>${escapeHtml(post.ctaTitle)}</h2><p>${escapeHtml(post.ctaText)}</p><p><strong>${escapeHtml(post.ctaButtonText)}</strong>: ${escapeHtml(post.ctaButtonUrl)}</p>`
    : "";

  return `${post.contentHtml}${faqHtml}${ctaHtml}`;
}

async function wpJsonFetch(endpoint, options = {}) {
  const response = await wpFetch(wpUrl(endpoint, options.searchParams), {
    method: options.method || "GET",
    headers: {
      Authorization: basicAuthHeader(),
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  return handleWpResponse(response, endpoint);
}

async function wpBinaryFetch(endpoint, options) {
  const body = await readFile(options.filePath);
  const response = await wpFetch(wpUrl(endpoint), {
    method: options.method || "POST",
    headers: {
      Authorization: basicAuthHeader(),
      ...options.headers
    },
    body
  });

  return handleWpResponse(response, endpoint);
}

async function wpFetch(url, options, allowChallengeRetry = true) {
  const headers = {
    ...(options.headers || {}),
    ...(wpCookieHeader ? { Cookie: wpCookieHeader } : {})
  };
  const response = await fetch(url, {
    ...options,
    headers
  });
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const text = await response.text();

  if (allowChallengeRetry && isAesChallenge(text)) {
    wpCookieHeader = solveAesChallengeCookie(text);
    return wpFetch(url, options, false);
  }

  return new Response(text, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

async function handleWpResponse(response, endpoint) {
  const text = await response.text();
  const data = text ? parseJson(text) : null;

  if (!response.ok) {
    const message = data?.message || text || `HTTP ${response.status}`;
    throw new Error(`WordPress API ${endpoint}: ${message}`);
  }

  if (!data) {
    throw new Error(`WordPress API ${endpoint}: resposta sem JSON valido.`);
  }

  return data;
}

function wpUrl(endpoint, searchParams = {}) {
  const url = new URL(`${WP_BASE_URL}/wp-json/wp/v2${endpoint}`);

  for (const [key, value] of Object.entries(searchParams)) {
    url.searchParams.set(key, value);
  }

  return url;
}

function basicAuthHeader() {
  const token = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString("base64");
  return `Basic ${token}`;
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isAesChallenge(text) {
  return text.includes("/aes.js") && text.includes("slowAES.decrypt") && text.includes("document.cookie");
}

function solveAesChallengeCookie(text) {
  const values = [...text.matchAll(/toNumbers\("([a-f0-9]+)"\)/g)].map((match) => match[1]);
  const [keyHex, ivHex, cipherHex] = values;

  if (!keyHex || !ivHex || !cipherHex) {
    throw new Error("Nao foi possivel resolver o desafio AES do host WordPress.");
  }

  const decipher = crypto.createDecipheriv(
    "aes-128-cbc",
    Buffer.from(keyHex, "hex"),
    Buffer.from(ivHex, "hex")
  );
  decipher.setAutoPadding(false);

  const cookieValue = Buffer.concat([
    decipher.update(Buffer.from(cipherHex, "hex")),
    decipher.final()
  ]).toString("hex");

  return `__test=${cookieValue}`;
}

function cleanBaseUrl(value) {
  return value ? value.replace(/\/+$/, "") : "";
}

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getMimeType(filename) {
  const extension = path.extname(filename).toLowerCase();

  if (extension === ".webp") return "image/webp";
  if (extension === ".png") return "image/png";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";

  return "application/octet-stream";
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function loadLocalEnv() {
  const envPath = path.join(ROOT, ".env.local");

  if (!existsSync(envPath)) {
    return;
  }

  const envText = readFileSync(envPath, "utf8");

  for (const rawLine of envText.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const index = line.indexOf("=");

    if (index === -1) {
      continue;
    }

    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();

    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function printReport(summary) {
  console.log("\nRelatorio da importacao WordPress");
  console.log(`Posts criados: ${summary.created.length}`);
  console.log(`Posts ignorados por slug ja existente: ${summary.skipped.length}`);
  console.log(`Imagens enviadas: ${summary.uploadedImages.length}`);
  console.log(`Imagens ausentes: ${summary.missingImages.length}`);
  console.log(`Falhas: ${summary.failed.length}`);

  if (summary.failed.length > 0) {
    for (const item of summary.failed) {
      console.log(`- ${item.slug}: ${item.error}`);
    }
  }
}
