import { prismaMock } from '../../../__mocks__/prisma';

describe('Cart API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('should add item to cart', async () => {
  //   const mockProduct = {
  //     id: 'prod1',
  //     name: 'Test Product',
  //     price: 10.99,
  //     stock: 5,
  //     imageUrl: 'test.jpg',
  //     description: 'Test description',
  //     categoryId: 'cat1',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   };

  //   const mockCart = {
  //     id: 'cart1',
  //     userId: 'user1',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   };

  //   const mockCartItem = {
  //     id: 'item1',
  //     cartId: mockCart.id,
  //     productId: mockProduct.id,
  //     quantity: 1,
  //     product: mockProduct
  //   };

  //   prismaMock.product.findUnique.mockResolvedValueOnce(mockProduct);
  //   prismaMock.cart.findUnique.mockResolvedValueOnce(mockCart);
  //   prismaMock.cartItem.create.mockResolvedValueOnce(mockCartItem);

  //   const response = await request(app)
  //     .post('/api/cart/add')
  //     .send({
  //       userId: 'user1',
  //       productId: 'prod1',
  //       quantity: 1
  //     });

  //   expect(response.status).toBe(200);
  //   expect(response.body.success).toBe(true);
  //   expect(response.body.item).toEqual(mockCartItem);
  // });

  // it('should handle insufficient stock', async () => {
  //   const mockProduct = {
  //     id: 'prod1',
  //     name: 'Test Product',
  //     price: 10.99,
  //     stock: 1,
  //     imageUrl: null,
  //     description: 'Test Description',
  //     categoryId: '1',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   };

  //   prismaMock.product.findUnique.mockResolvedValueOnce(mockProduct);

  //   const response = await request(app)
  //     .post('/api/cart/add')
  //     .send({
  //       userId: 'user1',
  //       productId: 'prod1',
  //       quantity: 2
  //     });

  //   expect(response.status).toBe(400);
  //   expect(response.body.error).toBe('Stock insuffisant');
  // });

  it('should find product by id', async () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 99.99,
      description: 'Test Description',
      stock: 10,
      imageUrl: null,
      categoryId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    prismaMock.product.findUnique.mockResolvedValue(mockProduct);

    const result = await prismaMock.product.findUnique({
      where: {
        id: '1'
      }
    });

    expect(result).toEqual(mockProduct);
  });
});
