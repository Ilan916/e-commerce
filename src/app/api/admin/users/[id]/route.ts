import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: { id?: string } } // ✅ Ajout de `?` pour indiquer que `id` peut être `undefined`
) {
  try {
    // Vérifier si `params.id` est bien défini avant d'exécuter la requête
    if (!context.params || !context.params.id) {
      return NextResponse.json({ error: "ID utilisateur manquant" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: context.params.id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        phoneNumber: true,
        address: true,
        dateOfBirth: true,
        createdAt: true,
        orders: {
          select: {
            id: true,
            totalPrice: true,
            status: true,
            createdAt: true,
            items: {
              select: {
                quantity: true,
                price: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
