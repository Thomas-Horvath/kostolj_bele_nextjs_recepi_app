import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);


  // console.log(session)
  if (!session) {
    // redirect helyett throw redirect a next/navigation-ból
    // de mivel ez server component, importáld:
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }

  // A bejelentkezett user ID-je
  const userId = session.user.id;

console.log(userId, session)

  // console.log(data)
  // 1. Saját receptek
  const sajatReceptek = await prisma.recipe.findMany({
    where: { authorId: userId },
    include: {
      ingredients: true,
      steps: true
    }
  });

  // 2. Kedvenc receptek
  const kedvencReceptek = await prisma.favorite.findMany({
    where: { userId },
    include: {
      recipe: true
    }
  });




  return (
    <div className="section">
      <h1>Profil (védett oldal)</h1>
      <p>Üdv, {session.user.name}!</p>

      <h2 className="mt-6">📜 Saját receptjeid</h2>
      <ul>
        {sajatReceptek.map((r) => (
          <li key={r.id}>{r.name}</li>
        ))}
      </ul>

      <h2 className="mt-6">❤️ Kedvenceid</h2>
      <ul>
        {kedvencReceptek.map((fav) => (
          <li key={fav.id}>{fav.recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}
