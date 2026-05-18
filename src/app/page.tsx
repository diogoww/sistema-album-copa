import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <header className="flex flex-col gap-6">
          <Badge className="w-fit">Colecao completa da Copa</Badge>
          <h1 className="text-4xl font-bold text-brand-ink sm:text-5xl">
            Controle sua colecao com inteligencia, estilo e seguranca.
          </h1>
          <p className="max-w-2xl text-lg text-brand-ink/70">
            Marque figurinhas, acompanhe progresso, receba insights e importe dados
            oficiais direto do PDF com um fluxo seguro e moderno.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/register">Criar conta</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          </div>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Progresso em tempo real",
              text: "Dashboard com cards, graficos e estatisticas avancadas."
            },
            {
              title: "Importacao automatica",
              text: "Parser resiliente que normaliza o PDF oficial e gera seeds."
            },
            {
              title: "Colecao inteligente",
              text: "Filtros, buscas e controle de repetidas em segundos."
            }
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="space-y-2">
                <h3 className="text-lg font-semibold text-brand-ink">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-ink/70">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
