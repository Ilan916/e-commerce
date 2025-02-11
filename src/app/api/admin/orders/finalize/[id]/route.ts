import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id;

    // Récupération de la commande et des produits commandés
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    // Vérifier si tous les produits ont été validés
    const allValidated = order.items.every((item) => item.validated);
    if (!allValidated) {
      return NextResponse.json(
        { error: "Tous les produits doivent être validés avant d'expédier la commande" },
        { status: 400 }
      );
    }

    // Mise à jour du statut de la commande en "Expédiée"
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: "EXPEDIEE" },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("❌ Erreur finalisation commande :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
