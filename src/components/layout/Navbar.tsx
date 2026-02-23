"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Menu,
  X,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import rawProjectsData from "@/data/projects.json";

type Project = {
  name: string;
  slug: string;
  status?: string;
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

  const result: Project[] = [];

  Object.values(data).forEach((state) => {
    result.push(...state);
  });

  return result;
}

export function Navbar() {

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] =
    React.useState<string | null>(null);

  const [mobileExpanded, setMobileExpanded] =
    React.useState<string | null>(null);

  const [searchDesktop, setSearchDesktop] =
    React.useState("");

  const [searchMobile, setSearchMobile] =
    React.useState("");

  const wrapperRef = React.useRef<HTMLDivElement>(null);


  React.useEffect(() => {

    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);


  return (

<header className="fixed top-0 left-0 w-full bg-white shadow z-50">

<div
ref={wrapperRef}
className="max-w-7xl mx-auto px-4 sm:px-6"
>

{/* MAIN BAR */}
<div className="flex items-center justify-between h-20">

 <Link href="/"> 
 <div className="relative w-55 h-55">
   <Image src="https://thomesinfra.com/wp-content/uploads/2026/02/T-Homes-Logo-1.png" 
   alt="logo" fill className="object-contain" />
    </div>
     </Link>

{/* DESKTOP NAV */}
<nav className="hidden lg:flex items-center justify-center gap-8 flex-1">

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

const allProjects =
getProjectsByCountry(link.name);

const filtered = allProjects.filter((p) =>
p.name
.toLowerCase()
.includes(searchDesktop.toLowerCase())
);

const ongoing = filtered.filter(
(p) => p.status === "Ongoing"
);

const completed = filtered.filter(
(p) => p.status === "Completed"
);


return (

<div key={link.name} className="relative">

<button
onClick={() =>
setActiveDropdown(
activeDropdown === link.name
? null
: link.name
)
}
className="flex items-center gap-1 font-semibold text-gray-700 hover:text-amber-600"
>
{link.name}
<ChevronDown size={16} />
</button>


<AnimatePresence>
{activeDropdown === link.name && (

<motion.div
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0 }}
className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white shadow-xl border rounded-xl w-[420px] p-4"
>

{/* SEARCH */}
<div className="flex items-center gap-2 mb-3">

<input
value={searchDesktop}
onChange={(e) =>
setSearchDesktop(e.target.value)
}
placeholder="Search projects..."
className="border px-3 py-2 rounded-lg w-full text-sm focus:ring-amber-500 focus:ring-2"
/>

<Link
href="/projects"
className="text-xs underline text-amber-600 whitespace-nowrap"
>
View All
</Link>

</div>


{/* LIST */}
<div className="max-h-[350px] overflow-y-auto">

{ongoing.length > 0 && (
<>
<div className="font-bold text-sm mb-2">
Ongoing
</div>

{ongoing.map((project) => (

<Link
key={project.slug}
href={`/projects/${project.slug}`}
className="flex justify-between px-2 py-2 hover:bg-gray-100 rounded text-sm"
>
{project.name}

<span className="text-green-600 text-xs font-semibold">
Ongoing
</span>

</Link>

))}
</>
)}

{completed.length > 0 && (
<>
<div className="font-bold text-sm mt-4 mb-2">
Completed
</div>

{completed.map((project) => (

<Link
key={project.slug}
href={`/projects/${project.slug}`}
className="flex justify-between px-2 py-2 hover:bg-gray-100 rounded text-sm"
>
{project.name}

<span className="text-gray-500 text-xs font-semibold">
Completed
</span>

</Link>

))}
</>
)}

</div>

</motion.div>

)}
</AnimatePresence>

</div>

);

})}

</nav>


{/* RIGHT SIDE */}
<div className="hidden lg:flex items-center gap-4">

<Button className="bg-amber-500 text-black rounded-full px-6">
View Maps
</Button>

</div>


{/* MOBILE MENU BUTTON */}
<button
className="lg:hidden"
onClick={() => setIsOpen(!isOpen)}
>
{isOpen ? <X /> : <Menu />}
</button>

</div>


{/* MOBILE MENU */}
<AnimatePresence>

{isOpen && (

<motion.div
initial={{ height: 0 }}
animate={{ height: "auto" }}
exit={{ height: 0 }}
className="lg:hidden bg-white border-t"
>

<div className="p-4 space-y-3">


{navLinks.map((link) => {

if (!link.hasDropdown)
return (

<Link
key={link.name}
href={link.href!}
onClick={() => setIsOpen(false)}
className="block py-2 font-medium"
>
{link.name}
</Link>

);

const projects =
getProjectsByCountry(link.name);

const filtered = projects.filter((p) =>
p.name
.toLowerCase()
.includes(searchMobile.toLowerCase())
);

const ongoing = filtered.filter(
(p) => p.status === "Ongoing"
);

const completed = filtered.filter(
(p) => p.status === "Completed"
);

const expanded =
mobileExpanded === link.name;

return (

<div key={link.name}>

<button
onClick={() =>
setMobileExpanded(
expanded ? null : link.name
)
}
className="flex justify-between w-full py-2 font-semibold"
>
{link.name}

{expanded ? <Minus /> : <Plus />}

</button>


<AnimatePresence>

{expanded && (

<motion.div
initial={{ height: 0 }}
animate={{ height: "auto" }}
exit={{ height: 0 }}
className="pl-3"
>

<input
value={searchMobile}
onChange={(e) =>
setSearchMobile(e.target.value)
}
placeholder="Search projects..."
className="border px-3 py-2 rounded-lg w-full text-sm mb-2"
/>

<Link
href="/projects"
className="underline text-amber-600 text-sm"
>
View All Projects
</Link>


{ongoing.map((project) => (

<Link
key={project.slug}
href={`/projects/${project.slug}`}
className="flex justify-between py-1 text-sm"
>
{project.name}

<span className="text-green-600 text-xs">
Ongoing
</span>

</Link>

))}

{completed.map((project) => (

<Link
key={project.slug}
href={`/projects/${project.slug}`}
className="flex justify-between py-1 text-sm"
>
{project.name}

<span className="text-gray-500 text-xs">
Completed
</span>

</Link>

))}

</motion.div>

)}

</AnimatePresence>

</div>

);

})}


<Button className="w-full bg-amber-500 text-black rounded-full mt-3">
View Maps
</Button>


</div>

</motion.div>

)}

</AnimatePresence>

</div>

</header>

);

}