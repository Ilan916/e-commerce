import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { userId, itemId, quantity } = await request.json();

    if (!userId || !itemId || quantity < 1) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const cartItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: { product: true }
    });

    return NextResponse.json({
      success: true,
      item: {
        id: cartItem.id,
        name: cartItem.product.name,
        quantity: cartItem.quantity,
        price: cartItem.product.price,
        imageUrl: cartItem.product.imageUrl
      }
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
