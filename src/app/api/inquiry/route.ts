import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";

// GET all inquiries (optionally filter by status)
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const filter: any = {};
    if (status) filter.status = status;

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(inquiries);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch inquiries", details: error.message },
      { status: 500 }
    );
  }
}

// POST — keep your existing handler exactly as-is
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, project, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const inquiry = await Inquiry.create({
      name,
      email: email || "no-email@provided.com",
      phone,
      project,
      message,
    });

    return NextResponse.json(
      { message: "Inquiry submitted successfully", inquiry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry", details: error.message },
      { status: 500 }
    );
  }
}