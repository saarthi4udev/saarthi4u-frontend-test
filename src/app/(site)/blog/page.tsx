import React from "react";
import BlogList from "@/components/Blog/BlogList";
import { Metadata } from "next";
import { getAllPosts } from "@/utils/markdown";
import { BlogPost } from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog | Saarthi4u",
  description:
    "Explore education, career, exams, and scholarship insights with practical guidance from Saarthi4u experts.",
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
