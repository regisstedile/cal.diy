import { getHelpCategory, getHelpDoc } from "@lib/ajuda/helpDocs";
import { _generateMetadata } from "app/_utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ categoria: string; slug: string }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { categoria, slug } = await params;
  const doc = await getHelpDoc(categoria, slug);
  return await _generateMetadata(
    () => (doc ? `${doc.title} — Ajuda` : "Ajuda"),
    () => "Central de ajuda ALLGED Agenda",
    undefined,
    undefined,
    `/ajuda/${categoria}/${slug}`
  );
};

const Page = async ({ params }: PageProps) => {
  const { categoria, slug } = await params;
  const category = getHelpCategory(categoria);
  const doc = await getHelpDoc(categoria, slug);

  if (!category || !doc) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-subtle text-sm">
        <Link href="/ajuda" className="hover:text-emphasis underline underline-offset-2">
          Ajuda
        </Link>
        <span className="mx-2">/</span>
        <span>{category.title}</span>
      </nav>

      <h1 className="text-emphasis mt-4 text-2xl font-semibold">{doc.title}</h1>

      <article
        className="text-default mt-6 text-sm leading-6 [&_a]:underline [&_a]:underline-offset-2 [&_code]:bg-subtle [&_code]:rounded [&_code]:px-1 [&_h1]:text-lg [&_h1]:font-semibold [&_h1]:mt-6 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-6 [&_h3]:font-semibold [&_h3]:mt-4 [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-3 [&_strong]:text-emphasis [&_ul]:list-disc [&_ul]:pl-5"
        // Safe: markdown-it runs with html:false, so raw HTML in the (repo
        // controlled, read-only mounted) content is escaped before this point.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: doc.html }}
      />
    </div>
  );
};

export default Page;
