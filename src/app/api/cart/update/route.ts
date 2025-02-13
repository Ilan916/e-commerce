import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { userId, productId, quantity } = await request.json();

    if (!userId || !productId || quantity < 1) {
      return NextResponse.json(
        { error: "Paramètres invalides" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return NextResponse.json({ error: "Panier non trouvé" }, { status: 404 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
      include: { product: true },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Article non trouvé dans le panier" },
        { status: 404 }
      );
    }

    if (cartItem.product.stock < quantity) {
      return NextResponse.json(
        { error: "Stock insuffisant pour cette quantité" },
        { status: 400 }
      );
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
      include: { product: true },
    });

    return NextResponse.json({
      success: true,
      item: {
        id: updatedCartItem.product.id,
        cartItemId: updatedCartItem.id,
        name: updatedCartItem.product.name,
        quantity: updatedCartItem.quantity,
        price: updatedCartItem.product.price,
        imageUrl: updatedCartItem.product.imageUrl,
      },
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
