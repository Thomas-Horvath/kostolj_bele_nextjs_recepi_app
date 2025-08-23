import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, username, email, password } = body;


    // kötelező mezők ellenőrzése
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Hiányzó adatok" }, { status: 400 });
    }

    // Ellenőrizzük, van-e már ilyen user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Ez az email már regisztrálva van." }, { status: 400 });
    }

    // Hash jelszó
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mentsük el az új usert
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Regisztrációs hiba:", error);
    return NextResponse.json({ error: "Szerverhiba" }, { status: 500 });
  }
}
