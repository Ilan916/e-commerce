const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fonction pour ajouter un délai entre les requêtes
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function seed() {
  console.log("Démarrage du seed...");

  // Liste réduite des catégories essentielles
  // const categories = [
  //   "snacks",
  //   "beverages",
  //   "dairies",
  //   "meats",
  //   "fishes",
  // ];

  const categories = [
    "vegetables",
    "pastas",
    "condiments",
  ];

  // Suppression des anciennes données
  // console.log("Suppression des anciennes données...");
  // await prisma.product.deleteMany();
  // await prisma.category.deleteMany();
  // console.log("Données supprimées avec succès.");

  for (const category of categories) {
    console.log(`\nTraitement de la catégorie : ${category}`);

    // Ajout d'un délai avant chaque requête
    await delay(1000); // Délai d'une seconde

    try {
      // Création ou récupération de la catégorie dans la base de données
      const categoryInDB = await prisma.category.create({
        data: {
          name: category,
          description: `Produits dans la catégorie ${category}`,
        },
      });

      // Appel à l'API pour récupérer les produits
      const response = await fetch(
        `https://world.openfoodfacts.org/category/${category}.json?page_size=30` // Limitation à 30 produits
      );

      if (!response.ok) {
        console.error(
          `Erreur lors de la récupération de la catégorie ${category}:`,
          response.statusText
        );
        continue;
      }

      const data = await response.json();

      const products = data.products || [];
      console.log(`${products.length} produits trouvés pour la catégorie ${category}`);

      for (const product of products) {
        // Vérification des données obligatoires avant l'insertion
        if (product.product_name && product.nutrition_grades) {
          await prisma.product.create({
            data: {
              name: product.product_name || "Nom inconnu",
              description: product.generic_name || "Pas de description disponible.",
              price: parseFloat((Math.random() * 50 + 1).toFixed(2)), // Prix aléatoire entre 1 et 50€
              stock: Math.floor(Math.random() * 100) + 1, // Stock aléatoire entre 1 et 100
              imageUrl: product.image_url || null, // URL de l'image (null si non disponible)
              category: { connect: { id: categoryInDB.id } }, // Liaison avec la catégorie
            },
          });
        }
      }
    } catch (error) {
      console.error(`Erreur lors du traitement de la catégorie ${category}:`, error.message);
    }
  }

  console.log("\nSeed terminé avec succès !");
}

seed()
  .catch((e) => {
    console.error("Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  