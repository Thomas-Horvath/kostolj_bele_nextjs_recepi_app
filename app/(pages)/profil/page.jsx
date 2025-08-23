import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";
const { redirect } = import("next/navigation");
import p from "../../styles/profil.module.scss";

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
      <div className={p.container}>
        <h1>Szia, {session.user.username}!</h1>


        <h2 className="mt-6">📜 Saját receptjeid</h2>
        <ul>
          {sajatReceptek.length === 0 ? <p>Nincsenek még saját receptjeid.</p>
            : sajatReceptek.map((r) => (
              <li key={r.id}><Link href={`/receptek/${r.slug}`}>{r.name}</Link></li>
            ))}
        </ul>

        <h2 className="mt-6">❤️ Kedvenceid</h2>
        <ul>

          {
            kedvencReceptek.length === 0 ? <p>Nincsenek kedvenc receptjeid még.</p>
              : kedvencReceptek.map((fav) => (
                <li key={fav.id}><Link href={`/receptek/${fav.recipe.slug}`}>{fav.recipe.name}</Link></li>
              ))}
        </ul>
      </div>
    </div>
  );
}
