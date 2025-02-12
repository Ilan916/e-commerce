import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { userId, itemId } = await request.json();

    if (!userId || !itemId) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    await prisma.cartItem.delete({
      where: { id: itemId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return NextResponse.json(
      { error: "Failed to remove cart item" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
