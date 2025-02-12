"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/hooks/useCart";
import CartNotification from "../CartNotification/CartNotification";
import { CheckIcon } from "@heroicons/react/24/outline";

interface ProductInfosProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    stock: number;
    category: string;
  };
}

const ProductInfos: React.FC<ProductInfosProps> = ({ product }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { addToCart, loading: cartLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(value, product.stock)));
  };

  const handleAddToCart = async () => {
    if (!session?.user?.id) {
      router.push("/connexion");
      return;
    }

    try {
      await addToCart(session.user.id, product.id, quantity);
      setQuantity(1);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        
        {/* 🧭 Breadcrumb */}
        <div className="lg:max-w-lg lg:self-start">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              <li>
                <a href={`/category/${product.category}`} className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  {product.category}
                </a>
              </li>
            </ol>
          </nav>

          {/* 🏷️ Titre & Description */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-base text-gray-500">{product.description}</p>

          {/* 💰 Prix & Avis */}
          <div className="mt-4 flex items-center">
            <p className="text-lg font-semibold text-gray-900 sm:text-xl">{product.price.toFixed(2)} €</p>
          </div>

          {/* ✅ Stock */}
          <div className="mt-4 flex items-center">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <p className="ml-2 text-sm text-gray-500">
              {product.stock > 0 ? "En stock et prêt à être expédié" : "Rupture de stock"}
            </p>
          </div>

          {/* 🔢 Sélection Quantité */}
          <div className="mt-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantité :
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="mt-2 w-20 px-3 py-2 border rounded-md text-center"
            />
          </div>

          {/* 🛒 Bouton Ajouter au Panier */}
          <button
            className="mt-6 flex w-full items-center justify-center rounded-md bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700"
            onClick={handleAddToCart}
            disabled={cartLoading || product.stock === 0}
          >
            Ajouter au panier
          </button>
        </div>

        {/* 🖼️ Image Produit */}
        <div className="mt-10 lg:col-start-2 lg:mt-0 lg:self-center">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="aspect-square w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex items-center justify-center aspect-square w-full bg-gray-200 rounded-lg">
              <p className="text-gray-500 text-lg">Aucune image</p>
            </div>
          )}
        </div>

        {/* 🔔 Notification */}
        <CartNotification show={showNotification} onClose={() => setShowNotification(false)} />
      </div>
    </div>
  );
};

export default ProductInfos;
