"use client";

import { useState, useMemo, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { TeamSection } from "./TeamSection";
import { getTeamName } from "@/lib/teams";

export type StickerItem = {
  id: string;
  code: string;
  name: string;
  team: string;
  owned: boolean;
  duplicates: number;
};

type Props = {
  stickers: StickerItem[];
};

export function CollectionView({ stickers }: Props) {
  const [ownedMap, setOwnedMap] = useState<Map<string, boolean>>(
    () => new Map(stickers.map((s) => [s.id, s.owned]))
  );
  const [search, setSearch] = useState("");
  const [, startTransition] = useTransition();

  const grouped = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = q
      ? stickers.filter(
          (s) =>
            s.code.toLowerCase().includes(q) ||
            getTeamName(s.team).toLowerCase().includes(q)
        )
      : stickers;

    const map = new Map<string, StickerItem[]>();
    for (const s of filtered) {
      if (!map.has(s.team)) map.set(s.team, []);
      map.get(s.team)!.push(s);
    }
    return map;
  }, [stickers, search]);

  const totalOwned = [...ownedMap.values()].filter(Boolean).length;

  function toggle(stickerId: string) {
    const next = !ownedMap.get(stickerId);
    setOwnedMap((prev) => new Map(prev).set(stickerId, next));

    startTransition(async () => {
      await fetch("/api/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stickerId, owned: next, duplicates: 0 })
      });
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Buscar por país ou código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-brand-green">{totalOwned}</span>
          <span className="text-brand-ink/50">/ {stickers.length} figurinhas</span>
          <div className="ml-2 h-2 w-32 rounded-full bg-brand-ink/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-green transition-all duration-300"
              style={{ width: `${(totalOwned / stickers.length) * 100}%` }}
            />
          </div>
          <span className="text-brand-ink/40">
            {Math.round((totalOwned / stickers.length) * 100)}%
          </span>
        </div>
      </div>

      {grouped.size === 0 ? (
        <p className="text-sm text-brand-ink/50 py-8 text-center">
          Nenhuma figurinha encontrada.
        </p>
      ) : (
        <div className="space-y-3">
          {[...grouped.entries()].map(([team, teamStickers]) => (
            <TeamSection
              key={team}
              team={team}
              stickers={teamStickers}
              ownedMap={ownedMap}
              onToggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
