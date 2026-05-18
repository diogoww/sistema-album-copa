import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseStickerPdf } from "@/lib/importer";

export async function POST() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 403 });
  }

  const sourceFile = process.env.PDF_IMPORT_SOURCE ?? "./tabelaControleFigurinhas.pdf";
  const rows = await parseStickerPdf(sourceFile);

  const upserts = rows.map((row) =>
    prisma.sticker.upsert({
      where: { code: row.code },
      update: {
        name: row.name,
        category: row.category,
        team: row.team,
        page: row.page,
        rarity: row.rarity,
        imageUrl: row.imageUrl,
        metadata: row.metadata
      },
      create: {
        code: row.code,
        name: row.name,
        category: row.category,
        team: row.team,
        page: row.page,
        rarity: row.rarity,
        imageUrl: row.imageUrl,
        metadata: row.metadata
      }
    })
  );

  await prisma.$transaction(upserts);
  await prisma.importLog.create({
    data: {
      sourceFile,
      status: "SUCCESS",
      total: rows.length,
      details: { imported: rows.length }
    }
  });

  return NextResponse.json({ imported: rows.length });
}
