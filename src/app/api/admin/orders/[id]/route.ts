import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface ParamsContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: ParamsContext
) {
  try {
    // On attend la résolution de la Promise pour obtenir l'id
    const { id } = await params;
    
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, firstname: true, lastname: true, address: true } },
        items: {
          include: {
            product: { select: { name: true, price: true } },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    if (session.user.role !== "ADMIN" && order.user.id !== session.user.id) {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Erreur API commande :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}