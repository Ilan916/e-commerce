import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 📌 Récupérer une commande spécifique par son ID
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { email: true, firstname: true, lastname: true, address: true } },
        items: {
          include: {
            product: { select: { name: true, price: true } },
          },
        },
      },
    });

    if (!order) return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });

    return NextResponse.json(order);
  } catch (error) {
    console.error("❌ Erreur API commande :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
