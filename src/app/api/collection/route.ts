import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { collectionUpdateSchema } from "@/lib/validators";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  const data = await prisma.userSticker.findMany({
    where: { userId: session.user.id },
    include: { sticker: true }
  });

  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  const payload = await req.json();
  const parsed = collectionUpdateSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados invalidos" }, { status: 400 });
  }

  const item = await prisma.userSticker.upsert({
    where: {
      userId_stickerId: {
        userId: session.user.id,
        stickerId: parsed.data.stickerId
      }
    },
    update: {
      owned: parsed.data.owned,
      duplicates: parsed.data.duplicates
    },
    create: {
      userId: session.user.id,
      stickerId: parsed.data.stickerId,
      owned: parsed.data.owned,
      duplicates: parsed.data.duplicates
    }
  });

  return NextResponse.json({ data: item });
}
