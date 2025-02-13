import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Utilisateur non identifié" }, { status: 400 });
    }

    // 📌 Récupération des produits du panier de l'utilisateur
    const cartItems = await prisma.cartItem.findMany({
      where: { cart: { userId } },
      select: {
        product: {
          select: { id: true, name: true, price: true, imageUrl: true },
        },
        quantity: true,
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const availableProducts = cartItems.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
    }));

    // 📌 Création du schéma JSON pour la réponse attendue
    const recipeSchema = {
      type: "object",
      properties: {
        dish: { type: "string", description: "Nom du plat généré" },
        ingredients_needed: { type: "array", items: { type: "string" }, description: "Ingrédients nécessaires" },
        available_ingredients: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              price: { type: "number" },
              imageUrl: { type: "string" },
            },
          },
          description: "Ingrédients trouvés dans le panier",
        },
        missing_ingredients: { type: "array", items: { type: "string" }, description: "Ingrédients manquants" },
        steps: { type: "array", items: { type: "string" }, description: "Étapes de préparation" },
      },
      required: ["dish", "ingredients_needed", "available_ingredients", "missing_ingredients", "steps"],
    };

    // 🔥 Envoi à OpenAI pour générer une recette
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            Tu es un assistant culinaire qui génère des recettes uniquement avec les produits disponibles dans le panier de l'utilisateur.
            
            ### Directives :
            - Ne propose que des plats réalisables avec au moins **50% des ingrédients disponibles**.
            - Liste les ingrédients nécessaires pour la recette.
            - Classe les ingrédients en **disponibles** (dans le panier) et **manquants**.
            - Fournis des **étapes détaillées** de préparation.
            
            **Ingrédients disponibles dans le panier :**
            ${JSON.stringify(availableProducts)}
            
            **Utilise ce format JSON strictement :** ${JSON.stringify(recipeSchema)}
          `,
        },
      ],
      max_tokens: 600,
      functions: [{ name: "generate_recipe", parameters: recipeSchema }],
      function_call: { name: "generate_recipe" },
    });

    if (!response.choices[0]?.message?.function_call?.arguments) {
      return NextResponse.json({ error: "Impossible de générer une recette" }, { status: 500 });
    }

    const generatedRecipe = JSON.parse(response.choices[0].message.function_call.arguments || "{}");

    // 📌 Vérifier quels ingrédients du panier sont utilisés
    const usedIngredients = availableProducts.filter((product) =>
      generatedRecipe.ingredients_needed.some((ing: string) => ing.toLowerCase() === product.name.toLowerCase())
    );

    const missingIngredients = generatedRecipe.ingredients_needed.filter(
      (ing: string) => !usedIngredients.some((prod) => prod.name.toLowerCase() === ing.toLowerCase())
    );

    // 📌 Construire la réponse finale
    const finalRecipe = {
      dish: generatedRecipe.dish,
      ingredients_needed: generatedRecipe.ingredients_needed,
      available_ingredients: usedIngredients,
      missing_ingredients: missingIngredients,
      steps: generatedRecipe.steps,
    };

    return NextResponse.json(finalRecipe);
  } catch (error) {
    console.error("❌ Erreur génération recette :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
