export interface AdminProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId?: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  orders: Order[];
}

export interface Order {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
  items: OrderItem[];
}

export interface OrderItem {
  product: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  quantity: number;
}
