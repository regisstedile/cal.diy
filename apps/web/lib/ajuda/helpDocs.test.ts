import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { getHelpCategory, getHelpDoc, listHelpDocs } from "./helpDocs";

let fixtureDir: string;

beforeAll(() => {
  fixtureDir = mkdtempSync(path.join(tmpdir(), "ajuda-test-"));
  process.env.HELP_DOCS_DIR = fixtureDir;

  mkdirSync(path.join(fixtureDir, "agenda"));
  writeFileSync(
    path.join(fixtureDir, "agenda", "segundo.md"),
    "---\ntitle: Segundo guia\nordem: 2\n---\nCorpo **dois**.\n"
  );
  writeFileSync(
    path.join(fixtureDir, "agenda", "primeiro.md"),
    "---\ntitle: Primeiro guia\nordem: 1\n---\n# Passo a passo\n\n1. Um\n2. Dois\n"
  );
  writeFileSync(path.join(fixtureDir, "agenda", "sem-frontmatter.md"), "Só corpo, sem cabeçalho.\n");
  writeFileSync(path.join(fixtureDir, "agenda", "ignorado.txt"), "não sou markdown");

  mkdirSync(path.join(fixtureDir, "cliente"));
  writeFileSync(
    path.join(fixtureDir, "cliente", "html-cru.md"),
    "---\ntitle: HTML cru\nordem: 1\n---\n<script>alert(1)</script> texto\n"
  );
  writeFileSync(
    path.join(fixtureDir, "cliente", "link-js.md"),
    "---\ntitle: Link JS\nordem: 2\n---\n[clique](javascript:alert(1))\n"
  );
});

afterAll(() => {
  delete process.env.HELP_DOCS_DIR;
  rmSync(fixtureDir, { recursive: true, force: true });
});

describe("listHelpDocs", () => {
  it("sorts by ordem and falls back to 999 without frontmatter", async () => {
    const all = await listHelpDocs();
    const agenda = all.get("agenda");
    expect(agenda?.map((d) => d.slug)).toEqual(["primeiro", "segundo", "sem-frontmatter"]);
  });

  it("ignores non-markdown files", async () => {
    const all = await listHelpDocs();
    expect(all.get("agenda")?.some((d) => d.slug === "ignorado")).toBe(false);
  });

  it("returns empty list for categories whose directory is missing", async () => {
    const all = await listHelpDocs();
    expect(all.get("equipe")).toEqual([]);
  });
});

describe("getHelpDoc", () => {
  it("renders markdown body to html", async () => {
    const doc = await getHelpDoc("agenda", "primeiro");
    expect(doc?.title).toBe("Primeiro guia");
    expect(doc?.html).toContain("<h1>");
    expect(doc?.html).toContain("<ol>");
  });

  it("escapes raw html in content", async () => {
    const doc = await getHelpDoc("cliente", "html-cru");
    expect(doc?.html).not.toContain("<script>");
    expect(doc?.html).toContain("&lt;script&gt;");
  });

  it("does not emit javascript: hrefs (markdown-it validateLink)", async () => {
    const doc = await getHelpDoc("cliente", "link-js");
    expect(doc?.html).not.toContain('href="javascript:');
  });

  it("rejects unknown categories and traversal-shaped slugs", async () => {
    expect(await getHelpDoc("nao-existe", "primeiro")).toBeNull();
    expect(await getHelpDoc("agenda", "../cliente/html-cru")).toBeNull();
  });
});

describe("getHelpCategory", () => {
  it("resolves known categories and rejects unknown", () => {
    expect(getHelpCategory("agenda")?.title).toBe("Minha agenda");
    expect(getHelpCategory("qualquer")).toBeNull();
  });
});
