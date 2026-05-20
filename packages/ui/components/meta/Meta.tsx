import Head from "next/head";

type MetaProps = {
  title: string;
  description?: string;
};

export function Meta({ title, description }: MetaProps) {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
}
