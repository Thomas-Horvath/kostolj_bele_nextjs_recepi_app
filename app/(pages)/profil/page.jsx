import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
 const { redirect } = import("next/navigation");

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);


  // console.log(session)
  if (!session) {
    redirect("/login");
  }

  // A bejelentkezett user ID-je
  const userId = session.user.id;




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
