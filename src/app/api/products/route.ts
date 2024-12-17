import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: { url: string | URL; }) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '8', 10);
  const categoryId = searchParams.get('categoryId');
  const skip = (page - 1) * limit;

  try {
    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        where: categoryId ? { categoryId } : undefined,
      }),
      prisma.product.count({
        where: categoryId ? { categoryId } : undefined,
      }),
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({ products, totalPages });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}