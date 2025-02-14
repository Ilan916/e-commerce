import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from "@/app/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   imageUrl?: string;
// }

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    if (!body || !body.items || !Array.isArray(body.items) || !body.userId || !body.userEmail) {
      return NextResponse.json(
        { error: 'Invalid request body format' },
        { status: 400 }
      );
    }

    const { items, userId, userEmail } = body;

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Validate each item
    for (const item of items) {
      if (!item.id || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
        return NextResponse.json(
          { error: 'Invalid item format' },
          { status: 400 }
        );
      }
    }

    const total = items.reduce((sum: number, item: { price: number; quantity: number; }) => 
      sum + (item.price * item.quantity), 0
    );

    // First verify all products exist
    const productIds = items.map((item: { id: string; }) => item.id);

    // Add debug logging
    console.log('Received product IDs:', productIds);

    const existingProducts = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      select: {
        id: true,
        price: true,
        name: true
      }
    });

    // Add debug logging
    console.log('Found products:', existingProducts);

    // Check which products are missing
    const foundProductIds = new Set(existingProducts.map(p => p.id));
    const missingProductIds = productIds.filter((id: string) => !foundProductIds.has(id));

    if (missingProductIds.length > 0) {
      console.error('Missing products:', missingProductIds);
      return NextResponse.json(
        { 
          error: 'One or more products not found',
          missingProducts: missingProductIds 
        },
        { status: 400 }
      );
    }

    // Create product lookup map for quick access
    const productMap = new Map(
      existingProducts.map(product => [product.id, product])
    );

    // Create Stripe session with verified products
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: { id: string; name: any; imageUrl: any; price: number; quantity: any; }) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: productMap.get(item.id)?.name || item.name,
            images: item.imageUrl ? [item.imageUrl] : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/checkout/cancel`,
      customer_email: userEmail,
      metadata: {
        userId: userId,
        orderItems: JSON.stringify(items),
      },
    });

    // Create order using transaction with verified products
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalPrice: total,
          status: 'EN_COURS',
          stripeSessionId: session.id,
        },
      });

      // Create order items with verified products
      await tx.orderItem.createMany({
        data: items.map((item: { id: string; quantity: any; price: any; }) => ({
          orderId: newOrder.id,
          productId: item.id, // Now we know these IDs exist
          quantity: item.quantity,
          price: productMap.get(item.id)?.price || item.price,
          validated: false
        }))
      });

      // Clear cart
      await tx.cartItem.deleteMany({
        where: {
          cart: { userId }
        }
      });

      return newOrder;
    });

    return NextResponse.json({ 
      sessionId: session.id,
      orderId: order.id 
    });

  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { 
        error: 'Error creating checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}