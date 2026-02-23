import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";

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
