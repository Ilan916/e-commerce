import React from 'react';

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
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
      )}
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-3xl font-semibold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Ajouter au Panier
        </button>
      </div>
    </div>
  );
};

export default ProductInfos;
