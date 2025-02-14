export interface Ingredient {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface Recipe {
  dish: string;
  ingredients_needed: string[];
  available_ingredients: Ingredient[];
  missing_ingredients: string[];
  steps: string[];
}