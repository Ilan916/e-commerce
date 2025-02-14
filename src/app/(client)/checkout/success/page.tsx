// CheckoutSuccess.tsx
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Composant qui utilise useSearchParams
function CheckoutContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      setStatus('success');
    }
  }, [sessionId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="mb-4">Thank you for your purchase.</p>
      <Link 
        href="/courses" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

// Composant principal avec Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}