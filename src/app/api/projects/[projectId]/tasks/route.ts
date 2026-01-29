import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Task from "@/server/models/Task";

type Params = {
  params: Promise<{ projectId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  await connectToDatabase();
  const { projectId } = await params;
  const tasks = await Task.find({ projectId }).lean();
  return NextResponse.json(tasks);
}

