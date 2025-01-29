import { FaCamera, FaShoppingCart, FaMagic, FaLightbulb, FaClock, FaLeaf } from "react-icons/fa";

const features = [
  {
    name: "Identifiez un plat avec une photo",
    description:
      "Prenez une photo de votre plat et notre IA détectera les ingrédients et vous proposera la recette associée.",
    icon: <FaCamera className="absolute left-1 top-1 size-5 text-red-600" />,
  },
  {
    name: "Générez des recettes avec votre panier",
    description:
      "Sélectionnez les ingrédients que vous avez chez vous et obtenez des recettes adaptées en un instant.",
    icon: <FaShoppingCart className="absolute left-1 top-1 size-5 text-red-600" />,
  },
  {
    name: "Suggestions intelligentes",
    description:
      "Notre IA vous propose des idées de plats en fonction de vos goûts et des produits de saison.",
    icon: <FaMagic className="absolute left-1 top-1 size-5 text-red-600" />,
  },
  {
    name: "Cuisine simplifiée",
    description:
      "Des recettes claires et détaillées pour cuisiner rapidement et facilement, même en étant débutant.",
    icon: <FaLightbulb className="absolute left-1 top-1 size-5 text-red-600" />,
  },
  {
    name: "Gagnez du temps",
    description:
      "Ne perdez plus de temps à chercher quoi manger, laissez notre IA vous guider.",
    icon: <FaClock className="absolute left-1 top-1 size-5 text-red-600" />,
  },
  {
    name: "Évitez le gaspillage",
    description:
      "Utilisez les ingrédients que vous avez déjà pour limiter le gaspillage alimentaire.",
    icon: <FaLeaf className="absolute left-1 top-1 size-5 text-red-600" />,
  },
];

export default function RecipeAIPromo() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl text-slate-800 font-bold text-center mb-8">
            Des recettes instantanées, adaptées à vos envies
          </h2>
          <p className="mt-6 text-center text-slate-600 mb-12">
            Prenez une photo d'un plat ou utilisez les ingrédients de votre
            panier, et notre IA vous proposera des recettes adaptées. Une
            solution simple, rapide et intelligente pour cuisiner sans prise de
            tête !
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            alt="Aperçu de l'IA"
            src="https://tailwindui.com/plus/img/component-images/project-app-screenshot.png"
            width={2432}
            height={1442}
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
          />
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="relative pl-9">
              <dt className="font-semibold text-gray-900 flex items-center">
                {feature.icon}
                <span className="ml-2">{feature.name}</span>
              </dt>
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
