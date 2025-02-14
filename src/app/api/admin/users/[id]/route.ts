import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/utils/auth.config";

const prisma = new PrismaClient();

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
      return NextResponse.json({ error: "ID utilisateur manquant" }, { status: 400 });
    }

    const session = await getServerSession(options);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN" && session.user.id !== id) {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
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
    console.error("Erreur récupération utilisateur :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: ParamsContext
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "ID utilisateur manquant" }, { status: 400 });

    const session = await getServerSession(options);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const { role } = await request.json();
    if (!["CLIENT", "ADMIN"].includes(role)) {
      return NextResponse.json({ error: "Rôle invalide" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erreur modification rôle :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: ParamsContext
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID utilisateur manquant" }, { status: 400 });
    }

    const session = await getServerSession(options);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression utilisateur :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}