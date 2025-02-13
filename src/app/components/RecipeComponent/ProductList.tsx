"use client";

import React from "react";

interface ProductListProps {
  products: any[];
  addToCart: (product: { id: string; name: string; price: number; imageUrl?: string }) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="mt-6">
      <h4 className="text-lg font-bold text-black mb-4">Ingrédients disponibles :</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item) => (
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
  );
};

export default ProductList;
