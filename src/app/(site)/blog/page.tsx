import React from "react";
import BlogList from "@/components/Blog/BlogList";
import { Metadata } from "next";
import { getAllPosts } from "@/utils/markdown";
import { BlogPost } from "@/types/blog";

export const metadata: Metadata = {
  title: "Career Guidance Blog | Tips for College Students & Career Planning",
  description: "Explore our blog for the best career options after 12th, tips for college students, and latest updates on entrance exams and certification courses.",
};

const Page = () => {
  const posts = getAllPosts([
    "title",
    "slug",
    "excerpt",
    "coverImage",
    "featuredImage",
    "date",
    "author",
    "authorImage",
    "category",
    "tags",
    "readingTime",
    "popularScore",
    "type",
  ]) as BlogPost[];

  return (
    <>
      <BlogList/>
    </>
  );
};

export default Page;
