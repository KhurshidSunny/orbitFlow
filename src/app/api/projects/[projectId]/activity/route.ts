import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ActivityLog from "@/server/models/ActivityLog";

type Params = {
  params: Promise<{ projectId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  await connectToDatabase();
  const { projectId } = await params;
  const activity = await ActivityLog.find({ projectId })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json(activity);
}

