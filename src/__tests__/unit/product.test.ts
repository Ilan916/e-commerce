import { Product } from '../../models/product';

describe('Product Model', () => {
  it('should create a new product with valid data', () => {
    const product = new Product({
      name: 'Test Product',
      price: 99.99,
      description: 'Test Description',
      category: 'Test Category'
    });

    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(99.99);
  });

  it('should throw error when price is negative', () => {
    expect(() => {
      new Product({
        name: 'Test Product',
        price: -10,
        description: 'Test Description',
        category: 'Test Category'
      });
    }).toThrow();
  });
});
