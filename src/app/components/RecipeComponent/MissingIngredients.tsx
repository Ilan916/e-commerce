"use client";

import React from "react";

interface MissingIngredientsProps {
  missingIngredients: string[];
}

const MissingIngredients: React.FC<MissingIngredientsProps> = ({ missingIngredients }) => {
  if (!missingIngredients.length) return null;

  return (
    <div className="mt-6">
      <h4 className="text-lg font-bold text-black mb-4">Ingrédients manquants :</h4>
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {missingIngredients.map((item, index) => (
          <div key={index} className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 bg-gray-50">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-red-500">
              <circle r={3} cx={3} cy={3} />
            </svg>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissingIngredients;
