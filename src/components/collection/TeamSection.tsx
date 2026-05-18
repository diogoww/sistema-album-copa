"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTeamName, getTeamFlag } from "@/lib/teams";
import type { StickerItem } from "./CollectionView";

type Props = {
  team: string;
  stickers: StickerItem[];
  ownedMap: Map<string, boolean>;
  onToggle: (id: string) => void;
};

export function TeamSection({ team, stickers, ownedMap, onToggle }: Props) {
  const [open, setOpen] = useState(true);

  const ownedCount = stickers.filter((s) => ownedMap.get(s.id)).length;
  const pct = Math.round((ownedCount / stickers.length) * 100);
  const teamName = getTeamName(team);
  const flag = getTeamFlag(team);

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-3 hover:bg-brand-ink/5 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl">{flag}</span>
          <span className="font-semibold truncate">{teamName}</span>
          <span className="text-xs text-brand-ink/40 whitespace-nowrap">
            {ownedCount}/{stickers.length}
          </span>
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-1.5 w-20 rounded-full bg-brand-ink/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-green transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-brand-ink/40">{pct}%</span>
          </div>
        </div>
        {open
          ? <ChevronUp className="h-4 w-4 text-brand-ink/30 shrink-0" />
          : <ChevronDown className="h-4 w-4 text-brand-ink/30 shrink-0" />
        }
      </button>

      {open && (
        <CardContent className="pt-0 pb-4">
          <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15">
            {stickers.map((s) => {
              const isOwned = ownedMap.get(s.id) ?? false;
              const num = s.code.replace(team, "");
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onToggle(s.id)}
                  title={s.name}
                  className={`
                    flex flex-col items-center justify-center rounded-lg border py-2 px-1
                    text-xs font-medium transition-all duration-150 select-none
                    ${isOwned
                      ? "border-brand-green bg-brand-green/15 text-brand-green shadow-sm"
                      : "border-brand-ink/10 bg-white/60 text-brand-ink/35 hover:border-brand-ink/25 hover:text-brand-ink/60"
                    }
                  `}
                >
                  <span className="text-sm font-bold leading-none">{num}</span>
                  {isOwned && (
                    <span className="text-[9px] mt-0.5 leading-none">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
