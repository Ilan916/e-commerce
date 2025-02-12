import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { itemId } = await req.json();

    const updatedItem = await prisma.orderItem.update({
      where: { id: itemId },
      data: { validated: true },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("❌ Erreur validation produit :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
