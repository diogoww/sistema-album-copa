import { Card, CardContent } from "@/components/ui/card";

export default function StickersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Todas as figurinhas</h1>
      <Card>
        <CardContent>
          <p className="text-sm text-brand-ink/60">
            Em breve: tabela completa com paginacao, filtros e imagens.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
