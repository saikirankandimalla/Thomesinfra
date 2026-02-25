import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/lib/models/Project";


// GET all projects
export async function GET(request: Request) {

  try {

    await connectDB();

    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");

    if (slug) {

      const project = await Project.findOne({ slug });

      if (!project)
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );

      return NextResponse.json(project);

    }

    const filter: any = {};

    if (status) filter.status = status;

    if (featured === "true")
      filter.is_featured = true;

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 });

    return NextResponse.json(projects);

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }

}



// CREATE project
export async function POST(request: Request) {

  try {

    const body = await request.json();

    await connectDB();


    // auto slug
    if (!body.slug && body.name) {

      body.slug = body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

    }


    // ensure arrays exist

    body.gallery_images ||= [];
    body.amenities ||= [];
    body.proximity ||= [];
    body.Highlights ||= [];
    body.WhychooseUspoints ||= [];


    const project = await Project.create(body);


    return NextResponse.json(
      project,
      { status: 201 }
    );

  } catch (error: any) {

    if (error.code === 11000) {

      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );

    }

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }

}