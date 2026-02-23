import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Plot from "@/lib/models/Plot";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectDB();
    
    const plots = await Plot.find({ project_id: id }).sort({ plot_number: 1 });
    return NextResponse.json(plots);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();
    
    const plot = await Plot.create({
      ...body,
      project_id: id
    });
    
    return NextResponse.json(plot);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
