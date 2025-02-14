export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  categoryId: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  cartId: string;
  product?: Product;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  imageUrl?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  imageUrl: string;
  categoryId: string;
}
