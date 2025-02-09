const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedOrders() {
  console.log("Début du seed des commandes...");

  // Récupérer un utilisateur existant
  const user = await prisma.user.findFirst();
  if (!user) {
    console.error("Aucun utilisateur trouvé. Ajoute des utilisateurs avant.");
    return;
  }

  // Récupérer des produits existants
  const products = await prisma.product.findMany({ take: 3 });
  if (products.length === 0) {
    console.error("Aucun produit trouvé. Exécute le seed des produits d'abord.");
    return;
  }

  // Création d'une commande factice
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalPrice: products.reduce((acc, p) => acc + p.price, 0), // Prix total basé sur les produits sélectionnés
      status: "En cours",
      items: {
        create: products.map((product) => ({
          productId: product.id,
          quantity: Math.floor(Math.random() * 3) + 1, // 1 à 3 unités aléatoires
          price: product.price,
        })),
      },
    },
  });

  console.log("✅ Commande factice ajoutée avec succès !");
  console.log(order);
}

seedOrders()
  .catch((e) => {
    console.error("Erreur lors du seed des commandes :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
