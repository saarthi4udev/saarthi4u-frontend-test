import ClientOpening from './ClientOpening';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Readonly<PageProps>) {
  const { slug } = await params;
  return <ClientOpening slug={slug} />;
}

