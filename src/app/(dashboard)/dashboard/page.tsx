import { Card, CardContent } from "@/components/ui/card";

const cards = [
  { label: "Total de figurinhas", value: "670" },
  { label: "Obtidas", value: "120" },
  { label: "Faltantes", value: "550" },
  { label: "Repetidas", value: "8" },
  { label: "Concluido", value: "18%" }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="space-y-2">
              <p className="text-sm text-brand-ink/60">{card.label}</p>
              <p className="text-2xl font-semibold text-brand-ink">
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Graficos em breve</h2>
          <p className="text-sm text-brand-ink/60">
            Indicadores por selecao e categoria serao exibidos aqui.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
