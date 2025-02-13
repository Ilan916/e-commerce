import { Cart, CartItem, Product } from '@prisma/client';

export type CartItemWithProduct = Omit<CartItem, 'product'> & {
  product: Product;
};

export type CartWithItems = Cart & {
  items: CartItemWithProduct[];
};
