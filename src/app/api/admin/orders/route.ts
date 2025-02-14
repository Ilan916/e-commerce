import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const email = searchParams.get("email");

    const whereClause: Record<string, unknown> = {};
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
    console.error("Erreur API commandes :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
