import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(`password-reset:${ip}`);
  if (!limit.ok) {
    return NextResponse.json({ error: "Muitas tentativas" }, { status: 429 });
  }

  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email obrigatorio" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt }
  });

  return NextResponse.json({ ok: true, token });
}
