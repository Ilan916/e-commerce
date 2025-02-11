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

    // 📌 Récupération des produits (nom + id) depuis la BDD
    const products = await prisma.product.findMany({
      select: { id: true, name: true },
    });

    // 📌 Schéma JSON attendu en réponse
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

    // 📌 Appel API OpenAI avec GPT-4 Vision
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
      functions: [
        {
          name: "generate_recipe",
          description: "Génération d'une recette structurée",
          parameters: recipeSchema,
        },
      ],
      function_call: { name: "generate_recipe" },
    });

    const recipe = response.choices[0].message?.function_call?.arguments;
    const parsedRecipe = JSON.parse(recipe || "{}");

    return NextResponse.json(parsedRecipe);
  } catch (error) {
    console.error("❌ Erreur lors de l'analyse de l'image :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
