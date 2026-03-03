"use client";

import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/* ─── Types ──────────────────────────────────────────────────── */
export type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    "wp:term"?: { name: string; slug: string }[][];
  };
};

/* ─── Helpers ─────────────────────────────────────────────────── */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
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
function getCategory(post: WPPost): string {
  return post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Real Estate";
}
function getExcerpt(post: WPPost, len = 140): string {
  return stripHtml(post.excerpt.rendered).slice(0, len) + "…";
}
/* ─── Featured Hero Card ──────────────────────────────────────── */
function HeroCard({ post }: { post: WPPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group relative w-full rounded-3xl overflow-hidden text-left block focus:outline-none"
      style={{ minHeight: 460 }}
    >
      <NextImage
        src={getImage(post)}
        alt={post.title.rendered}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <div className="absolute top-5 left-5 flex items-center gap-2">
        <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1">
          <Sparkles size={10} /> Featured
        </span>
        <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium px-3 py-1.5 rounded-full">
          {getCategory(post)}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h2
          className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-amber-300 transition-colors"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <p className="text-sm text-white/70 mb-4 hidden md:block line-clamp-2">
          {getExcerpt(post, 160)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{readingTime(post.content.rendered)}</span>
          </div>
          <span className="flex items-center gap-2 bg-amber-500 group-hover:bg-amber-400 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
            Read Article <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Side Card ───────────────────────────────────────────────── */
function SideCard({ post }: { post: WPPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex gap-4 bg-white rounded-2xl p-4 hover:shadow-md transition-all duration-300 text-left w-full border border-gray-100 hover:border-amber-200 block focus:outline-none"
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
        <NextImage src={getImage(post)} alt={post.title.rendered} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">{getCategory(post)}</span>
        <h3
          className="text-sm font-semibold text-gray-800 leading-snug mt-0.5 mb-1 group-hover:text-amber-600 transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div className="flex gap-3 text-[10px] text-gray-400">
          <span>{formatDate(post.date)}</span>
          <span>{readingTime(post.content.rendered)}</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Grid Card ───────────────────────────────────────────────── */
function GridCard({ post, index }: { post: WPPost; index: number }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left block focus:outline-none"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-44 overflow-hidden">
        <NextImage src={getImage(post)} alt={post.title.rendered} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 left-3">
          <span className="bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            {getCategory(post)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3
          className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-amber-600 transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{getExcerpt(post, 100)}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock size={10} />{readingTime(post.content.rendered)}</span>
          </div>
          <ArrowRight size={14} className="text-amber-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Skeletons ───────────────────────────────────────────────── */
function SkeletonHero() {
  return <div className="w-full rounded-3xl overflow-hidden bg-gray-200 animate-pulse" style={{ minHeight: 460 }} />;
}

/* ─── MAIN PAGE ───────────────────────────────────────────────── */
export default function blogsPage() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://thomesinfra.com/wp-json/wp/v2/posts?tags=40&per_page=10&_embed")
      .then((r) => r.json())
      .then((data: WPPost[]) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const [featured, second, ...rest] = posts;

  return (
    <main className="bg-[#fafaf8] min-h-screen">
       <Navbar />
      {/* ── Hero Header ──────────────────────────────────────── */}
      <div className="relative bg-[#0f1b2d] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-blue-400/10 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center gap-2 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/70 font-medium">blogs</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <BookOpen size={13} /> Real Estate Insights
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                blogs &amp; <span className="text-amber-400">Market</span> Updates
              </h1>
              <p className="text-white/50 mt-3 max-w-md text-sm">
                Expert insights, investment guides, and property trends — curated by THomes Infra.
              </p>
            </div>
            {!loading && (
              <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-bold text-amber-400">{posts.length}</div>
                <div className="text-xs text-white/50 mt-0.5">Articles</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-10">

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><SkeletonHero /></div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">No articles found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {featured && <HeroCard post={featured} />}
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Latest Articles</p>
              {[second, ...rest.slice(0, 3)].filter(Boolean).map((post) => (
                <SideCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {!loading && rest.length > 3 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-bold text-gray-900">More Articles</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.slice(3).map((post, i) => (
                <GridCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
       <Footer />
    </main>
  );
}