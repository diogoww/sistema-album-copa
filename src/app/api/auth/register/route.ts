import { NextResponse } from "next/server";
import { hash } from "argon2";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/security";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(`register:${ip}`);
  if (!limit.ok) {
    return NextResponse.json({ error: "Muitas tentativas" }, { status: 429 });
  }

  const payload = await req.json();
  const parsed = registerSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados invalidos" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const name = sanitizeText(parsed.data.name);
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email ja cadastrado" }, { status: 409 });
  }

  const passwordHash = await hash(parsed.data.password);
  const user = await prisma.user.create({
    data: { name, email, passwordHash }
  });

  return NextResponse.json({ id: user.id, email: user.email });
}
