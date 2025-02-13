import { POST } from '../cart/add/route';
import { prismaMock } from '../../../__mocks__/prisma';

describe('Cart API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add item to cart', async () => {
    const mockProduct = {
      id: 'prod1',
      name: 'Test Product',
      price: 10.99,
      stock: 5,
      imageUrl: 'test.jpg',
      description: 'Test description',
      categoryId: 'cat1',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mockCart = { 
      id: 'cart1', 
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const mockCartItem = {
      id: 'item1',
      cartId: 'cart1',
      productId: 'prod1',
      quantity: 1,
      product: mockProduct
    };

    prismaMock.product.findUnique.mockResolvedValue(mockProduct);
    prismaMock.cart.findUnique.mockResolvedValue(mockCart);
    prismaMock.cartItem.create.mockResolvedValue(mockCartItem);

    const request = new Request('http://localhost:3000/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'user1',
        productId: 'prod1',
        quantity: 1
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.item).toBeDefined();
  });

  it('should handle insufficient stock', async () => {
    const mockProduct = {
      id: 'prod1',
      stock: 1
    };

    prismaMock.product.findUnique.mockResolvedValue(mockProduct);

    const request = new Request('http://localhost:3000/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'user1',
        productId: 'prod1',
        quantity: 2
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Stock insuffisant');
  });
});
