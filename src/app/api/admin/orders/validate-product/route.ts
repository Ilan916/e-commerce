import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const { itemId } = await req.json();

    if (!itemId) {
      return NextResponse.json({ error: "ID de l'article requis" }, { status: 400 });
    }

    const updatedItem = await prisma.orderItem.update({
      where: { id: itemId },
      data: { validated: true },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Erreur validation produit :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
