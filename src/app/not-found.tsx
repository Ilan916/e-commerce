import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 mb-8">
          4<span className="text-red-600">0</span>4
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Oups ! La page que vous recherchez n&apos;existe pas.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;