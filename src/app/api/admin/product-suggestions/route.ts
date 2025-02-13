import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const suggestions = await prisma.productSuggestion.findMany();
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Erreur récupération suggestions :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Nom requis" }, { status: 400 });

    await prisma.productSuggestion.deleteMany({
      where: { name },
    });

    return NextResponse.json({ message: "Produit supprimé des suggestions" });
  } catch (error) {
    console.error("Erreur suppression suggestion :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
