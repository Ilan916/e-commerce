import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("📌 Suppression des anciennes commandes...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany(); // 🔥 On supprime les anciens utilisateurs pour éviter les doublons

  console.log("📌 Création d'utilisateurs...");
  const users = await prisma.user.createMany({
    data: [
      { firstname: "Jean", lastname: "Dupont", email: "jean@example.com", password: "password", role: "CLIENT" },
      { firstname: "Alice", lastname: "Martin", email: "alice@example.com", password: "password", role: "CLIENT" },
      { firstname: "Paul", lastname: "Durand", email: "paul@example.com", password: "password", role: "CLIENT" },
      { firstname: "Emma", lastname: "Lemoine", email: "emma@example.com", password: "password", role: "CLIENT" },
      { firstname: "Luc", lastname: "Morel", email: "luc@example.com", password: "password", role: "CLIENT" },
    ],
  });

  console.log("📌 Récupération des utilisateurs...");
  const userList = await prisma.user.findMany();

  console.log("📌 Récupération des produits existants...");
  const products = await prisma.product.findMany();
  if (products.length < 2) {
    console.error("❌ Erreur : Il faut au moins 2 produits dans la base pour générer des commandes !");
    process.exit(1);
  }

  console.log("📌 Création des commandes...");
  const statuses = ["PAYEE", "EN_PREPARATION", "EXPEDIEE", "LIVREE", "ANNULEE"];

  for (let i = 0; i < statuses.length; i++) {
    await prisma.order.create({
      data: {
        userId: userList[i].id,
        totalPrice: products[0].price * 2 + products[1].price * 1, // 2x Produit A + 1x Produit B
        status: statuses[i],
        items: {
          create: [
            { productId: products[0].id, quantity: 2, price: products[0].price },
            { productId: products[1].id, quantity: 1, price: products[1].price },
          ],
        },
      },
    });
  }

  console.log("✅ Seed des commandes terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
