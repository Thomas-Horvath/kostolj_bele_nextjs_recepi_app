import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth"; 
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Nem vagy bejelentkezve" }, { status: 401 });
  }

  const userId = session.user.id;

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { recipeId: true },
  });

  return NextResponse.json(favorites.map(fav => fav.recipeId), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}




export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Nem vagy bejelentkezve" }, { status: 401 });
  }

  const userId = session.user.id;
  const { recipeId } = await request.json();

  const exists = await prisma.favorite.findUnique({
    where: { userId_recipeId: { userId: userId, recipeId: recipeId } },
  });

  if (exists) {
    await prisma.favorite.delete({
      where: { userId_recipeId: { userId: userId, recipeId: recipeId } },
    });
    return NextResponse.json({ favorited: false });
  } else {
    await prisma.favorite.create({
      data: { userId: userId, recipeId: recipeId },
    });
    return NextResponse.json({ favorited: true });
  }
};