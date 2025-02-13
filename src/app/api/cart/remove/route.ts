import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { userId, productId } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      return NextResponse.json({ error: "Panier non trouvé" }, { status: 404 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId
      }
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: { id: cartItem.id }
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
