import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="flex items-center justify-between border-b bg-[var(--card)] px-6 py-4">
      <div className="text-lg font-semibold text-brand-ink">Album Copa</div>
      <div className="flex items-center gap-3">
        <Link className="text-sm text-brand-ink/70" href="/dashboard">
          Dashboard
        </Link>
        <Button variant="outline" size="sm">
          Sair
        </Button>
      </div>
    </header>
  );
}
