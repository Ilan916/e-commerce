import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
