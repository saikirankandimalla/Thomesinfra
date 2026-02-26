// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import Project from "@/lib/models/Project";

// export async function GET(
//   request: Request,
//   { params }: { params: { slug: string } }
// ) {

//   try {

//     await connectDB();

//     const project = await Project.findOne({
//       slug: params.slug,
//     });

//     if (!project) {

//       return NextResponse.json(
//         { error: "Project not found" },
//         { status: 404 }
//       );

//     }

//     return NextResponse.json(project);

//   } catch (error: any) {

//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );

//   }

// }
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/lib/models/Project";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    // Delete cached model to force schema reload (only needed during dev after schema changes)
    // Remove these 2 lines once gallery is confirmed working
    // delete mongoose.models.Project;

    const project = await Project.findOne({ slug: params.slug }).lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // ── SERVER-SIDE DEBUG — check these in your terminal/server logs ──────────
    console.log("[API slug] project name:", (project as any).name);
    console.log("[API slug] gallery_images raw:", JSON.stringify((project as any).gallery_images));
    console.log("[API slug] gallery_images type:", typeof (project as any).gallery_images);
    console.log("[API slug] gallery_images isArray:", Array.isArray((project as any).gallery_images));
    console.log("[API slug] gallery_images length:", (project as any).gallery_images?.length);
    // ─────────────────────────────────────────────────────────────────────────

    return NextResponse.json(project);

  } catch (error: any) {
    console.error("[API slug] error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}