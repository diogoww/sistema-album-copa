import { Card, CardContent } from "@/components/ui/card";

export default function MissingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Faltantes</h1>
      <Card>
        <CardContent>
          <p className="text-sm text-brand-ink/60">
            Em breve: painel dedicado para suas figurinhas faltantes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
