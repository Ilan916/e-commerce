import request from 'supertest';
import { app } from '../../app';
import { connect, disconnect } from '../../database';

describe('API Integration Tests', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  describe('GET /api/products', () => {
    it('should return list of products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'Integration Test Product',
        price: 29.99,
        description: 'Test Description'
        // Other fields will be set by the server
      };

      const response = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201);

      expect(response.body.name).toBe(newProduct.name);
      expect(response.body.price).toBe(newProduct.price);
      expect(response.body.stock).toBe(0);
      expect(response.body.categoryId).toBe('1');
    }, 10000); // Increase timeout to 10 seconds
  });
});
