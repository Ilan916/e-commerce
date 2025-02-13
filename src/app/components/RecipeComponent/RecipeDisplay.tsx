"use client";

import React from "react";
import ProductList from "./ProductList";
import MissingIngredients from "./MissingIngredients";
import RecipeSteps from "./RecipeSteps";

interface RecipeDisplayProps {
  recipe: any;
  addToCart: (product: { id: string; name: string; price: number; imageUrl?: string }) => void;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, addToCart }) => {
  if (!recipe) return null;

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-center text-black">{recipe.dish}</h3>

      {/* Produits disponibles */}
      <ProductList products={recipe.available_ingredients} addToCart={addToCart} />

      {/* Produits manquants */}
      <MissingIngredients missingIngredients={recipe.missing_ingredients} />

      {/* Étapes de la recette */}
      <RecipeSteps steps={recipe.steps} />
    </div>
  );
};

export default RecipeDisplay;
