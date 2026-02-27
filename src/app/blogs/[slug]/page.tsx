"use client";

import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  Share2,
  BookOpen,
  Tag,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/* ─── Types ──────────────────────────────────────────────────── */
type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    "wp:term"?: { name: string; slug: string }[][];
  };
};

/* ─── Helpers ─────────────────────────────────────────────────── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

function readingTime(text: string) {
  const words = stripHtml(text).split(/\s+/).length;
  return `${Math.max(2, Math.ceil(words / 200))} min read`;
}

function getImage(post: WPPost): string {
  return (
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    "https://thomesinfra.com/wp-content/uploads/2023/11/DJI_0474.jpg"
  );
}

function getTags(post: WPPost): { name: string; slug: string }[] {
  return post._embedded?.["wp:term"]?.[1] ?? [];
}

function getCategory(post: WPPost): string {
  return post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Real Estate";
}

/* ─── Related Card ────────────────────────────────────────────── */
function RelatedCard({ post }: { post: WPPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block"
    >
      <div className="relative h-40 overflow-hidden">
        <NextImage
          src={getImage(post)}
          alt={post.title.rendered}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-4">
        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
          {getCategory(post)}
        </span>
        <h4
          className="text-sm font-bold text-gray-900 mt-1 line-clamp-2 group-hover:text-amber-600 transition-colors"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <p className="text-xs text-gray-400 mt-1">{formatDate(post.date)}</p>
      </div>
    </Link>
  );
}

/* ─── Skeleton ────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[50vh] bg-gray-200 rounded-none" />
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full mt-6" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────────── */
export default function blogsPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<WPPost | null>(null);
  const [related, setRelated] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(
      `https://thomesinfra.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
    )
      .then((r) => r.json())
      .then(async (data: WPPost[]) => {
        if (data.length > 0) {
          setPost(data[0]);
          // Fetch related posts (same tag 40)
          const rel = await fetch(
            "https://thomesinfra.com/wp-json/wp/v2/posts?tags=40&per_page=3&_embed"
          ).then((r) => r.json());
          setRelated(
            Array.isArray(rel)
              ? rel.filter((p: WPPost) => p.slug !== slug).slice(0, 3)
              : []
          );
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <Skeleton />;
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Article not found.</p>
        <Link href="/blogs" className="text-amber-500 font-semibold flex items-center gap-2">
          <ArrowLeft size={16} /> Back to blogs
        </Link>
      </div>
    );
  }

  const tags = getTags(post);

  return (
    <main className="bg-[#fafaf8] min-h-screen">
       <Navbar />
      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: "60vh", minHeight: 380 }}>
        <NextImage
          src={getImage(post)}
          alt={post.title.rendered}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <ArrowLeft size={14} /> Back to blogs
          </Link>
        </div>

        {/* Share button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <Share2 size={14} />
            {copied ? "Copied!" : "Share"}
          </button>
        </div>

        {/* Title area */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <Link href="/blogs" className="hover:text-white/80 transition-colors">blogs</Link>
            <ChevronRight size={11} />
            <span className="text-white/80 truncate max-w-[200px]"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>

          {/* Category + reading time */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1">
              <BookOpen size={10} /> {getCategory(post)}
            </span>
            <span className="text-white/60 text-xs flex items-center gap-1">
              <Clock size={11} /> {readingTime(post.content.rendered)}
            </span>
            <span className="text-white/60 text-xs flex items-center gap-1">
              <Calendar size={11} /> {formatDate(post.date)}
            </span>
          </div>

          <h1
            className="text-2xl md:text-4xl font-extrabold text-white leading-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Article content */}
        <article className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7 md:p-10">
            <div
              className="
                prose prose-base max-w-none
                prose-headings:font-extrabold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
                prose-h4:text-lg prose-h4:mt-4
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-800
                prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-600
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-600
                prose-li:mb-1
                prose-img:rounded-2xl prose-img:shadow-md
                prose-blockquote:border-l-4 prose-blockquote:border-amber-400
                prose-blockquote:bg-amber-50 prose-blockquote:px-5 prose-blockquote:py-3
                prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              "
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2 items-center">
                  <Tag size={14} className="text-gray-400" />
                  {tags.map((tag) => (
                    <span
                      key={tag.slug}
                      className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full hover:bg-amber-100 hover:text-amber-700 transition-colors cursor-default"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Author / brand strip */}
          <div className="mt-6 bg-[#0f1b2d] rounded-3xl p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <BookOpen size={22} className="text-amber-400" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">THomes Infra Pvt. Ltd.</p>
              <p className="text-white/50 text-xs mt-0.5">
                Trusted real estate developers in Hyderabad &amp; Telangana. DTCP &amp; HMDA approved plots.
              </p>
            </div>
            <Link
              href="/"
              className="ml-auto flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              View Projects
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">

          {/* Back to blogs */}
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft size={16} /> All Articles
          </Link>

          {/* Share card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Share Article</p>
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 bg-[#0f1b2d] hover:bg-[#1a2d47] text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
            >
              <Share2 size={15} />
              {copied ? "Link Copied!" : "Copy Link"}
            </button>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Related Articles</p>
              <div className="flex flex-col gap-4">
                {related.map((p) => (
                  <RelatedCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          )}

          {/* CTA card */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
            <p className="font-extrabold text-lg leading-tight mb-2">Interested in a Plot?</p>
            <p className="text-white/80 text-xs mb-4">
              Explore DTCP &amp; HMDA approved plots across Telangana. High ROI locations.
            </p>
            <Link
              href="/projects"
              className="block text-center bg-white text-amber-600 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-amber-50 transition-colors"
            >
              View All Projects →
            </Link>
          </div>
        </aside>
      </div>
       <Footer />
    </main>
  );
}