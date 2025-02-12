"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/hooks/useCart';

interface ProductInfosProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    stock: number;
  };
}

const ProductInfos: React.FC<ProductInfosProps> = ({ product }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { addToCart, loading: cartLoading } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(value, product.stock))); // Limite par le stock disponible
  };

  const handleAddToCart = async () => {
    if (!session?.user?.id) {
      router.push('/login');
      return;
    }

    try {
      await addToCart(session.user.id, product.id, quantity);
      setQuantity(1); // Reset quantity after adding to cart
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
      )}
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-3xl font-semibold text-blue-600 mb-4">{product.price.toFixed(2)} €</p>
        <p className="text-gray-700 mb-4">Stock : {product.stock}</p>
        
        {/* Ajouter le sélecteur de quantité */}
        <div className="flex items-center mb-4">
          <label htmlFor="quantity" className="mr-2">
            Quantité :
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="w-20 px-2 py-1 border rounded"
          />
        </div>

        <button 
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleAddToCart}
          disabled={cartLoading || product.stock === 0}
        >
          {cartLoading ? 'Ajout...' : 'Ajouter au Panier'}
        </button>
      </div>
    </div>
  );
};

export default ProductInfos;
