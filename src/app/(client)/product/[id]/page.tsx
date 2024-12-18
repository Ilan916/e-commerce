"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductInfos from '@/app/components/ProductInfos/ProductInfos';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/product-infos/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data.product))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ProductInfos product={product} />
    </div>
  );
};

export default ProductPage;