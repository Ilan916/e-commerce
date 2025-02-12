"use client";

interface CartNotificationProps {
  show: boolean;
  onClose: () => void;
}

export default function CartNotification({ show, onClose }: CartNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up">
      <span>✓ Produit ajouté au panier</span>
      <button 
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
}
