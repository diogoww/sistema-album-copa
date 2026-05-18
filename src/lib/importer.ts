import fs from "fs";
import pdf from "pdf-parse";
import type { Prisma } from "@prisma/client";

export type ParsedSticker = {
  code: string;
  name: string;
  category: string;
  team: string;
  page?: number;
  rarity?: string;
  imageUrl?: string;
  metadata?: Prisma.InputJsonValue;
};

const codeRegex = /([A-Z]{2,3})(\d{1,2})/g;

export async function parseStickerPdf(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);

  const results: ParsedSticker[] = [];
  const seen = new Set<string>();

  for (const match of data.text.matchAll(codeRegex)) {
    const team = match[1];
    const num = parseInt(match[2], 10);
    const code = `${team}${num}`;

    if (seen.has(code)) continue;
    seen.add(code);

    results.push({
      code,
      name: `${team} ${num}`,
      category: team === "FWC" ? "Copa" : "Selecao",
      team,
      metadata: { source: "pdf" } as Prisma.InputJsonValue
    });
  }

  return results;
}
