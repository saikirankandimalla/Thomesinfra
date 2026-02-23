import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProjectMap from "@/lib/models/ProjectMap";

/**
 * GET – Fetch latest project map data
 */
export async function GET() {
  try {
    await connectDB();

    const project = await ProjectMap
      .findOne()
      .sort({ updatedAt: -1 });

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET project-map error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project map data" },
      { status: 500 }
    );
  }
}

/**
 * POST – Save / update project map data
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Keep only one active project (optional logic)
    await ProjectMap.deleteMany({});

    const saved = await ProjectMap.create(body);

    return NextResponse.json(saved);
  } catch (error) {
    console.error("POST project-map error:", error);
    return NextResponse.json(
      { error: "Failed to save project map data" },
      { status: 500 }
    );
  }
}
