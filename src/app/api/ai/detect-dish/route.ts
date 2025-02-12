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

    // 🔹 Récupération des produits existants (nom + id)
    const products = await prisma.product.findMany({
      select: { id: true, name: true },
    });

    // 📌 Schéma JSON attendu en retour
    const recipeSchema = {
      type: "object",
      properties: {
        dish: { type: "string", description: "Nom du plat détecté" },
        ingredients_needed: {
          type: "array",
          description: "Ingrédients nécessaires pour la recette",
          items: { type: "string" },
        },
        available_ingredients: {
          type: "array",
          description: "Ingrédients trouvés dans la liste des produits",
          items: { type: "string" },
        },
        missing_ingredients: {
          type: "array",
          description: "Ingrédients manquants dans la liste des produits",
          items: { type: "string" },
        },
        steps: {
          type: "array",
          description: "Étapes détaillées de préparation",
          items: { type: "string" },
        },
      },
      required: ["dish", "ingredients_needed", "available_ingredients", "missing_ingredients", "steps"],
      additionalProperties: false,
    };

    // 🔥 Appel API OpenAI pour analyse de l'image
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Tu es un assistant culinaire. Analyse une image et génère une recette JSON en respectant ce format : ${JSON.stringify(recipeSchema)}`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: `Analyse cette image, détecte le plat et génère une recette. Utilise cette liste de produits pour valider les ingrédients : ${JSON.stringify(products)}` },
            { type: "image_url", image_url: { url: imageBase64 } }
          ],
        },
      ],
      max_tokens: 500,
      functions: [
        {
          name: "generate_recipe",
          description: "Génération d'une recette structurée",
          parameters: recipeSchema,
        },
      ],
      function_call: { name: "generate_recipe" },
    });

    // 🔍 Vérification de la réponse
    if (!response.choices[0]?.message?.function_call?.arguments) {
      return NextResponse.json({ error: "Impossible de générer une recette" }, { status: 500 });
    }

    const recipe = JSON.parse(response.choices[0].message.function_call.arguments || "{}");

    // ✅ Stocker les ingrédients manquants dans `ProductSuggestion`
    for (const missing of recipe.missing_ingredients) {
      await prisma.productSuggestion.upsert({
        where: { name: missing },
        update: {},
        create: { name: missing },
      });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("❌ Erreur analyse plat :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
