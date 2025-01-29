import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h3 className="text-lg font-bold mb-4 md:mb-0">Drive Market</h3>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-red-500">À propos</Link>
            <Link href="/contact" className="hover:text-red-500">Contact</Link>
            <Link href="/terms" className="hover:text-red-500">Conditions</Link>
          </div>
        </div>
        <p className="text-gray-400">© {new Date().getFullYear()} Drive Market. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
