import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { options } from "@/utils/auth.config";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(options);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { firstname, lastname, address, phoneNumber } = body;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { firstname, lastname, address, phoneNumber },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erreur mise à jour profil :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du profil" },
      { status: 500 }
    );
  }
}
