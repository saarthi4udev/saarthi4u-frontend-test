"use client";

import { colleges } from "@/app/api/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface CollegeDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CollegeDetailPage({
  params: { slug },
}: CollegeDetailPageProps) {
  const college = colleges.find((c) => c.slug === slug);

  if (!college) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-darkmode">
      {/* Header with Breadcrumb */}
      <div className="bg-heroBg dark:bg-midnight_text py-8">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
            <Icon icon="mdi:chevron-right" />
            <Link href="/#explore-colleges" className="text-primary hover:underline">
              Colleges
            </Link>
            <Icon icon="mdi:chevron-right" />
            <span className="text-midnight_text dark:text-white">{college.name}</span>
          </div>

          <div className="flex items-start gap-6">
            {/* Logo */}
            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <Image
                src={college.logo}
                alt={college.name}
                width={80}
                height={80}
                className="object-contain p-2"
              />
            </div>

            {/* College Info */}
            <div className="flex-1">
              <h1 className="text-40 font-bold text-midnight_text dark:text-white mb-2">
                {college.name}
              </h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Icon icon="mdi:map-marker" />
                  <span>{college.location}, {college.city}</span>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  {college.category}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  {college.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 py-12">
        {/* Placeholder for detailed content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  College Introduction
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {college.description}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                  Backend ready: This page will be populated with detailed college information
                  from your backend API including admission details, placements, infrastructure,
                  and more.
                </p>
              </section>

              {/* Coming Soon Sections */}
              <section>
                <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  Admissions
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <p className="text-blue-900 dark:text-blue-200">
                    Detailed admission information will be loaded here
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  Placements
                </h2>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <p className="text-green-900 dark:text-green-200">
                    Placement statistics and details will be loaded here
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-4">
                Quick Info
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rating</p>
                  <p className="text-2xl font-bold text-primary">
                    {college.rating.toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Based on {college.reviews} reviews
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type</p>
                  <p className="font-semibold text-midnight_text dark:text-white">
                    {college.type}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                  <p className="font-semibold text-midnight_text dark:text-white">
                    {college.category}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                  <p className="font-semibold text-midnight_text dark:text-white">
                    {college.location}, {college.city}
                  </p>
                </div>

                <button className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2">
                  <Icon icon="mdi:phone" />
                  Contact College
                </button>

                <button className="w-full bg-border dark:bg-gray-700 text-midnight_text dark:text-white py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
