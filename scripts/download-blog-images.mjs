import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const POSTS_PATH = path.join(ROOT, "content", "blog-posts.vacina-one.json");
const MANIFEST_PATH = path.join(ROOT, "public", "images", "blog", "blog-images-manifest.json");

const queriesBySlug = {
  "vacina-da-gripe-o-que-muda-todo-ano": "flu vaccine clinic healthcare patient",
  "calendario-vacinal-infantil-vacinas-em-dia": "child vaccination pediatric healthcare family",
  "vacinacao-para-empresas-proteger-equipes": "corporate healthcare vaccination workplace team",
  "vacinas-para-viagem-o-que-verificar": "travel health passport vaccine clinic",
  "hpv-prevencao-deve-comecar-cedo": "teen healthcare doctor consultation vaccine",
  "febre-amarela-quando-vacina-indicada": "travel vaccine yellow fever healthcare",
  "meningite-vacinas-ajudam-prevencao": "doctor consultation vaccine prevention healthcare",
  "vacinacao-em-idosos-cuidados-60-mais": "senior vaccination healthcare nurse",
  "como-funciona-reforco-vacinal": "vaccine booster healthcare patient",
  "duvidas-frequentes-antes-de-tomar-vacina": "doctor answering questions patient healthcare"
};

const photoIndexBySlug = {
  "vacina-da-gripe-o-que-muda-todo-ano": 2,
  "calendario-vacinal-infantil-vacinas-em-dia": 2,
  "vacinacao-para-empresas-proteger-equipes": 2,
  "vacinas-para-viagem-o-que-verificar": 2,
  "hpv-prevencao-deve-comecar-cedo": 3,
  "febre-amarela-quando-vacina-indicada": 7,
  "meningite-vacinas-ajudam-prevencao": 2,
  "vacinacao-em-idosos-cuidados-60-mais": 3,
  "como-funciona-reforco-vacinal": 2,
  "duvidas-frequentes-antes-de-tomar-vacina": 2
};

loadLocalEnv();

const apiKey = process.env.PEXELS_API_KEY;

if (!apiKey) {
  throw new Error("PEXELS_API_KEY nao encontrada. Defina a variavel no .env.local ou no ambiente antes de rodar o script.");
}

const sharp = await loadSharp();
const posts = JSON.parse(await readFile(POSTS_PATH, "utf8"));

if (!Array.isArray(posts)) {
  throw new Error("O arquivo content/blog-posts.vacina-one.json deve conter um array JSON.");
}

const manifest = [];
let downloaded = 0;
let fallbackJpg = 0;

for (const post of posts) {
  const query = queriesBySlug[post.slug];

  if (!query) {
    throw new Error(`Query Pexels nao mapeada para o slug: ${post.slug}`);
  }

  const photo = await withRetry(
    () => searchPexelsPhoto(query, photoIndexBySlug[post.slug] || 0),
    `busca Pexels ${post.slug}`
  );
  const sourceUrl = photo?.src?.large2x || photo?.src?.large || photo?.src?.original;

  if (!sourceUrl) {
    throw new Error(`Nenhuma imagem encontrada no Pexels para: ${post.slug}`);
  }

  const response = await withRetry(() => fetch(sourceUrl), `download imagem ${post.slug}`);

  if (!response.ok) {
    throw new Error(`Falha ao baixar imagem de ${post.slug}: HTTP ${response.status}`);
  }

  const inputBuffer = Buffer.from(await response.arrayBuffer());
  const featuredPath = post.featuredImage.replace(/^\//, "");
  const webpTarget = path.join(ROOT, "public", featuredPath);
  const filename = path.basename(webpTarget);
  let finalPath = post.featuredImage;
  let finalFilename = filename;

  await mkdir(path.dirname(webpTarget), { recursive: true });

  if (sharp) {
    await sharp(inputBuffer)
      .resize(1200, 800, { fit: "cover" })
      .webp({ quality: 84 })
      .toFile(webpTarget);
  } else {
    finalFilename = filename.replace(/\.webp$/i, ".jpg");
    finalPath = post.featuredImage.replace(/\.webp$/i, ".jpg");
    const jpgTarget = webpTarget.replace(/\.webp$/i, ".jpg");
    await writeFile(jpgTarget, inputBuffer);
    fallbackJpg += 1;
    console.warn(`sharp nao esta instalado. Fallback JPG salvo para ${post.slug}: ${finalPath}`);
  }

  manifest.push({
    slug: post.slug,
    title: post.title,
    query,
    filename: finalFilename,
    path: finalPath,
    provider: "Pexels",
    photographer: photo.photographer,
    photographer_url: photo.photographer_url,
    source_url: photo.url
  });

  downloaded += 1;
  console.log(`Imagem preparada: ${post.slug}`);
}

await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log("Download de imagens concluido.");
console.log(`Imagens processadas: ${downloaded}`);
console.log(`Fallback JPG: ${fallbackJpg}`);
console.log(`Manifest: ${path.relative(ROOT, MANIFEST_PATH)}`);

async function searchPexelsPhoto(query, photoIndex) {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "8");
  url.searchParams.set("orientation", "landscape");

  const response = await fetch(url, {
    headers: {
      Authorization: apiKey
    }
  });

  if (!response.ok) {
    throw new Error(`Falha na API do Pexels para "${query}": HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.photos?.[photoIndex] || data.photos?.[0];
}

async function withRetry(task, label, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        const waitMs = attempt * 1000;
        console.warn(`${label} falhou na tentativa ${attempt}. Tentando novamente em ${waitMs}ms.`);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
  }

  throw lastError;
}

async function loadSharp() {
  try {
    const mod = await import("sharp");
    return mod.default;
  } catch {
    console.warn("sharp nao encontrado. Para gerar WebP 1200x800 com qualidade 84, instale sharp antes de rodar em producao.");
    return null;
  }
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
