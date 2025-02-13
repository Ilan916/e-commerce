import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  try {
    // Ensure default category exists
    const category = await prisma.category.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        name: 'Default Category',
        description: 'Default category for products'
      }
    });

    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        stock: 0,
        categoryId: category.id,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'Invalid product data' });
  }
});

// Add cart routes
app.post('/api/cart/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Stock insuffisant' });
    }

    // First try to find existing cart
    let cart = await prisma.cart.findUnique({
      where: { userId }
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      });
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity
      },
      include: {
        product: true
      }
    });

    return res.status(200).json({ success: true, item: cartItem });
  } catch (err: unknown) {
    console.error('Cart error:', err);
    const error = err as Error;
    return res.status(400).json({ 
      error: 'Invalid request', 
      details: error?.message || 'Unknown error occurred'
    });
  }
});

export { app };
