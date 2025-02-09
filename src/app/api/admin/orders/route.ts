import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 📌 Récupérer toutes les commandes avec filtres optionnels (statut & email)
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const email = searchParams.get("email");

    const whereClause: any = {};

    if (status) whereClause.status = status;
    if (email) whereClause.user = { email: email };

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        user: { select: { email: true } },
        items: {
          include: { product: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("❌ Erreur API commandes :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
