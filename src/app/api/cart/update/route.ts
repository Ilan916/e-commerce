import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { userId, itemId, quantity } = await request.json();

    if (!userId || !itemId || quantity < 1) {
      return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { product: true }
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Article non trouvé dans le panier" }, { status: 404 });
    }

    // Vérifier si le stock permet cette mise à jour
    if (cartItem.product.stock < quantity) {
      return NextResponse.json({ error: "Stock insuffisant pour cette quantité" }, { status: 400 });
    }

    // Mise à jour de la quantité
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: { product: true }
    });

    return NextResponse.json({
      success: true,
      item: {
        id: updatedCartItem.id,
        name: updatedCartItem.product.name,
        quantity: updatedCartItem.quantity,
        price: updatedCartItem.product.price,
        imageUrl: updatedCartItem.product.imageUrl
      }
    });

  } catch (error) {
    console.error("❌ Erreur mise à jour panier :", error);
    return NextResponse.json(
      { error: "Impossible de mettre à jour l'article" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
