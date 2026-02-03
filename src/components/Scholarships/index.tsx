"use client";

import Image from "next/image";
import Link from "next/link";

const scholarships = [
  {
    title: "Merit-Based Scholarships",
    description: "For outstanding academic performance",
    image: "/images/scholarships/merit.jpg",
    slug: "merit-based",
  },
  {
    title: "Need-Based Scholarships",
    description: "For students with financial constraints",
    image: "/images/scholarships/need.jpg",
    slug: "need-based",
  },
  {
    title: "Government Scholarships",
    description: "Central & State government schemes",
    image: "/images/scholarships/government.jpg",
    slug: "government",
  },
  {
    title: "International Scholarships",
    description: "Study abroad funding opportunities",
    image: "/images/scholarships/international.jpg",
    slug: "international",
  },
];

const ScholarshipsSection = () => {
  return (
    <section className="relative py-24 bg-white dark:bg-midnight_text">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <h2 className="text-40 md:text-52 font-semibold text-midnight_text dark:text-white">
            Explore <span className="text-primary">Scholarships</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted dark:text-white/80 text-18">
            Find scholarships that make quality education affordable and accessible.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {scholarships.map((item) => (
            <Link
              key={item.slug}
              href={'#'}
              className="
                group bg-white dark:bg-[#0f172a]
                rounded-3xl overflow-hidden
                shadow-md hover:shadow-xl transition-all
                border border-border dark:border-white/10
              "
            >
              {/* IMAGE */}
              <div className="relative h-44">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-18 font-semibold text-midnight_text dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted dark:text-white/70">
                  {item.description}
                </p>

                <div className="mt-4 text-primary text-sm font-medium">
                  View Details →
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ScholarshipsSection;
