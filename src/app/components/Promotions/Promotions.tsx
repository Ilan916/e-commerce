export default function Promotions() {
  return (
    <section className="bg-red-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-8">Produits en Promotion</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {Array(4).fill(null).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
              <img
                src={`/assets/product${index + 1}.jpg`}
                alt={`Produit ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold mb-2">Produit #{index + 1}</h3>
              <p className="text-gray-600">À partir de 1,99€/kg</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
