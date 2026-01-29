import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Task from "@/server/models/Task";

export async function GET() {
  await connectToDatabase();
  const tasks = await Task.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(tasks);
}

