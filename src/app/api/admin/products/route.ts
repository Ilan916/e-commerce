import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/utils/auth.config";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Erreur récupération produits :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // 🛡 Vérification de l'authentification et du rôle ADMIN
    const session = await getServerSession(options);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const body = await req.json();
    const { name, description, price, stock, imageUrl, categoryId } = body;

    // Vérification des champs obligatoires
    if (!name || !description || !price || !stock || !categoryId) {
      return NextResponse.json(
        { error: "Tous les champs requis ne sont pas fournis" },
        { status: 400 }
      );
    }

    // Vérifier si la catégorie existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json({ error: "Catégorie introuvable" }, { status: 400 });
    }

    // Création du produit
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        imageUrl,
        category: { connect: { id: categoryId } },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}
