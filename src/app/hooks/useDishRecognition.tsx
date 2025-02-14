"use client";
import { useState } from "react";
import { Recipe } from "@/app/types/recipe";

export function useDishRecognition() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);

  const analyzeDish = async (imageBase64: string) => {
    setLoading(true);
    setError("");
    setRecipe(null);
    setHasAnalyzed(false);

    try {
      const response = await fetch("/api/ai/detect-dish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64 }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Erreur lors de l'analyse");
      }

      const data: Recipe = await response.json();
      setRecipe(data);
      setHasAnalyzed(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erreur inconnue");
      } else {
        setError("Erreur inconnue");
      }
      console.error("Erreur API :", err);
    } finally {
      setLoading(false);
    }
  };

  return { recipe, loading, error, hasAnalyzed, analyzeDish };
}