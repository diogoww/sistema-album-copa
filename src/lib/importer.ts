import fs from "fs";
import pdf from "pdf-parse";

export type ParsedSticker = {
  code: string;
  name: string;
  category: string;
  team: string;
  page?: number;
  rarity?: string;
  imageUrl?: string;
  metadata?: Record<string, unknown>;
};

const codeRegex = /\b([A-Z]{1,3}\d{1,4})\b/;

export async function parseStickerPdf(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  const lines = data.text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const results: ParsedSticker[] = [];

  for (const line of lines) {
    const codeMatch = line.match(codeRegex);
    if (!codeMatch) continue;

    const code = codeMatch[1];
    const rest = line.replace(code, "").trim();

    const parts = rest.split(" - ");
    const name = parts[0]?.trim() ?? code;
    const category = parts[1]?.trim() ?? "Geral";
    const team = parts[2]?.trim() ?? "Selecao";
    const pageMatch = line.match(/pag\.?\s*(\d+)/i);
    const page = pageMatch ? Number(pageMatch[1]) : undefined;

    results.push({
      code,
      name,
      category,
      team,
      page,
      metadata: { source: "pdf" }
    });
  }

  return results;
}
