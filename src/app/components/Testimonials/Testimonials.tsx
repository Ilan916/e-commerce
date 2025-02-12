const testimonials = [
  {
    body: "Service impeccable ! La commande est arrivée en moins de 2h et tous les produits étaient frais. Je recommande à 100% !",
    author: {
      name: "Sophie Dubois",
      handle: "sophie_dbs",
      imageUrl:
        "https://randomuser.me/api/portraits/women/45.jpg",
    },
  },
  {
    body: "Le Drive est ultra rapide, et j’adore l’IA qui me propose des recettes avec les produits que j’ai déjà achetés ! Un vrai gain de temps.",
    author: {
      name: "Thomas Lefevre",
      handle: "thomas_lfvr",
      imageUrl:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    body: "J'étais sceptique au début, mais la qualité des produits est top, et les promos exclusives me font économiser chaque semaine.",
    author: {
      name: "Camille Bernard",
      handle: "camille_brd",
      imageUrl:
        "https://randomuser.me/api/portraits/women/12.jpg",
    },
  },
  {
    body: "L’application est intuitive et la livraison toujours dans les temps. Fini les longues files d’attente en magasin, merci Drive Market !",
    author: {
      name: "Julien Moreau",
      handle: "julien_mr",
      imageUrl:
        "https://randomuser.me/api/portraits/men/67.jpg",
    },
  },
  {
    body: "J’ai testé la reconnaissance d’images pour générer des recettes, c’est bluffant ! L’IA m’a proposé une recette super bonne et facile.",
    author: {
      name: "Élodie Lambert",
      handle: "elodie_lmb",
      imageUrl:
        "https://randomuser.me/api/portraits/women/33.jpg",
    },
  },
  {
    body: "J’ai testé la reconnaissance d’images pour générer des recettes, c’est bluffant ! L’IA m’a proposé une recette super bonne et facile.",
    author: {
      name: "Paul Dupont",
      handle: "Paul_dnt",
      imageUrl:
        "https://randomuser.me/api/portraits/men/68.jpg",
    },
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Titre de la section */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-slate-800 font-bold text-center mb-11">
            Une expérience unique, validée par nos utilisateurs
          </h2>
        </div>

        {/* Liste des témoignages */}
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-white p-8 text-sm/6">
                  <blockquote className="text-gray-900">
                    <p className="italic">{`“${testimonial.body}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      alt={testimonial.author.name}
                      src={testimonial.author.imageUrl}
                      className="size-12 rounded-full border border-gray-300"
                    />
                    <div>
                      <div className="font-semibold text-red-600">{testimonial.author.name}</div>
                      <div className="text-gray-500">{`@${testimonial.author.handle}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
