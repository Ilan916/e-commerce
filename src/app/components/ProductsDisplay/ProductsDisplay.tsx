"use client";

import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export default function ProductsDisplay() {
  const [products, setProducts] = useState<{ [key: number]: Product[] }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 8;
  const preloadPages = 4; // Number of pages to preload

  useEffect(() => {
    async function fetchProducts(page: number) {
      try {
        const response = await fetch(`/api/products?page=${page}&limit=${productsPerPage}`);
        const data = await response.json();
        setProducts((prevProducts) => ({
          ...prevProducts,
          [page]: Array.isArray(data.products) ? data.products : [],
        }));
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    }

    // Fetch current page and preload pages
    for (let i = currentPage; i <= Math.min(currentPage + preloadPages, totalPages); i++) {
      if (!products[i]) {
        fetchProducts(i);
      }
    }
  }, [currentPage, totalPages]);

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
            currentPage === i ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(<span key="start-ellipsis" className="px-2">...</span>);
    }

    if (endPage < totalPages) {
      pageNumbers.push(<span key="end-ellipsis" className="px-2">...</span>);
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nos Produits</h1>
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
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Ajouter au Panier
              </button>
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
}
