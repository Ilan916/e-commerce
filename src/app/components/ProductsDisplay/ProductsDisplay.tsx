"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartContext } from "@/app/context/CartContext";
import { Pagination, CategorySelect, CartNotification } from "@/app/components"
import { IoBagOutline } from "react-icons/io5"; // Icône de fallback

interface Product {
  id: string;
  name: string;
  imageUrl?: string | null;
  price: number;
  description: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsDisplay() {
  const router = useRouter();
  const { addItemToCart } = useCartContext();
  const { data: session } = useSession();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`/api/categories`);
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Erreur récupération catégories :", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const categoryQuery = selectedCategory ? `&categoryId=${selectedCategory}` : "";
        const response = await fetch(`/api/products?page=${currentPage}&limit=8${categoryQuery}`);
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Erreur récupération produits :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!session?.user?.id) {
      router.push("/connexion");
      return;
    }

    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl || "",
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handlePreviousPage = useCallback(() => setCurrentPage((prev) => Math.max(prev - 1, 1)), []);
  const handleNextPage = useCallback(() => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), []);
  const handlePageClick = (page: number) => setCurrentPage(page);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Nos Produits</h2>

        {/* Sélecteur de catégorie */}
        <div className="mt-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Filtrer par catégorie :
          </label>
          <CategorySelect categories={categories} selectedCategory={selectedCategory} onChange={setSelectedCategory} />
        </div>

        {/* Liste des produits */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative cursor-pointer transition transform hover:scale-105"
                onClick={() => router.push(`/product/${product.id}`)}
                aria-label={`Voir les détails de ${product.name}`}
              >
                <div className="relative h-72 w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img
                      alt={product.name}
                      src={product.imageUrl}
                      className="size-full object-cover transition group-hover:opacity-75"
                    />
                  ) : (
                    <IoBagOutline className="text-gray-400 size-20" />
                  )}
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">
                    {product.price.toFixed(2)} €
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Empêche la navigation quand on clique sur "Ajouter au panier"
                      handleAddToCart(product);
                    }}
                    className="relative flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageClick}
        />

        {/* 🔹 Notification d'ajout au panier */}
        <CartNotification show={showNotification} onClose={() => setShowNotification(false)} />
      </div>
    </div>
  );
}
