import React from 'react';
// Données fictives pour les produits
const products = [
  { id: 1, name: 'Produit 1', price: 29.99, imageUrl: '/path/to/image1.jpg' },
  { id: 2, name: 'Produit 2', price: 49.99, imageUrl: '/path/to/image2.jpg' },
];

export default function ProductsDisplay() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nos Produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.price.toFixed(2)} €</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Ajouter au Panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
