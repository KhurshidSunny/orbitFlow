import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Project from "@/server/models/Project";

export async function GET() {
  await connectToDatabase();
  const projects = await Project.find({ isArchived: false })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json(projects);
}

