/**
 * scripts/sync-blog-images-from-wp.mjs
 *
 * Sincroniza imagens dos posts do WordPress para public/images/blog/.
 * Uso:
 *   node scripts/sync-blog-images-from-wp.mjs
 *   node scripts/sync-blog-images-from-wp.mjs --force    # baixa mesmo se já existir
 *   node scripts/sync-blog-images-from-wp.mjs --strict   # exit 1 se houver erros
 */

import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const BLOG_IMAGES_DIR = path.join(ROOT, "public", "images", "blog");
const FORCE = process.argv.includes("--force");
const STRICT = process.argv.includes("--strict");

loadLocalEnv();

const API_URL =
  process.env.WORDPRESS_API_URL ||
  "https://vacina-one-bkend.page.gd/wp-json/wp/v2";

const report = {
  total: 0,
  alreadyExists: [],
  downloaded: [],
  skippedNotBlogImage: [],
  errors: [],
};

await ensureBlogImagesDir();

console.log(`Buscando posts em: ${API_URL}/posts?per_page=100&_embed=1`);
const posts = await fetchJson(`${API_URL}/posts?per_page=100&_embed=1`);

if (!Array.isArray(posts)) {
  console.error("Nao foi possivel buscar posts do WordPress. Verifique WORDPRESS_API_URL.");
  process.exit(1);
}

report.total = posts.length;
console.log(`${posts.length} posts encontrados.\n`);

for (const post of posts) {
  const title = post.title?.rendered?.replace(/<[^>]*>/g, "") || post.slug;
  const rawUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  if (!rawUrl) {
    console.log(`[sem imagem] ${title}`);
    continue;
  }

  const filename = getFilenameFromUrl(rawUrl);

  if (!filename) {
    console.log(`[ignorado] URL invalida: ${rawUrl}`);
    continue;
  }

  if (!filename.startsWith("vacina-one-blog-") || !/\.(webp|jpg|jpeg|png)$/i.test(filename)) {
    report.skippedNotBlogImage.push(filename);
    console.log(`[ignorado] Nao e imagem do blog: ${filename}`);
    continue;
  }

  const outputPath = path.join(BLOG_IMAGES_DIR, filename);

  if (!FORCE && existsSync(outputPath)) {
    const info = await stat(outputPath);
    if (info.size > 0) {
      report.alreadyExists.push(filename);
      console.log(`[ok] Ja existe: ${filename} (${formatBytes(info.size)})`);
      continue;
    }
  }

  const candidates = buildCandidateUrls(rawUrl, filename);
  const result = await downloadImage(candidates, outputPath);

  if (result.ok) {
    report.downloaded.push(filename);
    console.log(`[baixado] ${filename} (${formatBytes(result.size)}) <- ${result.usedUrl}`);
  } else {
    report.errors.push({ filename, error: result.error });
    console.error(`[erro] ${filename}: ${result.error}`);
  }
}

printReport();

if (STRICT && report.errors.length > 0) {
  process.exit(1);
}

// ── Funções ────────────────────────────────────────────────────────────

async function ensureBlogImagesDir() {
  await mkdir(BLOG_IMAGES_DIR, { recursive: true });
}

async function fetchJson(url) {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("text/html")) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function getFilenameFromUrl(url) {
  if (!url) return null;
  const clean = url.split("?")[0].replace(/-\d+x\d+(?=\.(webp|jpg|jpeg|png)$)/i, "");
  const parts = clean.split("/");
  return parts[parts.length - 1] || null;
}

function buildCandidateUrls(originalUrl, filename) {
  const base = "https://vacina-one-bkend.page.gd/wp-content/uploads";
  const clean = originalUrl
    .replace(/^http:\/\//, "https://")
    .split("?")[0]
    .replace(/-\d+x\d+(?=\.(webp|jpg|jpeg|png)$)/i, "");

  const candidates = new Set([
    clean,
    `${clean}?i=1`,
    `${base}/${filename}`,
    `${base}/${filename}?i=1`,
  ]);

  return [...candidates];
}

async function downloadImage(candidateUrls, outputPath) {
  for (const url of candidateUrls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;

      const ct = res.headers.get("content-type") || "";
      if (ct.includes("text/html")) continue;
      if (!ct.startsWith("image/")) continue;

      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length === 0) continue;

      await writeFile(outputPath, buffer);
      return { ok: true, size: buffer.length, usedUrl: url };
    } catch {
      continue;
    }
  }

  return { ok: false, error: `Todas as ${candidateUrls.length} URLs falharam ou retornaram 0 B` };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function printReport() {
  console.log("\n── Relatório sync-blog-images ──────────────────────");
  console.log(`Posts analisados:     ${report.total}`);
  console.log(`Já existiam:          ${report.alreadyExists.length}`);
  console.log(`Baixadas agora:       ${report.downloaded.length}`);
  console.log(`Ignoradas (não blog): ${report.skippedNotBlogImage.length}`);
  console.log(`Erros:                ${report.errors.length}`);

  if (report.errors.length > 0) {
    console.log("\nErros:");
    for (const e of report.errors) {
      console.log(`  - ${e.filename}: ${e.error}`);
    }
  }

  console.log("\nImagens locais disponíveis:");
  for (const f of [...report.alreadyExists, ...report.downloaded]) {
    console.log(`  /images/blog/${f}`);
  }
}

function loadLocalEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;

  const text = readFileSync(envPath, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}
