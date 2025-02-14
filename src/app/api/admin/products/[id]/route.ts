import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from '@/utils/auth.config'

interface ParamsContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: ParamsContext
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }, 
    });

    if (!product) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Erreur récupération produit :", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération du produit" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: ParamsContext
) {
  try {
    const { id } = await params;
    const session = await getServerSession(options);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, price, stock, imageUrl, categoryId } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        imageUrl,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Erreur mise à jour produit :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du produit" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: ParamsContext
) {
  try {
    const { id } = await params;
    const session = await getServerSession(options);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    if (!id) {
      return NextResponse.json({ error: "Product ID manquant" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Produit supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    return NextResponse.json(
      { error: "Impossible de supprimer le produit" },
      { status: 500 }
    );
  }
}