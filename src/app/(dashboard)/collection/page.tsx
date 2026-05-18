import { Card, CardContent } from "@/components/ui/card";

export default function CollectionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Minha colecao</h1>
      <Card>
        <CardContent>
          <p className="text-sm text-brand-ink/60">
            Em breve: lista interativa de figurinhas com filtros, busca e
            atualizacao em tempo real.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
