import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { userId, itemId } = await request.json();

    if (!userId || !itemId) {
      return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId }
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: { id: itemId }
    });

    return NextResponse.json({ success: true, message: "Article supprimé avec succès" });

  } catch (error) {
    console.error("❌ Erreur suppression panier :", error);
    return NextResponse.json(
      { error: "Impossible de supprimer l'article" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
