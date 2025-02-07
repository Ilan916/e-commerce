import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: String(userId) },
      include: { product: true },
    });

    const formattedCartItems: CartItem[] = cartItems.map(item => ({
      id: item.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    res.status(200).json(formattedCartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
}