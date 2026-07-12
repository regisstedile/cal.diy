import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import MarkdownIt from "markdown-it";

// html:false (default) escapes raw HTML in the markdown — content is
// repo-controlled, but there's no reason to allow injection either.
const md = new MarkdownIt({ linkify: true });

export type HelpCategorySlug = "agenda" | "equipe" | "admin" | "cliente";

export type HelpCategory = {
  slug: HelpCategorySlug;
  title: string;
  description: string;
};

export type HelpDocMeta = {
  categoria: HelpCategorySlug;
  slug: string;
  title: string;
  ordem: number;
};

export type HelpDoc = HelpDocMeta & {
  html: string;
};

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    slug: "agenda",
    title: "Minha agenda",
    description: "Disponibilidade, calendário conectado e suas reservas do dia a dia.",
  },
  {
    slug: "equipe",
    title: "Equipe e eventos",
    description: "Tipos de evento, times, round-robin, lembretes e reatribuição.",
  },
  {
    slug: "admin",
    title: "Administração",
    description: "Usuários da organização, convites, papéis e suporte.",
  },
  {
    slug: "cliente",
    title: "Para quem agenda",
    description: "Guia de quem marca, remarca ou cancela um horário com a ALLGED.",
  },
];

const CATEGORY_SLUGS = new Set<string>(HELP_CATEGORIES.map((c) => c.slug));

function contentDir(): string {
  // In the container the compose file mounts docs/ajuda at /calcom/docs/ajuda
  // and sets HELP_DOCS_DIR; in local dev the repo-relative default applies.
  return process.env.HELP_DOCS_DIR ?? path.join(process.cwd(), "..", "..", "docs", "ajuda");
}

function parseFrontmatter(raw: string): { title: string | null; ordem: number; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { title: null, ordem: 999, body: raw };

  const body = raw.slice(match[0].length);
  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    fields[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  const ordem = Number.parseInt(fields.ordem ?? "", 10);
  return {
    title: fields.title || null,
    ordem: Number.isNaN(ordem) ? 999 : ordem,
    body,
  };
}

async function readCategoryDocs(categoria: HelpCategorySlug): Promise<HelpDoc[]> {
  const dir = path.join(contentDir(), categoria);
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }

  const docs: HelpDoc[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    let raw: string;
    try {
      raw = await fs.readFile(path.join(dir, file), "utf8");
    } catch {
      continue;
    }
    const { title, ordem, body } = parseFrontmatter(raw);
    docs.push({
      categoria,
      slug: file.replace(/\.md$/, ""),
      title: title ?? file.replace(/\.md$/, ""),
      ordem,
      html: md.render(body),
    });
  }

  docs.sort((a, b) => a.ordem - b.ordem || a.title.localeCompare(b.title));
  return docs;
}

export async function listHelpDocs(): Promise<Map<HelpCategorySlug, HelpDocMeta[]>> {
  const result = new Map<HelpCategorySlug, HelpDocMeta[]>();
  for (const category of HELP_CATEGORIES) {
    const docs = await readCategoryDocs(category.slug);
    result.set(
      category.slug,
      docs.map(({ html: _html, ...meta }) => meta)
    );
  }
  return result;
}

export async function getHelpDoc(categoria: string, slug: string): Promise<HelpDoc | null> {
  if (!CATEGORY_SLUGS.has(categoria)) return null;
  // The requested slug is matched against the directory listing rather than
  // interpolated into a path, so traversal input can never reach the fs.
  const docs = await readCategoryDocs(categoria as HelpCategorySlug);
  return docs.find((doc) => doc.slug === slug) ?? null;
}

export function getHelpCategory(categoria: string): HelpCategory | null {
  return HELP_CATEGORIES.find((c) => c.slug === categoria) ?? null;
}
