import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h3 className="text-lg font-bold mb-4 md:mb-0">Drive Market</h3>
          <div className="flex space-x-6">
            <Link 
              href="/about" 
              className="hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600" 
              aria-label="À propos de Drive Market"
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600" 
              aria-label="Contactez Drive Market"
            >
              Contact
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600" 
              aria-label="Conditions d'utilisation de Drive Market"
            >
              Conditions
            </Link>
          </div>
        </div>
        <p className="text-gray-400">© {new Date().getFullYear()} Drive Market. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
