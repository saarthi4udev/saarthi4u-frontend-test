import ClientOpening from './ClientOpening';

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return <ClientOpening slug={slug} />;
}
