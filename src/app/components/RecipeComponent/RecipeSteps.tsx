"use client";

import React from "react";

interface RecipeStepsProps {
  steps: string[];
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  return (
    <div className="mt-8">
      <h4 className="text-lg font-bold text-black">Étapes de la recette :</h4>
      <ul role="list" className="divide-y divide-gray-200 mt-4">
        {steps.map((step, index) => (
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
  );
};

export default RecipeSteps;
