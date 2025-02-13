export class Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;

  constructor(data: Omit<Product, 'id'>) {
    if (data.price < 0) {
      throw new Error('Price cannot be negative');
    }
    
    this.id = Math.random().toString(36).substring(7);
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.category = data.category;
  }
}
