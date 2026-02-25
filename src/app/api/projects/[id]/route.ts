import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/lib/models/Project";


// GET project by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    await connectDB();

    const project = await Project.findById(params.id);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }
}


// UPDATE project
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    const body = await request.json();

    await connectDB();

    const project = await Project.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {

      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );

    }

    return NextResponse.json(project);

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }
}


// DELETE project
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    await connectDB();

    const deleted = await Project.findByIdAndDelete(params.id);

    if (!deleted) {

      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );

    }

    return NextResponse.json({
      success: true,
      message: "Project deleted",
    });

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }
}