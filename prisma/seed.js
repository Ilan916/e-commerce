import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑 Suppression des anciennes données...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("📌 Création des utilisateurs...");
  const user1 = await prisma.user.create({
    data: {
      firstname: "Jean",
      lastname: "Dupont",
      email: "jean.dupont@example.com",
      password: "hashedpassword123",
      role: "CLIENT",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: "Alice",
      lastname: "Martin",
      email: "alice.martin@example.com",
      password: "hashedpassword456",
      role: "CLIENT",
    },
  });

  console.log("📌 Création des catégories...");
  const categoriesData = [
    { name: "Fruits & Légumes", description: "Produits frais et bio" },
    { name: "Viandes & Poissons", description: "Viandes rouges, blanches et poissons frais" },
    { name: "Épicerie & Condiments", description: "Épices, sauces et condiments divers" },
    { name: "Produits Laitiers & Œufs", description: "Lait, fromages et œufs frais" },
    { name: "Boissons", description: "Jus, sodas, cafés et thés" },
    { name: "Produits Céréaliers & Légumineuses", description: "Pâtes, riz, quinoa, lentilles" },
  ];

  await prisma.category.createMany({ data: categoriesData });
  const categoriesList = await prisma.category.findMany();

  console.log("📌 Ajout des produits...");
  const productsData = [
    // Fruits & Légumes (20)
    { name: "Pomme", description: "Pomme bio", price: 2.5, stock: 100, categoryId: categoriesList[0].id },
    { name: "Banane", description: "Banane équitable", price: 3.0, stock: 50, categoryId: categoriesList[0].id },
    { name: "Orange", description: "Orange juteuse", price: 2.0, stock: 70, categoryId: categoriesList[0].id },
    { name: "Tomate", description: "Tomate cerise", price: 2.0, stock: 80, categoryId: categoriesList[0].id },
    { name: "Carotte", description: "Carotte bio", price: 1.5, stock: 100, categoryId: categoriesList[0].id },
    { name: "Salade", description: "Salade verte", price: 1.2, stock: 60, categoryId: categoriesList[0].id },
    { name: "Poivron rouge", description: "Poivron sucré", price: 2.3, stock: 50, categoryId: categoriesList[0].id },
    { name: "Courgette", description: "Courgette bio", price: 2.1, stock: 50, categoryId: categoriesList[0].id },
    { name: "Aubergine", description: "Aubergine violette", price: 2.4, stock: 60, categoryId: categoriesList[0].id },
    { name: "Oignon", description: "Oignon jaune", price: 1.0, stock: 90, categoryId: categoriesList[0].id },

    // Viandes & Poissons (10)
    { name: "Poulet fermier", description: "Poulet élevé en plein air", price: 12.0, stock: 40, categoryId: categoriesList[1].id },
    { name: "Saumon", description: "Saumon frais", price: 15.0, stock: 30, categoryId: categoriesList[1].id },
    { name: "Bœuf haché", description: "Viande de bœuf française", price: 10.0, stock: 50, categoryId: categoriesList[1].id },
    { name: "Jambon blanc", description: "Jambon supérieur", price: 5.0, stock: 60, categoryId: categoriesList[1].id },

    // Épicerie & Condiments (15)
    { name: "Sel de mer", description: "Sel de mer fin", price: 1.0, stock: 100, categoryId: categoriesList[2].id },
    { name: "Poivre noir", description: "Poivre en grains", price: 3.5, stock: 80, categoryId: categoriesList[2].id },
    { name: "Huile d'olive", description: "Huile d'olive extra vierge", price: 10.0, stock: 40, categoryId: categoriesList[2].id },
    { name: "Paprika", description: "Poudre de poivron doux ou piquant", price: 4.0, stock: 60, categoryId: categoriesList[2].id },
    { name: "Curry", description: "Mélange d'épices aux saveurs exotiques", price: 5.0, stock: 50, categoryId: categoriesList[2].id },
    { name: "Curcuma", description: "Épice jaune aux propriétés antioxydantes", price: 4.5, stock: 70, categoryId: categoriesList[2].id },
    { name: "Cumin", description: "Graines moulues au goût chaud et épicé", price: 3.8, stock: 65, categoryId: categoriesList[2].id },
    { name: "Gingembre", description: "Poudre de gingembre pour plats et infusions", price: 6.0, stock: 55, categoryId: categoriesList[2].id },
    { name: "Cannelle", description: "Écorce moulue, idéale pour desserts et infusions", price: 5.5, stock: 50, categoryId: categoriesList[2].id },
    { name: "Moutarde de Dijon", description: "Moutarde forte pour sauces et plats", price: 3.2, stock: 80, categoryId: categoriesList[2].id },
    { name: "Sauce soja", description: "Sauce fermentée pour plats asiatiques", price: 4.2, stock: 90, categoryId: categoriesList[2].id },
    { name: "Vinaigre balsamique", description: "Vinaigre italien vieilli, parfait pour salades", price: 7.0, stock: 40, categoryId: categoriesList[2].id },
    { name: "Herbes de Provence", description: "Mélange d'herbes aromatiques", price: 4.5, stock: 60, categoryId: categoriesList[2].id },
    { name: "Thym", description: "Plante aromatique idéale pour viandes et sauces", price: 3.0, stock: 70, categoryId: categoriesList[2].id },
    { name: "Romarin", description: "Herbe aromatique pour grillades et plats mijotés", price: 3.5, stock: 65, categoryId: categoriesList[2].id },
    { name: "Basilic", description: "Feuilles séchées pour sauces et plats italiens", price: 3.8, stock: 60, categoryId: categoriesList[2].id },
    { name: "Origan", description: "Parfait pour pizzas et plats méditerranéens", price: 3.6, stock: 75, categoryId: categoriesList[2].id },


    // Produits Laitiers & Œufs (10)
    { name: "Lait entier", description: "Lait de vache bio", price: 1.5, stock: 70, categoryId: categoriesList[3].id },
    { name: "Fromage cheddar", description: "Fromage affiné", price: 4.0, stock: 50, categoryId: categoriesList[3].id },
    { name: "Yaourt nature", description: "Yaourt bio", price: 0.8, stock: 90, categoryId: categoriesList[3].id },
    { name: "Brie", description: "Fromage à pâte molle et croûte fleurie", price: 5.0, stock: 40, categoryId: categoriesList[3].id },
    { name: "Camembert", description: "Fromage normand au lait cru", price: 4.5, stock: 50, categoryId: categoriesList[3].id },
    { name: "Roquefort", description: "Fromage bleu au lait de brebis", price: 6.5, stock: 30, categoryId: categoriesList[3].id },
    { name: "Comté", description: "Fromage affiné à pâte pressée cuite", price: 7.0, stock: 45, categoryId: categoriesList[3].id },
    { name: "Gruyère", description: "Fromage suisse à pâte dure", price: 6.0, stock: 35, categoryId: categoriesList[3].id },
    { name: "Mozzarella", description: "Fromage italien idéal pour les pizzas", price: 3.5, stock: 60, categoryId: categoriesList[3].id },
    { name: "Parmesan", description: "Fromage italien affiné au goût puissant", price: 8.0, stock: 25, categoryId: categoriesList[3].id },
    { name: "Chèvre frais", description: "Fromage de chèvre doux et crémeux", price: 5.5, stock: 40, categoryId: categoriesList[3].id },
    { name: "Bleu d'Auvergne", description: "Fromage persillé au goût intense", price: 6.8, stock: 30, categoryId: categoriesList[3].id },
    { name: "Ricotta", description: "Fromage frais italien pour cuisine et desserts", price: 4.0, stock: 50, categoryId: categoriesList[3].id },


    // Boissons (10)
    { name: "Eau minérale", description: "Eau naturelle", price: 0.5, stock: 200, categoryId: categoriesList[4].id },
    { name: "Coca-Cola", description: "Boisson gazeuse", price: 1.2, stock: 100, categoryId: categoriesList[4].id },
    { name: "Jus d'orange", description: "Pur jus d'orange sans sucre ajouté", price: 2.0, stock: 120, categoryId: categoriesList[4].id },
    { name: "Jus de pomme", description: "Jus de pomme bio et pressé à froid", price: 2.2, stock: 110, categoryId: categoriesList[4].id },
    { name: "Jus multifruits", description: "Mélange exotique de fruits tropicaux", price: 2.5, stock: 100, categoryId: categoriesList[4].id },
    { name: "Thé glacé", description: "Boisson rafraîchissante à base de thé noir", price: 1.8, stock: 90, categoryId: categoriesList[4].id },
    { name: "Limonade artisanale", description: "Limonade bio pétillante et rafraîchissante", price: 1.5, stock: 80, categoryId: categoriesList[4].id },
    { name: "Eau gazeuse", description: "Eau minérale gazeuse naturelle", price: 0.8, stock: 150, categoryId: categoriesList[4].id },
    { name: "Red Bull", description: "Boisson énergisante à la caféine et taurine", price: 2.8, stock: 60, categoryId: categoriesList[4].id },
    { name: "Café froid", description: "Boisson à base d'expresso infusé à froid", price: 3.0, stock: 70, categoryId: categoriesList[4].id },
    { name: "Milkshake vanille", description: "Milkshake crémeux à la vanille bourbon", price: 3.5, stock: 50, categoryId: categoriesList[4].id },
    { name: "Chocolat chaud", description: "Boisson chaude au cacao onctueux", price: 2.5, stock: 90, categoryId: categoriesList[4].id },


    // Produits Céréaliers & Légumineuses (10)
    { name: "Riz basmati", description: "Riz parfumé", price: 3.0, stock: 60, categoryId: categoriesList[5].id },
    { name: "Lentilles corail", description: "Lentilles bio", price: 2.5, stock: 50, categoryId: categoriesList[5].id },
    { name: "Quinoa", description: "Quinoa bio riche en protéines", price: 4.0, stock: 70, categoryId: categoriesList[5].id },
    { name: "Pois chiches", description: "Pois chiches secs pour houmous et plats", price: 2.8, stock: 80, categoryId: categoriesList[5].id },
    { name: "Haricots rouges", description: "Haricots rouges secs pour chili", price: 3.2, stock: 60, categoryId: categoriesList[5].id },
    { name: "Haricots blancs", description: "Haricots blancs pour cassoulet", price: 3.0, stock: 50, categoryId: categoriesList[5].id },
    { name: "Farine de blé", description: "Farine bio pour pains et pâtisseries", price: 1.8, stock: 100, categoryId: categoriesList[5].id },
    { name: "Semoule de blé", description: "Semoule fine pour couscous", price: 2.5, stock: 70, categoryId: categoriesList[5].id },
    { name: "Boulgour", description: "Boulgour complet, idéal pour taboulé", price: 3.5, stock: 60, categoryId: categoriesList[5].id },
    { name: "Flocons d'avoine", description: "Flocons d'avoine pour petit-déjeuner", price: 2.0, stock: 90, categoryId: categoriesList[5].id },
    { name: "Orge perlé", description: "Orge perlé pour soupes et risottos", price: 3.0, stock: 50, categoryId: categoriesList[5].id },
    { name: "Maïs en grains", description: "Maïs séché pour polenta et tortillas", price: 2.5, stock: 60, categoryId: categoriesList[5].id },
    { name: "Sarrasin", description: "Sarrasin pour galettes et porridges", price: 3.8, stock: 50, categoryId: categoriesList[5].id },
    { name: "Soja", description: "Graines de soja riches en protéines", price: 4.2, stock: 40, categoryId: categoriesList[5].id },

  ];

  await prisma.product.createMany({ data: productsData });
  const productsList = await prisma.product.findMany();

  console.log("✅ Tous les produits ont été ajoutés !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
