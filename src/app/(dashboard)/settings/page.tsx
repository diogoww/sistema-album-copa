import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Configuracoes</h1>
      <Card>
        <CardContent>
          <p className="text-sm text-brand-ink/60">
            Em breve: preferencias, tema e notificacoes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
