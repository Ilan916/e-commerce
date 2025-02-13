import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: "Aucune image fournie" }, { status: 400 });
    }

    // 📌 Récupération des produits en base (nom, id, prix et image)
    const products = await prisma.product.findMany({
      select: { id: true, name: true, price: true, imageUrl: true },
    });

    // 🔍 Préparer les noms de produits pour correspondance avec l'IA
    const productNames = products.map((product) => product.name.toLowerCase());

    // 📌 Schéma JSON attendu
    const recipeSchema = {
      type: "object",
      properties: {
        dish: { type: "string", description: "Nom du plat détecté" },
        ingredients_needed: {
          type: "array",
          description: "Liste des ingrédients nécessaires",
          items: { type: "string" },
        },
        available_ingredients: {
          type: "array",
          description: "Liste des ingrédients trouvés dans la base",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "ID du produit" },
              name: { type: "string", description: "Nom du produit" },
              price: { type: "number", description: "Prix du produit" },
              imageUrl: { type: "string", description: "URL de l'image du produit" },
            },
          },
        },
        missing_ingredients: {
          type: "array",
          description: "Ingrédients nécessaires mais non disponibles en base",
          items: { type: "string" },
        },
        steps: {
          type: "array",
          description: "Étapes détaillées de la recette",
          items: { type: "string" },
        },
      },
      required: ["dish", "ingredients_needed", "available_ingredients", "missing_ingredients", "steps"],
      additionalProperties: false,
    };


    // **Amélioration du prompt pour l'IA**
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            Tu es un assistant culinaire spécialisé dans l'analyse d'images de plats et la génération de recettes. 
            Ta tâche est de détecter le plat sur l'image fournie et de générer une recette en te basant uniquement sur les ingrédients disponibles dans notre base de données.

            ### Directives d'analyse :
            1. **Détecte le plat** principal sur l'image.
            2. **Identifie les ingrédients nécessaires** à la recette.
            3. **Compare chaque ingrédient avec la base de données fournie**.
              - Si l’ingrédient est présent en base, ajoute-le dans "available_ingredients".
              - Si l’ingrédient est absent en base, ajoute-le dans "missing_ingredients".
            4. **Génère des étapes claires et précises** pour réaliser la recette.

            ### Liste des ingrédients disponibles en base :
            ${JSON.stringify(productNames)}
            - Structure ta réponse strictement selon ce schéma : ${JSON.stringify(recipeSchema)}
            **Ne génère que des ingrédients présents dans la base pour "available_ingredients".**
            **Ne fais aucune supposition : si un ingrédient n'est pas en base, mets-le dans "missing_ingredients".**
            **Garde une structure JSON 100% valide.**
          `,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `- Analyse cette image et génère une recette. Voici la liste des ingrédients disponibles en base : ${JSON.stringify(productNames)}`
            },
            {
              type: "image_url",
              image_url: { url: imageBase64 }
            }
          ],
        },
      ],
      max_tokens: 600,
      functions: [
        {
          name: "generate_recipe",
          description: "Génération d'une recette détaillée en JSON",
          parameters: recipeSchema,
        },
      ],
      function_call: { name: "generate_recipe" },
    });

    // 🛠 Vérification de la réponse OpenAI
    if (!response.choices[0]?.message?.function_call?.arguments) {
      return NextResponse.json({ error: "Impossible de générer une recette" }, { status: 500 });
    }

    // 🎯 **Récupération des ingrédients disponibles + leur détail**
    const rawRecipe = JSON.parse(response.choices[0].message.function_call.arguments || "{}");

    // 🌟 Correspondance des ingrédients détectés avec les produits en base
    const availableIngredients = products.filter((product) =>
      rawRecipe.ingredients_needed.some((ing: string) => ing.toLowerCase() === product.name.toLowerCase())
    );

    // 🔴 Détection des ingrédients manquants
    const missingIngredients = rawRecipe.ingredients_needed.filter(
      (ing: string) => !availableIngredients.some((prod) => prod.name.toLowerCase() === ing.toLowerCase())
    );

    // 📝 Mise en forme de la réponse
    const finalRecipe = {
      dish: rawRecipe.dish,
      ingredients_needed: rawRecipe.ingredients_needed,
      available_ingredients: availableIngredients.map((prod) => ({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        imageUrl: prod.imageUrl,
      })),
      missing_ingredients: missingIngredients,
      steps: rawRecipe.steps,
    };

    // ✅ Stocker les ingrédients manquants dans `ProductSuggestion`
    for (const missing of finalRecipe.missing_ingredients) {
      await prisma.productSuggestion.upsert({
        where: { name: missing },
        update: {},
        create: { name: missing },
      });
    }

    return NextResponse.json(finalRecipe);
  } catch (error) {
    console.error("❌ Erreur analyse plat :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
