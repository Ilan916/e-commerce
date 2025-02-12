import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const suggestions = await prisma.productSuggestion.findMany();
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Erreur récupération suggestions :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
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