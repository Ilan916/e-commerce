import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
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