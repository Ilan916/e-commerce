import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, stock, imageUrl, categoryId } = body;

    // Validation des données
    if (!name || !description || !price || !stock || !categoryId) {
      return NextResponse.json(
        { error: "Tous les champs requis ne sont pas fournis" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        imageUrl,
        category: { connect: { id: categoryId } }, // Liaison avec la catégorie
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Erreur création produit :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}

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
