import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import User from "@/server/models/User";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  await connectToDatabase();
  const user = await User.findOne({ email }).lean();
  if (!user || !user.passwordHash) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = await createSessionToken({
    id: user._id.toString(),
    name: user.name,
    role: user.globalRole,
  });
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}

