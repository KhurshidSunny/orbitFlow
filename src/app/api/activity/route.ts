import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ActivityLog from "@/server/models/ActivityLog";

export async function GET() {
  await connectToDatabase();
  const activity = await ActivityLog.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(activity);
}

