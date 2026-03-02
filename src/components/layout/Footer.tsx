"use client";

import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  Facebook, Youtube, Instagram, Linkedin,
  ChevronDown, MapPin, Phone, Mail,
} from "lucide-react";

// ─── Static import from src/data/projects.json ───────────────────────────────
// No fetch, no useEffect, no loading state — data is bundled at build time.
// When you update src/data/projects.json, the footer auto-reflects on next build.
import projectsData from "@/data/projects.json";

// ─── Types — mirror the shape of projects.json ───────────────────────────────
type RawProject = {
  name: string;
  slug?: string;
  status?: string;
  location?: string;
  image?: string;
  externalLink?: string;
};

type RawRegions   = Record<string, RawProject[]>;
type RawCountries = Record<string, RawRegions>;

type FooterLink = {
  label: string;
  href: string;
  live: boolean;
  external: boolean;
};

type FooterSection = {
  title: string;   // "Telangana, India"
  country: string; // "India" | "Dubai"
  links: FooterLink[];
};

// ─── Normalise projects.json → FooterSection[] ───────────────────────────────
function buildSections(raw: RawCountries): FooterSection[] {
  const sections: FooterSection[] = [];

  Object.entries(raw).forEach(([country, regions]) => {
    Object.entries(regions).forEach(([region, projects]) => {
      sections.push({
        title: `${region}, ${country}`,
        country,
        links: projects.map((p) => {
          const isExternal = Boolean(p.externalLink);
          return {
            label: p.name,
            href: isExternal ? p.externalLink! : `/projects/${p.slug ?? ""}`,
            live: p.status === "Ongoing",
            external: isExternal,
          };
        }),
      });
    });
  });

  return sections;
}

// Build once at module level — zero runtime cost
const ALL_SECTIONS = buildSections(projectsData as RawCountries);

const INDIA_SECTIONS = ALL_SECTIONS.filter((s) => s.country === "India");
const OTHER_SECTIONS = ALL_SECTIONS.filter((s) => s.country !== "India");

const INDIA_HALF   = Math.ceil(INDIA_SECTIONS.length / 2);
const COL1_SECTIONS = INDIA_SECTIONS.slice(0, INDIA_HALF);
const COL2_SECTIONS = [...INDIA_SECTIONS.slice(INDIA_HALF), ...OTHER_SECTIONS];

const ONGOING_COUNT = ALL_SECTIONS.reduce(
  (acc, s) => acc + s.links.filter((l) => l.live).length, 0
);

// ─── Static Quick Links ───────────────────────────────────────────────────────
const QUICK_LINKS = [
  { label: "About Us",           href: "/about" },
  { label: "All Projects",       href: "/projects" },
  { label: "Ongoing Projects",   href: "/projects?filter=ongoing" },
  { label: "Completed Projects", href: "/projects?filter=completed" },
  { label: "Contact Us",         href: "/contact" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function LiveBadge() {
  return (
    <span
      className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase flex-shrink-0"
      style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", letterSpacing: "0.08em" }}
    >
      Live
    </span>
  );
}

function SectionHeading({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="h-5 w-1 rounded-full" style={{ background: "#F5A623" }} />
      <p className="text-xs font-bold uppercase" style={{ color: "#1A2D6B", letterSpacing: "0.18em" }}>
        {text}
      </p>
    </div>
  );
}

function AccordionItem({
  title, links, isOpen, onToggle,
}: {
  title: string;
  links: FooterLink[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: "1px solid #E8EDF5" }}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3.5 text-left"
      >
        <span
          className="font-semibold text-sm"
          style={{ color: isOpen ? "#F5A623" : "#1A2D6B", transition: "color 0.2s" }}
        >
          {title}
        </span>
        <ChevronDown
          className="h-4 w-4 flex-shrink-0 ml-3"
          style={{
            color: "#F5A623",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </button>

      {/* Links */}
      <div
        style={{
          maxHeight: isOpen ? `${links.length * 36}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="pb-2">
          {links.map(({ label, href, live, external }) =>
            external ? (
              <a
                key={label + href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-1.5 text-sm"
                style={{ color: "#6B7A9F", transition: "color 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F5A623")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6B7A9F")}
              >
                <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: "#F5A623" }} />
                <span className="truncate">{label}</span>
                <span className="ml-auto text-[10px] opacity-40 flex-shrink-0">↗</span>
                {live && <LiveBadge />}
              </a>
            ) : (
              <Link
                key={label + href}
                href={href}
                className="flex items-center gap-2 py-1.5 text-sm"
                style={{ color: "#6B7A9F", transition: "color 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F5A623")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6B7A9F")}
              >
                <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: "#F5A623" }} />
                <span className="truncate">{label}</span>
                {live && <LiveBadge />}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const [mounted,      setMounted]      = React.useState(false);
  const [email,        setEmail]        = React.useState("");
  const [openSection,  setOpenSection]  = React.useState<number | null>(null);

  React.useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <footer className="h-24 bg-white" />;

  // Reset global index each render
  let gIdx = 0;

  const toggle = (idx: number) =>
    setOpenSection((prev) => (prev === idx ? null : idx));

  return (
    <footer style={{ background: "#FFFFFF", fontFamily: "'Outfit', sans-serif", color: "#1A2D6B" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        .th-sub:hover   { background: #D4891A !important; }
        .th-inp::placeholder { color: #A0AABF; }
        .th-inp:focus   { outline: none; border-color: #F5A623 !important; box-shadow: 0 0 0 3px rgba(245,166,35,0.15); }
        .th-social:hover { background: #1A2D6B !important; color: #fff !important; border-color: #1A2D6B !important; }
        .th-qlink:hover  { color: #F5A623 !important; }
        .th-qlink:hover .th-arrow { transform: translateX(3px); }
      `}</style>

      {/* ── Navy announcement strip ── */}
      <div style={{ background: "#1A2D6B" }}>
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
            🏠 Building Premium Communities Across India &amp; Dubai Since 2014
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase" style={{ color: "#F5A623", letterSpacing: "0.12em" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            {ONGOING_COUNT} Ongoing Projects
          </div>
        </div>
      </div>

      {/* ── Top bar: Socials | Logo | Subscribe ── */}
      <div style={{ borderBottom: "2px solid #F0F3FA", background: "#FAFBFF" }}>
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center gap-5">

          {/* LEFT: Socials */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {([
              { Icon: Facebook,  color: "#1877F2", href: "https://www.facebook.com/THomesInfra.official" },
              { Icon: Youtube,   color: "#FF0000", href: "https://www.youtube.com/@THOMESINFRAPRIVATELIMITED" },
              { Icon: Instagram, color: "#E1306C", href: "https://www.instagram.com/thomes_infra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" },
              { Icon: Linkedin,  color: "#0A66C2", href: "https://in.linkedin.com/company/t-homes-infra" },
            ] as const).map(({ Icon, color, href }, i) => (
              <a
                key={i}
                href={href}
                className="th-social h-9 w-9 flex items-center justify-center rounded-full transition-all"
                style={{ background: "#F0F3FA", border: "1.5px solid #E4E9F4", color }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* CENTER: Logo */}
          <div className="flex flex-1 justify-center">
            <div className="relative h-14 w-52">
              <NextImage
                src="https://thomesinfra.com/wp-content/uploads/2026/02/T-Homes-Logo-1.png"
                alt="THomes Infra"
                fill
                className="object-contain"
                sizes="208px"
              />
            </div>
          </div>

          {/* RIGHT: Subscribe */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <div
              className="flex shadow-sm"
              style={{ borderRadius: "8px", overflow: "hidden", border: "1.5px solid #E4E9F4" }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="th-inp flex-1 px-4 h-11 text-sm"
                style={{ background: "#fff", border: "none", color: "#1A2D6B", minWidth: 0 }}
              />
              <button
                className="th-sub h-11 px-6 text-sm font-bold uppercase flex-shrink-0 transition-colors"
                style={{ background: "#F5A623", color: "#fff", letterSpacing: "0.08em", border: "none" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main 4-column body ── */}
      <div style={{ background: "#FFFFFF", borderBottom: "2px solid #F0F3FA" }}>
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">

            {/* Col 1 — India projects (first half) */}
            <div>
              <SectionHeading text="Projects — India" />
              {COL1_SECTIONS.map((section) => {
                const idx = gIdx++;
                return (
                  <AccordionItem
                    key={section.title}
                    title={section.title}
                    links={section.links}
                    isOpen={openSection === idx}
                    onToggle={() => toggle(idx)}
                  />
                );
              })}
            </div>

            {/* Col 2 — India (second half) + Dubai */}
            <div>
              <SectionHeading text="Projects — India & Dubai" />
              {COL2_SECTIONS.map((section) => {
                const idx = gIdx++;
                return (
                  <AccordionItem
                    key={section.title}
                    title={section.title}
                    links={section.links}
                    isOpen={openSection === idx}
                    onToggle={() => toggle(idx)}
                  />
                );
              })}
            </div>

            {/* Col 3 — Quick Links (flat) */}
            <div>
              <SectionHeading text="Quick Links" />
              <ul>
                {QUICK_LINKS.map(({ label, href }) => (
                  <li key={label} style={{ borderBottom: "1px solid #F0F3FA" }}>
                    <Link
                      href={href}
                      className="th-qlink flex items-center gap-2.5 py-3 text-sm transition-all"
                      style={{ color: "#6B7A9F" }}
                    >
                      <span
                        className="th-arrow text-base leading-none transition-transform"
                        style={{ color: "#F5A623" }}
                      >
                        ›
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — About + Contact */}
            <div className="space-y-7">
              <div>
                <SectionHeading text="About Us" />
                <p className="text-sm leading-relaxed" style={{ color: "#6B7A9F" }}>
                  THomes Infra Pvt. Ltd. — Hyderabad's trusted real estate developer since 2014.
                  Building iconic communities across India and Dubai with trust and transparency.
                </p>
              </div>

              <div>
                <SectionHeading text="Contact" />
                <div className="space-y-3">
                  {[
                    {
                      Icon: MapPin,
                      text: "Flat No: 8-2-120/77/4B, 3rd Floor, NVR Towers, Road No. 2, Banjara Hills, Hyderabad – 500034",
                    },
                    { Icon: Phone, text: "+919032939753" },
                    { Icon: Mail,  text: "info@thomesinfra.com" },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-start gap-3 text-sm" style={{ color: "#6B7A9F" }}>
                      <div
                        className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "#F0F3FA" }}
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color: "#1A2D6B" }} />
                      </div>
                      <span className="leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ background: "#1A2D6B" }}>
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
              THomes Infra Pvt. Ltd.
            </span>{" "}
            All Rights Reserved.
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-5 text-xs"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {["Privacy Policy", "Asset Usage Policy", "Terms & Conditions", "Cookie Policy"].map(
              (item, i, arr) => (
                <React.Fragment key={item}>
                  <a
                    href="#"
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#F5A623")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")
                    }
                  >
                    {item}
                  </a>
                  {i < arr.length - 1 && (
                    <span style={{ color: "rgba(255,255,255,0.15)" }}>•</span>
                  )}
                </React.Fragment>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}