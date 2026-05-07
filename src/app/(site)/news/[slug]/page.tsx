import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getSingleNews(slug: string) {
  const res = await fetch(`${BASE_URL}/news/new/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();

  return data?.data;
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await getSingleNews(slug);

  return {
    title: news?.metaTitle || `${news?.title} | Latest Education News Saarthi4u`,
    description: news?.metaDescription || news?.summary || "Stay updated with the latest education and admission news from Saarthi4u.",
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

  const news = await getSingleNews(slug);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-4">
          {news.title}
        </h1>

        {/* META */}
        <div className="text-sm text-gray-500 mb-6">
          {new Date(news.publishedAt).toDateString()}
        </div>

        {/* IMAGE */}
        {news.featuredImage && (
          <img
            src={news.featuredImage}
            alt={news.title}
            className="rounded-xl mb-6"
          />
        )}

        {/* CONTENT */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        {/* SOURCE */}
        {news.source && (
          <div className="mt-6 text-sm text-gray-500">
            Source: {news.source}
          </div>
        )}
      </div>
    </section>
  );
}