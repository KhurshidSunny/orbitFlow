import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Project from "@/server/models/Project";

type Params = {
  params: Promise<{ projectId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  await connectToDatabase();
  const { projectId } = await params;
  const project = await Project.findById(projectId).lean();
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

