import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const { id } = params;

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
