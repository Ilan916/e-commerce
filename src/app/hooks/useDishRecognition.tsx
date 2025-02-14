"use client";
import { useState } from "react";
import { Recipe } from '../types';

// Type de la réponse JSON attendue de l'API
interface RecipeResponse {
  dish: string;
  ingredients_needed: string[];
  available_ingredients: string[];
  missing_ingredients: string[];
  steps: string[];
}

interface RecognitionResult {
  recipe: Recipe;
  confidence: number;
}

export default function useDishRecognition() {
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);

  const recognizeDish = async (imageData: File): Promise<RecognitionResult> => {
    setLoading(true);
    setError("");
    setRecipe(null);
    setHasAnalyzed(false);

    try {
      const response = await fetch("/api/ai/detect-dish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: imageData }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Erreur lors de l'analyse");
      }

      const data: RecipeResponse = await response.json();
      setRecipe(data);
      setHasAnalyzed(true);
    } catch (err: any) {
      console.error("Erreur API :", err);
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }

    return {
      recipe: data,
      confidence: 0.9, // Example confidence value
    };
  };

  return { recognizeDish };
}
