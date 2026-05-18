import { prisma } from "@/lib/db";
import { parseStickerPdf } from "@/lib/importer";
import { Prisma } from "@prisma/client";

async function main() {
  const sourceFile = process.env.PDF_IMPORT_SOURCE ?? "./tabelaControleFigurinhas.pdf";
  const rows = await parseStickerPdf(sourceFile);

  for (const row of rows) {
    await prisma.sticker.upsert({
      where: { code: row.code },
      update: {
        name: row.name,
        category: row.category,
        team: row.team,
        page: row.page,
        rarity: row.rarity,
        imageUrl: row.imageUrl,
        metadata: row.metadata ?? Prisma.JsonNull
      },
      create: {
        code: row.code,
        name: row.name,
        category: row.category,
        team: row.team,
        page: row.page,
        rarity: row.rarity,
        imageUrl: row.imageUrl,
        metadata: row.metadata ?? Prisma.JsonNull
      }
    });
  }

  await prisma.importLog.create({
    data: {
      sourceFile,
      status: "SUCCESS",
      total: rows.length,
      details: { imported: rows.length }
    }
  });

  console.log(`Seed concluida: ${rows.length} figurinhas`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
