"use client";

import { useDishRecognition } from "@/app/hooks/useDishRecognition";
import { NavbarClient, NavbarAuth, SidebarAuthentification, ImageUploader } from "@/app/components";
import { useState } from "react";

export default function RecettePage() {
  const { recipe, loading, error, analyzeDish } = useDishRecognition();
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = (image: string) => {
    analyzeDish(image);
    setImageUploaded(true);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarAuthentification />

      <div className="flex-1">
        {/* Navbar */}
        <NavbarAuth />
        <NavbarClient />

        {/* Contenu principal */}
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
          <h1 className="text-2xl font-bold mb-6">Reconnaissance et Suggestions de Recettes</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bloc de reconnaissance d’image */}
            <div className="p-6 border rounded-lg shadow-lg bg-gray-50">
              <h2 className="text-lg font-semibold mb-4">Reconnaissance de Plat</h2>
              <ImageUploader onImageUpload={handleImageUpload} />

              {loading && <p className="text-gray-500 mt-4">Analyse en cours...</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}

              {recipe && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-900">{recipe.dish}</h3>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-800">Ingrédients :</h4>
                    <p className="text-gray-700 mt-1">
                      <strong>Disponibles :</strong> {recipe.available_ingredients.join(", ") || "Aucun"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Manquants :</strong> {recipe.missing_ingredients.join(", ") || "Aucun"}
                    </p>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-800 mt-4">Étapes de préparation :</h4>
                  <ol className="list-decimal ml-6 text-gray-700">
                    {recipe.steps.map((step: string, index: number) => (
                      <li key={index} className="mt-2">{step}</li>
                    ))}
                  </ol>

                  <button
                    onClick={() => setImageUploaded(false)}
                    className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  >
                    Réessayer avec une autre image
                  </button>
                </div>
              )}
            </div>

            {/* Bloc de suggestion de recettes */}
            <div className="p-6 border rounded-lg shadow-lg bg-gray-50">
              <h2 className="text-lg font-semibold mb-4">Suggestions de Recettes</h2>
              <p className="text-gray-600">Fonctionnalité en cours de développement...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
