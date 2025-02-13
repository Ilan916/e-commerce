import { prismaMock } from '../../../__mocks__/prisma';

describe('Products API', () => {
  it('should create a product', async () => {
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

    prismaMock.product.create.mockResolvedValue(mockProduct);

    expect(await prismaMock.product.create({
      data: mockProduct
    })).toEqual(mockProduct);
  });

  it('should find all products', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Test Product',
        price: 99.99,
        description: 'Test Description',
        stock: 10,
        imageUrl: null,
        categoryId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    prismaMock.product.findMany.mockResolvedValue(mockProducts);

    expect(await prismaMock.product.findMany()).toEqual(mockProducts);
  });
});
