import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

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
    console.error("Erreur récupération commandes payées :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des commandes payées" },
      { status: 500 }
    );
  }
}
