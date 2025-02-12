import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from "@/app/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, userId, userEmail } = body;

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
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

    // Create a pending order in the database
    await prisma.order.create({
      data: {
        userId: userId,
        stripeSessionId: session.id,
        status: 'pending',
        total: items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0),
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          }))
        }
      }
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' }, 
      { status: 500 }
    );
  }
}