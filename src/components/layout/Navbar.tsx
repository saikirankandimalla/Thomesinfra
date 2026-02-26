"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import rawProjectsData from "@/data/projects.json";

type Project = {
  name: string;
  slug?: string;
  status?: string;
  externalLink?: string;
  location?: string;
  image?: string;
};

type ProjectsData = {
  [country: string]: {
    [state: string]: Project[];
  };
};

const projectsData = rawProjectsData as ProjectsData;

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "India", hasDropdown: true },
  { name: "Dubai", hasDropdown: true },
  { name: "Jumeirah Towers", href: "/jumeirah-towers" },
  { name: "Contact", href: "/contact" },
];

function getProjectsByCountry(country: string): Project[] {
  const data = projectsData[country];
  if (!data) return [];
  return Object.values(data).flat();
}

function StatusBadge({ status, external }: { status?: string; external?: boolean }) {
  if (external)
    return (
      <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
        ↗ Visit
      </span>
    );
  if (status === "Ongoing")
    return (
      <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        Ongoing
      </span>
    );
  if (status === "Completed")
    return (
      <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
        Completed
      </span>
    );
  return null;
}

function ProjectCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const isExternal = !!p.externalLink && !p.status;

  const inner = (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-amber-50 group transition-colors cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-gray-100">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-gray-800 group-hover:text-amber-700 truncate leading-snug">
          {p.name}
        </div>
        {p.location && (
          <div className="text-xs text-gray-400 mt-0.5 truncate">{p.location}</div>
        )}
      </div>

      {/* Badge */}
      <StatusBadge status={p.status} external={isExternal} />
    </div>
  );

  if (p.externalLink) {
    return (
      <a href={p.externalLink} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={`/projects/${p.slug}`} onClick={onClick}>
      {inner}
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-1 mb-1.5 mt-3 first:mt-0">
      <span className="font-bold text-[10px] uppercase tracking-widest text-gray-400">{children}</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const [searchDesktop, setSearchDesktop] = React.useState("");
  const [searchMobile, setSearchMobile] = React.useState("");

  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 80);
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* MAIN BAR */}
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link href="/">
            <div className="relative w-[180px] h-[60px]">
              <Image
                src="https://thomesinfra.com/wp-content/uploads/2026/02/T-Homes-Logo-1.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => {
              if (!link.hasDropdown)
                return (
                  <Link
                    key={link.name}
                    href={link.href!}
                    className="font-semibold text-gray-700 hover:text-amber-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                );

              const projects = getProjectsByCountry(link.name);
              const filtered = projects.filter((p) =>
                p.name.toLowerCase().includes(searchDesktop.toLowerCase())
              );
              const ongoing = filtered.filter((p) => p.status === "Ongoing");
              const completed = filtered.filter((p) => p.status === "Completed");
              const external = filtered.filter((p) => p.externalLink && !p.status);

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 font-semibold text-gray-700 hover:text-amber-600 py-2 transition-colors">
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${activeDropdown === link.name ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 pt-2 w-[500px]"
                        style={{ top: "100%" }}
                      >
                        <div className="bg-white shadow-2xl border border-gray-100 rounded-2xl overflow-hidden">

                          {/* SEARCH — sticky at top */}
                          <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                            <input
                              value={searchDesktop}
                              onChange={(e) => setSearchDesktop(e.target.value)}
                              placeholder="Search projects or locations..."
                              className="border border-gray-200 bg-gray-50 px-4 py-2.5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                            />
                          </div>

                          {/* SCROLLABLE LIST */}
                          <div className="max-h-[420px] overflow-y-auto px-3 py-3 space-y-0.5 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">

                            {ongoing.length > 0 && (
                              <>
                                <SectionLabel>Ongoing Projects</SectionLabel>
                                {ongoing.map((p) => (
                                  <ProjectCard key={p.name} p={p} onClick={() => setActiveDropdown(null)} />
                                ))}
                              </>
                            )}

                            {completed.length > 0 && (
                              <>
                                <SectionLabel>Completed Projects</SectionLabel>
                                {completed.map((p) => (
                                  <ProjectCard key={p.name} p={p} onClick={() => setActiveDropdown(null)} />
                                ))}
                              </>
                            )}

                            {external.length > 0 && (
                              <>
                                <SectionLabel>Dubai Projects</SectionLabel>
                                {external.map((p) => (
                                  <ProjectCard key={p.name} p={p} onClick={() => setActiveDropdown(null)} />
                                ))}
                              </>
                            )}

                            {filtered.length === 0 && (
                              <p className="text-sm text-gray-400 text-center py-8">No projects found.</p>
                            )}
                          </div>

                          {/* FOOTER — sticky at bottom */}
                          <div className="px-4 py-3 border-t border-gray-100 flex justify-end bg-gray-50/60">
                            <Link
                              href="/projects"
                              onClick={() => setActiveDropdown(null)}
                              className="text-sm text-amber-600 font-semibold hover:underline"
                            >
                              View All Projects →
                            </Link>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* VIEW MAPS BUTTON */}
          <div className="hidden lg:block">
            <a
              href="https://earth.google.com/earth/d/1MS-DYbZVeEuiRP8LbFLcjeS-nd0V7S2c?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-full px-6">
                View Maps
              </Button>
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button className="lg:hidden p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link) => {

                  if (!link.hasDropdown)
                    return (
                      <Link
                        key={link.name}
                        href={link.href!}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-2 font-medium text-gray-700 border-b border-gray-100 hover:text-amber-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    );

                  const projects = getProjectsByCountry(link.name);
                  const filtered = projects.filter((p) =>
                    p.name.toLowerCase().includes(searchMobile.toLowerCase())
                  );
                  const ongoing = filtered.filter((p) => p.status === "Ongoing");
                  const completed = filtered.filter((p) => p.status === "Completed");
                  const external = filtered.filter((p) => p.externalLink && !p.status);
                  const expanded = mobileExpanded === link.name;

                  return (
                    <div key={link.name} className="border-b border-gray-100">
                      {/* Accordion Header */}
                      <button
                        onClick={() => setMobileExpanded(expanded ? null : link.name)}
                        className="flex justify-between items-center w-full py-3 px-2 font-semibold text-gray-800 hover:text-amber-600 transition-colors"
                      >
                        <span>{link.name}</span>
                        <motion.div
                          animate={{ rotate: expanded ? 45 : 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {expanded ? <Minus size={18} className="text-amber-500" /> : <Plus size={18} />}
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4">
                              {/* Search */}
                              <div className="px-2 mb-3">
                                <input
                                  value={searchMobile}
                                  onChange={(e) => setSearchMobile(e.target.value)}
                                  placeholder="Search projects..."
                                  className="border border-gray-200 bg-gray-50 px-3 py-2.5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                />
                              </div>

                              {/* Scrollable project list — fixed height on mobile */}
                              <div className="max-h-[55vh] overflow-y-auto px-2 space-y-0.5">

                                {ongoing.length > 0 && (
                                  <>
                                    <div className="flex items-center gap-2 py-2">
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Ongoing</span>
                                      <div className="flex-1 h-px bg-gray-100" />
                                    </div>
                                    {ongoing.map((p) => (
                                      <MobileProjectRow
                                        key={p.name}
                                        p={p}
                                        onClose={() => setIsOpen(false)}
                                      />
                                    ))}
                                  </>
                                )}

                                {completed.length > 0 && (
                                  <>
                                    <div className="flex items-center gap-2 py-2">
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Completed</span>
                                      <div className="flex-1 h-px bg-gray-100" />
                                    </div>
                                    {completed.map((p) => (
                                      <MobileProjectRow
                                        key={p.name}
                                        p={p}
                                        onClose={() => setIsOpen(false)}
                                      />
                                    ))}
                                  </>
                                )}

                                {external.length > 0 && (
                                  <>
                                    <div className="flex items-center gap-2 py-2">
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Dubai</span>
                                      <div className="flex-1 h-px bg-gray-100" />
                                    </div>
                                    {external.map((p) => (
                                      <MobileProjectRow
                                        key={p.name}
                                        p={p}
                                        onClose={() => setIsOpen(false)}
                                      />
                                    ))}
                                  </>
                                )}

                                {filtered.length === 0 && (
                                  <p className="text-sm text-gray-400 text-center py-6">No projects found.</p>
                                )}
                              </div>

                              {/* View All */}
                              <div className="px-2 pt-3 mt-2 border-t border-gray-100">
                                <Link
                                  href="/projects"
                                  onClick={() => setIsOpen(false)}
                                  className="block text-sm text-amber-600 font-semibold hover:underline"
                                >
                                  View All Projects →
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div className="pt-3">
                  <a
                    href="https://earth.google.com/earth/d/1MS-DYbZVeEuiRP8LbFLcjeS-nd0V7S2c?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black rounded-full">
                      View Maps
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}

/* ── Mobile project row (defined outside Navbar to avoid re-creation) ── */
function MobileProjectRow({ p, onClose }: { p: Project; onClose: () => void }) {
  const isExternal = !!p.externalLink && !p.status;

  const inner = (
    <div className="flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-amber-50 transition-colors group">
      {/* Thumbnail */}
      {p.image && (
        <div className="relative w-12 h-9 rounded-lg overflow-hidden shrink-0">
          <Image src={p.image} alt={p.name} fill className="object-cover" />
        </div>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-800 group-hover:text-amber-700 truncate leading-snug">
          {p.name}
        </div>
        {p.location && (
          <div className="text-xs text-gray-400 mt-0.5 truncate">{p.location}</div>
        )}
      </div>

      {/* Badge */}
      <StatusBadge status={p.status} external={isExternal} />
    </div>
  );

  if (p.externalLink)
    return (
      <a href={p.externalLink} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );

  return (
    <Link href={`/projects/${p.slug}`} onClick={onClose}>
      {inner}
    </Link>
  );
}