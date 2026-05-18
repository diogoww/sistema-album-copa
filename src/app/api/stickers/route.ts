import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { UserSticker } from "@prisma/client";
import { stickerQuerySchema } from "@/lib/validators";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = stickerQuerySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Parametros invalidos" }, { status: 400 });
  }

  const session = await auth();
  const { q, team, category, status, take = 30, skip = 0 } = parsed.data;

  const where: Record<string, unknown> = {};
  if (q) {
    where.OR = [
      { code: { contains: q, mode: "insensitive" } },
      { name: { contains: q, mode: "insensitive" } }
    ];
  }
  if (team) where.team = team;
  if (category) where.category = category;

  const stickers = await prisma.sticker.findMany({
    where,
    orderBy: { code: "asc" },
    take,
    skip
  });

  if (!status || !session?.user?.id) {
    return NextResponse.json({ data: stickers });
  }

  const collection = await prisma.userSticker.findMany({
    where: { userId: session.user.id },
    select: { stickerId: true, owned: true, duplicates: true }
  });

  const map = new Map<string, Pick<UserSticker, "stickerId" | "owned" | "duplicates">>(
    collection.map((item) => [item.stickerId, item])
  );

  const filtered = stickers.filter((sticker) => {
    const item = map.get(sticker.id);
    if (status === "owned") return item?.owned;
    if (status === "missing") return !item?.owned;
    if (status === "duplicate") return (item?.duplicates ?? 0) > 0;
    return true;
  });

  return NextResponse.json({ data: filtered });
}
