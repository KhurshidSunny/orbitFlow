import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import User from "@/server/models/User";

export async function GET() {
  await connectToDatabase();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session || (session.role !== "admin" && session.role !== "manager")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { name, email, password, role } = await request.json();
  await connectToDatabase();
  const exists = await User.findOne({ email }).lean();
  if (exists) {
    return NextResponse.json({ error: "Email already used" }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash,
    globalRole: role ?? "member",
  });
  return NextResponse.json({ id: user._id.toString() });
}

