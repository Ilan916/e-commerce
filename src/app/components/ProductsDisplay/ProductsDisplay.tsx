"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from '@/app/hooks/useCart';
import { useSession } from 'next-auth/react';
import CartNotification from '../CartNotification/CartNotification';

interface Product {
  id: string; // Ensure the ID is a string
  name: string;
  imageUrl: string;
  price: number;
}

interface Category {
  id: string; // Ensure the ID is a string
  name: string;
}

export default function ProductsDisplay() {
  const router = useRouter();
  const [products, setProducts] = useState<{ [key: number]: Product[] }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 8;
  const preloadPages = 4; // Number of pages to preload
  const { data: session } = useSession();
  const { addToCart, loading: cartLoading } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`/api/categories`);
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts(page: number) {
      setLoading(true);
      try {
        const categoryQuery = selectedCategory
          ? `&categoryId=${selectedCategory}`
          : "";
        const response = await fetch(
          `/api/products?page=${page}&limit=${productsPerPage}${categoryQuery}`
        );
        const data = await response.json();
        setProducts((prevProducts) => ({
          ...prevProducts,
          [page]: Array.isArray(data.products) ? data.products : [],
        }));
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setLoading(false);
      }
    }

    // Fetch current page and preload pages
    for (
      let i = currentPage;
      i <= Math.min(currentPage + preloadPages, totalPages);
      i++
    ) {
      if (!products[i]) {
        fetchProducts(i);
      }
    }
  }, [currentPage, totalPages, selectedCategory]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
    setProducts({});
  };

  const handleViewProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, Math.min(value, 99)) // Limite entre 1 et 99
    }));
  };

  const handleAddToCart = async (productId: string) => {
    if (!session?.user?.id) {
      router.push('/login');
      return;
    }

    try {
      const quantity = quantities[productId] || 1;
      await addToCart(session.user.id, productId, quantity);
      // Reset quantity after adding to cart
      setQuantities(prev => ({ ...prev, [productId]: 1 }));
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5;
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

    let startPage = Math.max(1, currentPage - halfMaxPageNumbers);
    let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbers);

    if (currentPage <= halfMaxPageNumbers) {
      endPage = Math.min(totalPages, maxPageNumbers);
    }

    if (currentPage + halfMaxPageNumbers >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 mx-1 rounded-lg transition ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <span key="start-ellipsis" className="px-2">
          ...
        </span>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <span key="end-ellipsis" className="px-2">
          ...
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Nos Produits</h1>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-lg font-medium text-gray-700"
        >
          Catégorie :
        </label>
        <select
          id="category"
          value={selectedCategory || ""}
          onChange={handleCategoryChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="w-12 h-12 text-gray-300 animate-spin"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-900"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(products[currentPage] || []).map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700">{product.price.toFixed(2)} €</p>
                
                <div className="flex items-center mt-2 mb-2">
                  <label htmlFor={`quantity-${product.id}`} className="mr-2">
                    Quantité :
                  </label>
                  <input
                    id={`quantity-${product.id}`}
                    type="number"
                    min="1"
                    max="99"
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                </div>

                <button
                  className="mt-4 w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg"
                  onClick={() => handleViewProduct(product.id)}
                >
                  Voir les détails
                </button>
                <button 
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={cartLoading}
                >
                  Ajouter au Panier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          Précédent
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          Suivant
        </button>
      </div>
      <CartNotification 
        show={showNotification} 
        onClose={() => setShowNotification(false)} 
      />
    </div>
  );
}

