"use client";

import { useDishRecognition } from "@/app/hooks/useDishRecognition";
import { NavbarClient, NavbarAuth, SidebarAuthentification, ImageUploader } from "@/app/components";

export default function RecettePage() {
  const { recipe, loading, error, analyzeDish } = useDishRecognition();

  const addToCart = async (productName: string) => {
    await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productName }),
    });
    alert(`${productName} ajouté au panier !`);
  };

  return (
    <div className="flex">
      <SidebarAuthentification />

      <div className="flex-1">
        <NavbarAuth />
        <NavbarClient />

        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
          <h1 className="text-2xl font-bold mb-6">Reconnaissance et Suggestions de Recettes</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bloc de reconnaissance d’image */}
            <div className="p-4 border rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Reconnaissance de Plat</h2>
              <ImageUploader onImageUpload={analyzeDish} />

              {loading && <p className="text-gray-500 mt-4">Analyse en cours...</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}

              {recipe && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold">{recipe.dish}</h3>
                  <p className="text-gray-700 mt-2"><strong>Ingrédients :</strong> {recipe.ingredients_needed.join(", ")}</p>

                  <h4 className="text-green-600 font-bold mt-4">Disponibles :</h4>
                  <ul className="list-disc ml-6">
                    {recipe.available_ingredients.map((item: string, index: number) => (
                      <li key={index} className="mt-2 flex justify-between">
                        {item}
                        <button onClick={() => addToCart(item)} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                          Ajouter au panier
                        </button>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-red-600 font-bold mt-4">Manquants :</h4>
                  <ul className="list-disc ml-6 text-red-500">
                    {recipe.missing_ingredients.map((item: string, index: number) => (
                      <li key={index} className="mt-2">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bloc de suggestion de recettes */}
            <div className="p-4 border rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Suggestions de Recettes</h2>
              <p className="text-gray-600">Fonctionnalité en cours de développement...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
