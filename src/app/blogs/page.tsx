"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

type Blog = {
  id:number
  slug:string
  date:string
  title:{rendered:string}
  excerpt:{rendered:string}
  content:{rendered:string}
  _embedded?:any
}

const FALLBACK_IMAGE =
"https://thomestowers.com/wp-content/uploads/2026/03/DJI_0238-scaled.jpg"

const HERO_IMAGE =
"https://thomestowers.com/wp-content/uploads/2026/03/DJI_0459-scaled.jpg"


function stripHtml(html:string){
  return html.replace(/<[^>]+>/g,"")
}

function formatDate(date:string){
  return new Date(date).toLocaleDateString("en-IN",{
    day:"numeric",
    month:"short",
    year:"numeric"
  })
}

function readingTime(text:string){
  const words = stripHtml(text).split(/\s+/).length
  return `${Math.ceil(words/200)} min read`
}

export default function BlogsPage(){

const [blogs,setBlogs] = useState<Blog[]>([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

fetch("https://mediumpurple-sandpiper-111248.hostingersite.com/wp-json/wp/v2/posts?_embed")
.then(res=>res.json())
.then(data=>{
setBlogs(data)
setLoading(false)
})
.catch(()=>setLoading(false))

},[])

const featured = blogs[0]
const sidebar = blogs.slice(1,5)
const recent = blogs.slice(5)

return(

<main className="bg-[#f7f7f7] min-h-screen">

<Navbar/>

{/* HERO SECTION */}

<section
className="relative h-[300px] flex items-center justify-center text-center text-white"
style={{
backgroundImage:`url(${HERO_IMAGE})`,
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="absolute inset-0 bg-black/50"/>

<div className="relative z-10">

<h1 className="text-4xl font-bold mb-3">
Blogs & Market Updates
</h1>

<p className="text-white/80 text-sm">
Latest insights, investment guides and real estate trends
</p>

</div>

</section>

<div className="max-w-7xl mx-auto px-6 py-16">

{/* HERO BLOG */}

<div className="grid lg:grid-cols-3 gap-10 mb-16">

{featured && (

<Link
href={`/blogs/${featured.slug}`}
className="lg:col-span-2 relative rounded-2xl overflow-hidden group"
>

<Image
src={
featured._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
FALLBACK_IMAGE
}
alt={featured.title.rendered}
width={900}
height={500}
onError={(e:any)=>{e.target.src=FALLBACK_IMAGE}}
className="object-cover w-full h-[350px] group-hover:scale-105 transition"
/>

<div className="absolute inset-0 bg-black/40"/>

<div className="absolute bottom-6 left-6 text-white">

<span className="text-xs bg-white/20 px-3 py-1 rounded-full">
Featured
</span>

<h2
className="text-2xl font-bold mt-3 max-w-lg"
dangerouslySetInnerHTML={{__html:featured.title.rendered}}
/>

</div>

</Link>

)}

{/* SIDEBAR BLOGS */}

<div className="space-y-6">

<h3 className="font-semibold text-lg">
Other featured posts
</h3>

{sidebar.map(post=>{

const image =
post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
FALLBACK_IMAGE

return(

<Link
key={post.id}
href={`/blogs/${post.slug}`}
className="flex gap-4 items-center group"
>

<Image
src={image}
alt={post.title.rendered}
width={80}
height={80}
onError={(e:any)=>{e.target.src=FALLBACK_IMAGE}}
className="rounded-lg object-cover"
/>

<p
className="text-sm font-medium group-hover:text-amber-500 transition"
dangerouslySetInnerHTML={{__html:post.title.rendered}}
/>

</Link>

)

})}

</div>

</div>

{/* RECENT POSTS */}

<div className="flex justify-between items-center mb-8">

<h2 className="text-2xl font-bold">
Recent Posts
</h2>

<Link
href="/blogs"
className="text-sm text-gray-500 hover:text-black"
>
All Posts
</Link>

</div>

{loading && (
<p className="text-center py-20">
Loading blogs...
</p>
)}

<div className="grid md:grid-cols-3 gap-10">

{recent.map(post=>{

const image =
post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
FALLBACK_IMAGE

return(

<Link
key={post.id}
href={`/blogs/${post.slug}`}
className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
>

<Image
src={image}
alt={post.title.rendered}
width={600}
height={350}
onError={(e:any)=>{e.target.src=FALLBACK_IMAGE}}
className="object-cover w-full h-[200px]"
/>

<div className="p-5">

<h3
className="font-bold mb-2"
dangerouslySetInnerHTML={{__html:post.title.rendered}}
/>

<p className="text-sm text-gray-500 mb-4">
{stripHtml(post.excerpt.rendered).slice(0,120)}...
</p>

<div className="flex justify-between text-xs text-gray-400">

<span className="flex items-center gap-1">
<Calendar size={12}/>
{formatDate(post.date)}
</span>

<span className="flex items-center gap-1">
<Clock size={12}/>
{readingTime(post.content.rendered)}
</span>

</div>

</div>

</Link>

)

})}

</div>

</div>

<Footer/>

</main>

)

}