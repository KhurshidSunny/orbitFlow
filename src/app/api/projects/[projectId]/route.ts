import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Project from "@/server/models/Project";

type Params = {
  params: { projectId: string };
};

export async function GET(_: Request, { params }: Params) {
  await connectToDatabase();
  const project = await Project.findById(params.projectId).lean();
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

