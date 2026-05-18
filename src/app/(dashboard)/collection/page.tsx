import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CollectionView } from "@/components/collection/CollectionView";

export default async function CollectionPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [stickers, userCollection] = await Promise.all([
    prisma.sticker.findMany({
      orderBy: [{ team: "asc" }, { code: "asc" }]
    }),
    prisma.userSticker.findMany({
      where: { userId: session.user.id },
      select: { stickerId: true, owned: true, duplicates: true }
    })
  ]);

  const ownedMap = new Map(
    userCollection.map((uc) => [uc.stickerId, { owned: uc.owned, duplicates: uc.duplicates }])
  );

  const stickersWithStatus = stickers.map((s) => ({
    id: s.id,
    code: s.code,
    name: s.name,
    team: s.team,
    owned: ownedMap.get(s.id)?.owned ?? false,
    duplicates: ownedMap.get(s.id)?.duplicates ?? 0
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Minha coleção</h1>
        <p className="text-sm text-brand-ink/60 mt-1">
          Clique nas figurinhas para marcar as que você já tem.
        </p>
      </div>
      <CollectionView stickers={stickersWithStatus} />
    </div>
  );
}
