import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true  // Include all product data
          }
        }
      }
    });

    const formattedItems = cart?.items?.map(item => ({
      id: item.product.id,
      cartItemId: item.id,  // Add this line to include the cart item ID
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      imageUrl: item.product.imageUrl
    })) || [];

    return NextResponse.json({ 
      items: formattedItems,
      success: true
    });
    
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ 
      error: "Failed to fetch cart items",
      items: [] 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
