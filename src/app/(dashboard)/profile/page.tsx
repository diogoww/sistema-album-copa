import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <Card>
        <CardContent>
          <p className="text-sm text-brand-ink/60">
            Em breve: informacoes pessoais e seguranca.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
