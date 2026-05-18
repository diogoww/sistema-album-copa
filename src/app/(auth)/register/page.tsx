import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Criar conta</h1>
            <p className="text-sm text-brand-ink/60">
              Comece a controlar seu album em minutos.
            </p>
          </div>
          <form className="space-y-4">
            <Input type="text" placeholder="Nome" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <Button className="w-full">Cadastrar</Button>
          </form>
          <p className="text-sm text-brand-ink/60">
            Ja tem conta? <Link href="/login">Entrar</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
