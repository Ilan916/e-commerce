export default function CommentCaMarche() {
  return (
    <section className="bg-gray-100 py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl text-slate-800 font-bold text-center mb-11">Comment Ça Marche ?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Créez un compte",
              description: "Inscrivez-vous et connectez-vous à votre compte.",
            },
            {
              step: 2,
              title: "Choisissez vos produits",
              description: "Ajoutez vos courses au panier.",
            },
            {
              step: 3,
              title: "Passez commande",
              description: "Recevez vos produits en un rien de temps.",
            },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center">
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
