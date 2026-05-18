import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Administracao</h1>
      <Card>
        <CardContent className="space-y-4">
          <p className="text-sm text-brand-ink/60">
            Importacao automatica do PDF e logs de processamento.
          </p>
          <Button>Importar PDF agora</Button>
        </CardContent>
      </Card>
    </div>
  );
}
