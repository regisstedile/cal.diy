import { HELP_CATEGORIES, listHelpDocs } from "@lib/ajuda/helpDocs";
import { _generateMetadata } from "app/_utils";
import Link from "next/link";

// Content is read from the filesystem on every request so edits to the
// mounted docs/ajuda volume show up without an image rebuild.
export const dynamic = "force-dynamic";

export const generateMetadata = async () =>
  await _generateMetadata(
    () => "Ajuda",
    () => "Central de ajuda ALLGED Agenda",
    undefined,
    undefined,
    "/ajuda"
  );

const Page = async () => {
  const docsByCategory = await listHelpDocs();
  const hasAnyDoc = Array.from(docsByCategory.values()).some((docs) => docs.length > 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-emphasis text-2xl font-semibold">Central de Ajuda</h1>
      <p className="text-subtle mt-1 text-sm">
        Guias rápidos para operar a agenda ALLGED. Escolha o seu perfil abaixo.
      </p>

      {!hasAnyDoc ? (
        <p className="text-subtle mt-10 text-sm">
          Nenhum guia publicado ainda. O conteúdo fica em <code>docs/ajuda/</code> no repositório.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {HELP_CATEGORIES.map((category) => {
            const docs = docsByCategory.get(category.slug) ?? [];
            if (docs.length === 0) return null;
            return (
              <section key={category.slug} className="border-subtle rounded-lg border p-5">
                <h2 className="text-emphasis text-base font-semibold">{category.title}</h2>
                <p className="text-subtle mt-1 text-sm">{category.description}</p>
                <ul className="mt-4 space-y-2">
                  {docs.map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={`/ajuda/${category.slug}/${doc.slug}`}
                        className="text-default hover:text-emphasis text-sm underline underline-offset-2">
                        {doc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
