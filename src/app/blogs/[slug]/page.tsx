"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: any;
};

const DEFAULT_IMAGE =
"https://thomestowers.com/wp-content/uploads/2026/02/Entrance-Gate-Area-Day-NEW-1.webp";

/* HELPERS */

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readingTime(text: string) {
  const words = stripHtml(text).split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
}

function getImage(post: WPPost) {
  return (
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    DEFAULT_IMAGE
  );
}

function getTags(post: WPPost) {
  return post?._embedded?.["wp:term"]?.[1] || [];
}

function getCategory(post: WPPost) {
  return post?._embedded?.["wp:term"]?.[0]?.[0]?.name || "Blog";
}

export default function BlogPostPage() {

  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<WPPost | null>(null);
  const [related, setRelated] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageSrc,setImageSrc] = useState(DEFAULT_IMAGE)

  useEffect(() => {
    if (!slug) return;

    async function loadPost() {
      try {

        const res = await fetch(
          `https://mediumpurple-sandpiper-111248.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
        );

        const data = await res.json();

        if (data.length) {

          setPost(data[0])
          setImageSrc(getImage(data[0]))

          const rel = await fetch(
            "https://mediumpurple-sandpiper-111248.hostingersite.com/wp-json/wp/v2/posts?_embed&per_page=4"
          );

          const relData = await rel.json();

          setRelated(
            relData.filter((p: WPPost) => p.slug !== slug).slice(0, 3)
          );

        }

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadPost();

  }, [slug]);

  if (loading)
    return (
      <div className="text-center py-24 text-lg">
        Loading article...
      </div>
    );

  if (!post)
    return (
      <div className="text-center py-24 text-lg">
        Article not found
      </div>
    );

  const tags = getTags(post);

  return (
    <main className="bg-[#fafaf8] min-h-screen">

      <Navbar />

      {/* HERO */}

      <div className="relative h-[55vh] w-full overflow-hidden">

        <Image
          src={imageSrc}
          alt={post.title.rendered}
          fill
          className="object-cover"
          onError={() => setImageSrc(DEFAULT_IMAGE)}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-10 left-6 right-6 max-w-4xl mx-auto text-white">

          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
            {getCategory(post)}
          </span>

          <h1
            className="text-3xl md:text-4xl font-bold mt-4"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="flex gap-4 text-sm mt-4 text-white/80">

            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={14} />
              {readingTime(post.content.rendered)}
            </span>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">

        <article className="lg:col-span-2">

          <div className="bg-white p-8 rounded-2xl shadow-sm">

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {tags.length > 0 && (

              <div className="mt-10 flex gap-2 flex-wrap">

                <Tag size={16} />

                {tags.map((tag:any)=>(
                  <span
                    key={tag.slug}
                    className="bg-gray-100 px-3 py-1 text-sm rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}

              </div>

            )}

          </div>

        </article>

        {/* SIDEBAR */}

        <aside>

          <Link
            href="/blogs"
            className="flex items-center gap-2 mb-6 text-sm text-gray-500"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>

          <h3 className="font-semibold mb-4">
            Related Articles
          </h3>

          <div className="space-y-4">

            {related.map((r)=>{

              const image =
                r?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                DEFAULT_IMAGE;

              return(

                <Link
                  key={r.id}
                  href={`/blogs/${r.slug}`}
                  className="flex gap-4 items-center group"
                >

                  <Image
                    src={image}
                    alt={r.title.rendered}
                    width={80}
                    height={60}
                    className="rounded-lg object-cover"
                    onError={(e:any)=>{
                      e.target.src = DEFAULT_IMAGE
                    }}
                  />

                  <p
                    className="text-sm group-hover:text-amber-500"
                    dangerouslySetInnerHTML={{__html:r.title.rendered}}
                  />

                </Link>

              )

            })}

          </div>

        </aside>

      </div>

      <Footer />

    </main>
  );
}