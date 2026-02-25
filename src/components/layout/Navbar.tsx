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

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const [searchDesktop, setSearchDesktop] = React.useState("");
  const [searchMobile, setSearchMobile] = React.useState("");

  // Use a ref to track hover timeout so we can cancel it
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  // Small delay before closing so the mouse can travel from button → dropdown
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 80);
  };

  // close on ESC
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
                    className="font-semibold text-gray-700 hover:text-amber-600"
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
              const external = filtered.filter((p) => p.externalLink);

              return (
                /*
                 * KEY FIX: The entire wrapper (button + dropdown) shares
                 * onMouseEnter / onMouseLeave with a small close-delay.
                 * This means moving from the button into the panel never
                 * triggers a close, and moving out of the panel does close it.
                 */
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="flex items-center gap-1 font-semibold text-gray-700 hover:text-amber-600 py-2"
                  >
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
                        /*
                         * pt-2 creates an invisible hover bridge between
                         * the button bottom and the panel top — the mouse
                         * stays inside the wrapper div during this gap.
                         */
                        className="absolute left-1/2 -translate-x-1/2 pt-2 w-[660px]"
                        style={{ top: "100%" }}
                      >
                        <div className="bg-white shadow-2xl border border-gray-100 rounded-2xl p-5">

                          {/* SEARCH */}
                          <input
                            value={searchDesktop}
                            onChange={(e) => setSearchDesktop(e.target.value)}
                            placeholder="Search projects..."
                            className="border px-4 py-2 rounded-lg w-full mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />

                          <div className="max-h-[420px] overflow-y-auto space-y-4 pr-1">

                            {/* ONGOING */}
                            {ongoing.length > 0 && (
                              <div>
                                <div className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-2">
                                  Ongoing Projects
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                  {ongoing.map((p) => (
                                    <Link
                                      key={p.name}
                                      href={`/projects/${p.slug}`}
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-center justify-between px-3 py-2 hover:bg-amber-50 rounded-lg group"
                                    >
                                      <span className="text-sm text-gray-700 group-hover:text-amber-700">
                                        {p.name}
                                      </span>
                                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2 shrink-0">
                                        Ongoing
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* COMPLETED */}
                            {completed.length > 0 && (
                              <div>
                                <div className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-2">
                                  Completed Projects
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                  {completed.map((p) => (
                                    <Link
                                      key={p.name}
                                      href={`/projects/${p.slug}`}
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg group"
                                    >
                                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        {p.name}
                                      </span>
                                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full ml-2 shrink-0">
                                        Completed
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* DUBAI / EXTERNAL */}
                            {external.length > 0 && (
                              <div>
                                <div className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-2">
                                  Dubai Projects
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                  {external.map((p) => (
                                    <a
                                      key={p.name}
                                      href={p.externalLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between px-3 py-2 hover:bg-blue-50 rounded-lg group"
                                    >
                                      <span className="text-sm text-gray-700 group-hover:text-blue-700">
                                        {p.name}
                                      </span>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-2 shrink-0">
                                        ↗ Visit
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            {filtered.length === 0 && (
                              <p className="text-sm text-gray-400 text-center py-4">
                                No projects found.
                              </p>
                            )}

                          </div>

                          {/* FOOTER */}
                          <div className="mt-4 pt-3 border-t flex justify-end">
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
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link) => {

                  if (!link.hasDropdown)
                    return (
                      <Link
                        key={link.name}
                        href={link.href!}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 font-medium text-gray-700"
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
                  const external = filtered.filter((p) => p.externalLink);
                  const expanded = mobileExpanded === link.name;

                  return (
                    <div key={link.name} className="border-b pb-2">
                      <button
                        onClick={() => setMobileExpanded(expanded ? null : link.name)}
                        className="flex justify-between items-center w-full py-2 font-semibold text-gray-800"
                      >
                        {link.name}
                        {expanded ? <Minus size={18} /> : <Plus size={18} />}
                      </button>

                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-2 space-y-1"
                          >
                            <input
                              value={searchMobile}
                              onChange={(e) => setSearchMobile(e.target.value)}
                              placeholder="Search projects..."
                              className="border px-3 py-2 rounded-lg w-full text-sm mb-2 mt-1"
                            />

                            {ongoing.length > 0 && (
                              <div className="text-xs font-bold uppercase text-gray-400 mt-2 mb-1">Ongoing</div>
                            )}
                            {ongoing.map((p) => (
                              <Link
                                key={p.name}
                                href={`/projects/${p.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="flex justify-between py-1.5 text-sm text-gray-700 hover:text-amber-600"
                              >
                                <span>{p.name}</span>
                                <span className="text-green-600 text-xs">Ongoing</span>
                              </Link>
                            ))}

                            {completed.length > 0 && (
                              <div className="text-xs font-bold uppercase text-gray-400 mt-2 mb-1">Completed</div>
                            )}
                            {completed.map((p) => (
                              <Link
                                key={p.name}
                                href={`/projects/${p.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="flex justify-between py-1.5 text-sm text-gray-700"
                              >
                                <span>{p.name}</span>
                                <span className="text-gray-400 text-xs">Completed</span>
                              </Link>
                            ))}

                            {external.length > 0 && (
                              <div className="text-xs font-bold uppercase text-gray-400 mt-2 mb-1">Dubai</div>
                            )}
                            {external.map((p) => (
                              <a
                                key={p.name}
                                href={p.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-between py-1.5 text-sm text-gray-700 hover:text-blue-600"
                              >
                                <span>{p.name}</span>
                                <span className="text-blue-500 text-xs">↗ Visit</span>
                              </a>
                            ))}

                            <Link
                              href="/projects"
                              onClick={() => setIsOpen(false)}
                              className="block text-sm text-amber-600 font-semibold mt-2"
                            >
                              View All Projects →
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <a
                  href="https://earth.google.com/earth/d/1MS-DYbZVeEuiRP8LbFLcjeS-nd0V7S2c?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black rounded-full mt-3">
                    View Maps
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}