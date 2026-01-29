import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Task from "@/server/models/Task";

type Params = {
  params: { projectId: string };
};

export async function GET(_: Request, { params }: Params) {
  await connectToDatabase();
  const tasks = await Task.find({ projectId: params.projectId }).lean();
  return NextResponse.json(tasks);
}

