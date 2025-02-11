import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      where: { status: "PAYEE" }, // On récupère seulement les commandes payées
      include: {
        user: { select: { firstname: true, lastname: true, email: true } },
        items: {
          include: {
            product: { select: { name: true, price: true, stock: true } },
          },
        },
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur récupération commandes payées :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des commandes payées" },
      { status: 500 }
    );
  }
}
