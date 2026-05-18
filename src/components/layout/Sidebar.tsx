import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/collection", label: "Minha colecao" },
  { href: "/stickers", label: "Todas as figurinhas" },
  { href: "/missing", label: "Faltantes" },
  { href: "/duplicates", label: "Repetidas" },
  { href: "/profile", label: "Perfil" },
  { href: "/settings", label: "Configuracoes" },
  { href: "/admin", label: "Administracao" }
];

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 border-r bg-[var(--card)] p-6 md:block">
      <div className="mb-6 text-xl font-semibold text-brand-ink">Album Copa</div>
      <nav className="space-y-3 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-brand-ink/70 hover:bg-brand-green/10"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
