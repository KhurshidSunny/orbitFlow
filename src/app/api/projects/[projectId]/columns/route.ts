import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Column from "@/server/models/Column";

type Params = {
  params: Promise<{ projectId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  await connectToDatabase();
  const { projectId } = await params;
  const columns = await Column.find({ projectId })
    .sort({ order: 1 })
    .lean();
  return NextResponse.json(columns);
}

