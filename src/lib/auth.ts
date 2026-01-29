import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const AUTH_SECRET = process.env.AUTH_SECRET;
const COOKIE_NAME = "orbitflow_session";

if (!AUTH_SECRET) {
  throw new Error("Missing AUTH_SECRET in environment variables.");
}

const key = new TextEncoder().encode(AUTH_SECRET);

export type SessionUser = {
  id: string;
  name: string;
  role: "admin" | "manager" | "member";
};

export async function createSessionToken(payload: SessionUser) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as SessionUser;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

