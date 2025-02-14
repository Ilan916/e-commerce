"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartContext } from "@/app/context/CartContext";
import { NavbarClient, NavbarAuth, SidebarAuthentification, ImageUploader, CartNotification } from "@/app/components";
import { useDishRecognition } from "@/app/hooks/useDishRecognition";
import { Recipe, Ingredient } from "@/app/types/recipe";


export default function RecettePage() {
  const { recipe, loading, error, analyzeDish } = useDishRecognition();
  const { addItemToCart } = useCartContext();
  const { data: session } = useSession();
  const router = useRouter();

  const [showNotification, setShowNotification] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [errorRecipe, setErrorRecipe] = useState("");

  // Fonction d'ajout au panier
  const addToCart = (product: { id: string; name: string; price: number; imageUrl?: string }) => {
    if (!session?.user?.id) {
      router.push("/connexion");
      return;
    }

    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl || "",
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // 🔹 Fonction pour générer une recette depuis le panier
  const generateRecipeFromCart = async () => {
    if (!session?.user?.id) {
      router.push("/connexion");
      return;
    }

    setLoadingRecipe(true);
    setErrorRecipe("");

    try {
      const response = await fetch("/api/ai/from-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedRecipe(data);
      } else {
        setErrorRecipe(data.error || "Impossible de générer la recette.");
      }
    } catch (error: unknown) {
      console.error('Error:', error);
      setErrorRecipe("Erreur lors de la récupération de la recette.");
    } finally {
      setLoadingRecipe(false);
    }
  };

  const displayedRecipe = recipe || generatedRecipe;

  return (
    <div className="flex">
      <SidebarAuthentification />

      <div className="flex-1">
        <NavbarAuth />
        <NavbarClient />

        <div className="max-w-6xl mx-auto p-6 mt-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Reconnaissance et Suggestions de Recettes</h1>

          {/* Bloc principal avec deux colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bloc reconnaissance d’image */}
            <div className="p-6 border rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-black">Reconnaissance de Plat</h2>
              <ImageUploader onImageUpload={analyzeDish} />
              {loading && <p className="text-gray-500 mt-4">Analyse en cours...</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            {/* Bloc suggestions de recettes */}
            <div className="p-6 border rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-black">Suggestions de Recettes</h2>
              <button
                onClick={generateRecipeFromCart}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Proposer une recette avec mon panier
              </button>
              {loadingRecipe && <p className="text-gray-500 mt-4">Génération en cours...</p>}
              {errorRecipe && <p className="text-red-500 mt-4">{errorRecipe}</p>}
            </div>
          </div>

          {/* Résultat au centre sous les deux blocs */}
          {displayedRecipe && (
            <div className="mt-10">
              {/* Nom du plat */}
              <h3 className="text-2xl font-bold text-center text-black">{displayedRecipe.dish}</h3>

              {/* Produits disponibles en grille */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-black mb-4">Ingrédients disponibles :</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayedRecipe.available_ingredients.map((item: Ingredient) => (
                    <div key={item.id} className="group relative cursor-pointer transition transform hover:scale-105">
                      <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                        {item.imageUrl ? (
                          <img alt={item.name} src={item.imageUrl} className="size-full object-cover transition group-hover:opacity-75" />
                        ) : (
                          <div className="text-gray-400 text-center">Image indisponible</div>
                        )}
                      </div>

                      <div className="relative mt-4">
                        <h3 className="text-sm font-medium text-black">{item.name}</h3>
                      </div>

                      <div className="absolute inset-x-0 top-0 flex h-64 items-end justify-end overflow-hidden rounded-lg p-4">
                        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                        <p className="relative text-lg font-semibold text-white">{item.price.toFixed(2)} €</p>
                      </div>

                      <div className="mt-6">
                        <button
                          onClick={() => addToCart(item)}
                          className="relative flex w-full items-center justify-center rounded-md border border-transparent bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-900 transition"
                        >
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Produits manquants */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-black mb-4">Ingrédients manquants :</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-2">
                  {displayedRecipe.missing_ingredients.map((item: string, index: number) => (
                    <div key={index} className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 bg-gray-50">
                      <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-red-500">
                        <circle r={3} cx={3} cy={3} />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Étapes de la recette */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-black">Étapes de la recette :</h4>
                <ul role="list" className="divide-y divide-gray-200 mt-4">
                  {displayedRecipe.steps.map((step: string, index: number) => (
                    <li key={index} className="flex justify-between gap-x-6 py-5">
                      <div className="flex items-center min-w-0 gap-x-4">
                        <span className="size-12 flex items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-black">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold text-black">{step}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Notification d'ajout au panier */}
        <CartNotification show={showNotification} onClose={() => setShowNotification(false)} />
      </div>
    </div>
  );
}
