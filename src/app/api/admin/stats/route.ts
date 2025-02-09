import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 📌 Nombre total de commandes
    const totalOrders = await prisma.order.count();

    // 📌 Chiffre d’affaires total
    const totalRevenue = await prisma.order.aggregate({
      _sum: { totalPrice: true },
    });

    // 📌 Nombre total d’utilisateurs
    const totalUsers = await prisma.user.count();

    // 📌 Nombre total de produits en stock
    const totalStock = await prisma.product.aggregate({
      _sum: { stock: true },
    });

    // 📌 Produits les plus vendus (top 5)
    const topProducts = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    });

    // 📌 Récupérer les infos des produits les plus vendus
    const topProductDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true, imageUrl: true },
        });
        return { ...product, quantitySold: item._sum.quantity };
      })
    );

    return NextResponse.json({
      totalOrders,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
      totalUsers,
      totalStock: totalStock._sum.stock || 0,
      topProducts: topProductDetails,
    });
  } catch (error) {
    console.error("❌ Erreur API stats :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
